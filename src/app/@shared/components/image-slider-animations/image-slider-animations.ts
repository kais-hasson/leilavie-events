import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

type SlotPosition = 'left' | 'center' | 'right' | 'outside-left' | 'outside-right';

type Direction = 'next' | 'previous';

@Component({
  imports: [],
  selector: 'app-image-slider-animations',
  styleUrl: './image-slider-animations.scss',
  templateUrl: './image-slider-animations.html',
})
export class ImageSliderAnimations implements OnInit, AfterViewInit, OnDestroy {
  readonly images = input.required<string[]>();

  readonly slot0Image = signal('');
  readonly slot1Image = signal('');
  readonly slot2Image = signal('');
  readonly slot3Image = signal('');

  readonly isAnimating = signal(false);

  readonly slot0 = viewChild.required<ElementRef<HTMLElement>>('slot0');

  readonly slot1 = viewChild.required<ElementRef<HTMLElement>>('slot1');

  readonly slot2 = viewChild.required<ElementRef<HTMLElement>>('slot2');

  readonly slot3 = viewChild.required<ElementRef<HTMLElement>>('slot3');

  private readonly platformId = inject(PLATFORM_ID);

  private currentIndex = 0;

  /**
   * Position of each physical DOM slot.
   *
   * Example:
   *
   * slot0 -> left
   * slot1 -> center
   * slot2 -> right
   * slot3 -> outside-left
   */
  private positions: SlotPosition[] = ['left', 'center', 'right', 'outside-left'];

  private transitionHandler?: (event: TransitionEvent) => void;

  ngOnInit(): void {
    this.initializeImages();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    requestAnimationFrame(() => {
      this.setInitialPositions();
    });
  }

  ngOnDestroy(): void {
    this.removeTransitionListener();
  }

  next(): void {
    if (this.isAnimating()) {
      return;
    }

    if (this.images().length <= 1) {
      return;
    }

    this.prepareNext();
    this.animateNext();
  }

  previous(): void {
    if (this.isAnimating()) {
      return;
    }

    if (this.images().length <= 1) {
      return;
    }

    this.preparePrevious();
    this.animatePrevious();
  }

  // ---------------------------------------------------------
  // INITIALIZATION
  // ---------------------------------------------------------

  private initializeImages(): void {
    const images = this.images();

    if (!images.length) {
      return;
    }

    this.currentIndex = 0;

    this.slot0Image.set(images[this.normalize(0)]);

    this.slot1Image.set(images[this.normalize(1)]);

    this.slot2Image.set(images[this.normalize(2)]);

    this.slot3Image.set(images[this.normalize(3)]);

    this.positions = ['left', 'center', 'right', 'outside-left'];
  }

  private setInitialPositions(): void {
    const slots = this.getSlots();

    for (let i = 0; i < slots.length; i++) {
      this.setPosition(slots[i], this.positions[i], false);
    }
  }

  // ---------------------------------------------------------
  // NEXT
  // ---------------------------------------------------------

  private prepareNext(): void {
    const outsideRightIndex = this.findSlotByPosition('outside-right');

    /**
     * If the current state came from Previous,
     * there may be no outside-left slot.
     *
     * We instantly move the outside-right slot
     * to outside-left and give it the next incoming image.
     */
    if (outsideRightIndex !== -1) {
      const incomingImageIndex = this.normalize(this.currentIndex + 3);

      this.setSlotImage(outsideRightIndex, this.images()[incomingImageIndex]);

      this.resetPositionWithoutAnimation(this.getSlots()[outsideRightIndex], 'outside-left');

      this.positions[outsideRightIndex] = 'outside-left';
    }
  }

  private animateNext(): void {
    this.isAnimating.set(true);

    const leftIndex = this.findSlotByPosition('left');

    const centerIndex = this.findSlotByPosition('center');

    const rightIndex = this.findSlotByPosition('right');

    const outsideLeftIndex = this.findSlotByPosition('outside-left');

    if (leftIndex === -1 || centerIndex === -1 || rightIndex === -1 || outsideLeftIndex === -1) {
      this.isAnimating.set(false);
      return;
    }

    const slots = this.getSlots();

    /**
     * NEXT
     *
     * left   -> outside-left
     * center -> left
     * right  -> center
     * outside-left -> right
     */
    this.setPosition(slots[leftIndex], 'outside-left', true);

    this.setPosition(slots[centerIndex], 'left', true);

    this.setPosition(slots[rightIndex], 'center', true);

    this.setPosition(slots[outsideLeftIndex], 'right', true);

    /**
     * Update the logical positions immediately.
     */
    this.positions[leftIndex] = 'outside-left';

    this.positions[centerIndex] = 'left';

    this.positions[rightIndex] = 'center';

    this.positions[outsideLeftIndex] = 'right';

    /**
     * Wait for the element that moves
     * RIGHT -> CENTER.
     */
    this.waitForTransitionEnd(slots[rightIndex], 'next');
  }

  private finishNext(): void {
    this.currentIndex = this.normalize(this.currentIndex + 1);

    /**
     * The slot that moved LEFT -> OUTSIDE-LEFT
     * is now reused for the next incoming image.
     */
    const outsideLeftIndex = this.findSlotByPosition('outside-left');

    if (outsideLeftIndex !== -1) {
      const nextImageIndex = this.normalize(this.currentIndex + 3);

      this.setSlotImage(outsideLeftIndex, this.images()[nextImageIndex]);
    }

    this.removeTransitionListener();

    this.isAnimating.set(false);
  }

  // ---------------------------------------------------------
  // PREVIOUS
  // ---------------------------------------------------------

  private preparePrevious(): void {
    const outsideLeftIndex = this.findSlotByPosition('outside-left');

    /**
     * If the current state came from Next,
     * there may be no outside-right slot.
     *
     * Move the outside-left slot instantly
     * to outside-right and give it the previous image.
     */
    if (outsideLeftIndex !== -1) {
      const previousImageIndex = this.normalize(this.currentIndex - 1);

      this.setSlotImage(outsideLeftIndex, this.images()[previousImageIndex]);

      this.resetPositionWithoutAnimation(this.getSlots()[outsideLeftIndex], 'outside-right');

      this.positions[outsideLeftIndex] = 'outside-right';
    }
  }

  private animatePrevious(): void {
    this.isAnimating.set(true);

    const leftIndex = this.findSlotByPosition('left');

    const centerIndex = this.findSlotByPosition('center');

    const rightIndex = this.findSlotByPosition('right');

    const outsideRightIndex = this.findSlotByPosition('outside-right');

    if (leftIndex === -1 || centerIndex === -1 || rightIndex === -1 || outsideRightIndex === -1) {
      this.isAnimating.set(false);
      return;
    }

    const slots = this.getSlots();

    /**
     * PREVIOUS
     *
     * right -> outside-right
     * center -> right
     * left -> center
     * outside-right -> left
     */
    this.setPosition(slots[rightIndex], 'outside-right', true);

    this.setPosition(slots[centerIndex], 'right', true);

    this.setPosition(slots[leftIndex], 'center', true);

    this.setPosition(slots[outsideRightIndex], 'left', true);

    /**
     * Update logical positions.
     */
    this.positions[rightIndex] = 'outside-right';

    this.positions[centerIndex] = 'right';

    this.positions[leftIndex] = 'center';

    this.positions[outsideRightIndex] = 'left';

    /**
     * Wait for the element that moves
     * LEFT -> CENTER.
     */
    this.waitForTransitionEnd(slots[leftIndex], 'previous');
  }

  private finishPrevious(): void {
    this.currentIndex = this.normalize(this.currentIndex - 1);

    /**
     * The slot that moved RIGHT -> OUTSIDE-RIGHT
     * is reused for the next incoming image.
     */
    const outsideRightIndex = this.findSlotByPosition('outside-right');

    if (outsideRightIndex !== -1) {
      const previousImageIndex = this.normalize(this.currentIndex - 1);

      this.setSlotImage(outsideRightIndex, this.images()[previousImageIndex]);
    }

    this.removeTransitionListener();

    this.isAnimating.set(false);
  }

  // ---------------------------------------------------------
  // DOM POSITION
  // ---------------------------------------------------------

  private setPosition(element: HTMLElement, position: SlotPosition, animate: boolean): void {
    if (!animate) {
      element.style.transition = 'none';
    } else {
      element.style.transition = '';
    }

    element.classList.remove(
      'position-left',
      'position-center',
      'position-right',
      'position-outside-left',
      'position-outside-right',
    );

    switch (position) {
      case 'left':
        element.classList.add('position-left');
        break;

      case 'center':
        element.classList.add('position-center');
        break;

      case 'right':
        element.classList.add('position-right');
        break;

      case 'outside-left':
        element.classList.add('position-outside-left');
        break;

      case 'outside-right':
        element.classList.add('position-outside-right');
        break;
    }
  }

  private resetPositionWithoutAnimation(element: HTMLElement, position: SlotPosition): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    element.style.transition = 'none';

    this.setPosition(element, position, false);

    /**
     * Force browser layout.
     */
    void element.offsetWidth;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.transition = '';
      });
    });
  }

  // ---------------------------------------------------------
  // TRANSITION
  // ---------------------------------------------------------

  private waitForTransitionEnd(element: HTMLElement, direction: Direction): void {
    this.removeTransitionListener();

    this.transitionHandler = (event: TransitionEvent) => {
      /**
       * All movements change `left`,
       * so we use only the left transition
       * as the completion signal.
       *
       * This prevents transitionend from firing
       * multiple times for top/width/height.
       */
      if (event.propertyName !== 'left') {
        return;
      }

      this.removeTransitionListener();

      if (direction === 'next') {
        this.finishNext();
      } else {
        this.finishPrevious();
      }
    };

    element.addEventListener('transitionend', this.transitionHandler);
  }

  private removeTransitionListener(): void {
    if (!this.transitionHandler) {
      return;
    }

    const slots = this.getSlots();

    for (const slot of slots) {
      slot.removeEventListener('transitionend', this.transitionHandler);
    }

    this.transitionHandler = undefined;
  }

  // ---------------------------------------------------------
  // SLOT HELPERS
  // ---------------------------------------------------------

  private getSlots(): HTMLElement[] {
    return [
      this.slot0().nativeElement,
      this.slot1().nativeElement,
      this.slot2().nativeElement,
      this.slot3().nativeElement,
    ];
  }

  private findSlotByPosition(position: SlotPosition): number {
    return this.positions.findIndex((currentPosition) => currentPosition === position);
  }

  private setSlotImage(slotIndex: number, image: string): void {
    switch (slotIndex) {
      case 0:
        this.slot0Image.set(image);
        break;

      case 1:
        this.slot1Image.set(image);
        break;

      case 2:
        this.slot2Image.set(image);
        break;

      case 3:
        this.slot3Image.set(image);
        break;
    }
  }

  private normalize(index: number): number {
    const length = this.images().length;

    if (!length) {
      return 0;
    }

    return ((index % length) + length) % length;
  }
}

