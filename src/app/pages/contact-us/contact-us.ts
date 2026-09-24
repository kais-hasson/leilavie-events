import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-contact-us',
  styleUrl: './contact-us.scss',
  templateUrl: './contact-us.html',
})
export class ContactUs implements AfterViewInit, OnDestroy
{
  readonly images = input.required<string[]>();

  readonly leftImage = signal('');
  readonly centerImage = signal('');
  readonly rightImage = signal('');

  readonly isAnimating = signal(false);

  readonly leftSlot =
  viewChild<ElementRef<HTMLElement>>('leftSlot');

  readonly centerSlot =
  viewChild<ElementRef<HTMLElement>>('centerSlot');

  readonly rightSlot =
  viewChild<ElementRef<HTMLElement>>('rightSlot');

private currentIndex = 0;

private readonly animationDuration = 650;

private resizeObserver?: ResizeObserver;

private activeClones: HTMLElement[] = [];

  ngAfterViewInit(): void {
  this.updateVisibleImages();

  if (typeof ResizeObserver !== 'undefined') {
  this.resizeObserver = new ResizeObserver(() => {
    if (!this.isAnimating()) {
      this.updateVisibleImages();
    }
  });

  const container =
    this.leftSlot()?.nativeElement.parentElement;

  if (container) {
    this.resizeObserver.observe(container);
  }
}
}

  ngOnDestroy(): void {
  this.resizeObserver?.disconnect();
  this.removeClones();
}

  next(): void {
  if (this.isAnimating()) {
  return;
}

  const images = this.images();

  if (images.length < 4) {
    this.rotateSimpleNext();
    return;
  }

  this.animateNext();
}

  previous(): void {
  if (this.isAnimating()) {
  return;
}

  const images = this.images();

  if (images.length < 4) {
    this.rotateSimplePrevious();
    return;
  }

  this.animatePrevious();
}

private updateVisibleImages(): void {
  const images = this.images();

  if (!images.length) {
  this.leftImage.set('');
  this.centerImage.set('');
  this.rightImage.set('');
  return;
}

  const leftIndex = this.normalizeIndex(
    this.currentIndex,
    images.length,
  );

  const centerIndex = this.normalizeIndex(
    this.currentIndex + 1,
    images.length,
  );

  const rightIndex = this.normalizeIndex(
    this.currentIndex + 2,
    images.length,
  );

  this.leftImage.set(images[leftIndex]);
  this.centerImage.set(images[centerIndex]);
  this.rightImage.set(images[rightIndex]);
}

private animateNext(): void {
  const images = this.images();

  const leftElement =
    this.leftSlot()?.nativeElement;

  const centerElement =
    this.centerSlot()?.nativeElement;

  const rightElement =
    this.rightSlot()?.nativeElement;

  if (
  !leftElement ||
  !centerElement ||
  !rightElement
) {
  return;
}

  const leftRect =
    leftElement.getBoundingClientRect();

  const centerRect =
    centerElement.getBoundingClientRect();

  const rightRect =
    rightElement.getBoundingClientRect();

  /*
   * Current:
   *
   * [0] [1] [2]
   *
   * Next:
   *
   * [1] [2] [3]
   */

  const newIndex = this.normalizeIndex(
    this.currentIndex + 3,
    images.length,
  );

  const newImage = images[newIndex];

  this.isAnimating.set(true);

  /*
   * 0 -> outside LEFT
   */
  const exitingLeft =
    this.createClone(
      this.leftImage(),
      leftElement,
    );

  this.appendClone(exitingLeft);

  const leftExitRect = {
    left:
      leftRect.left -
      leftRect.width -
      Math.max(100, leftRect.width * 0.6),

    top: leftRect.top,

    width: leftRect.width,

    height: leftRect.height,
  };

  this.animateClone(
    exitingLeft,
    leftRect,
    leftExitRect,
  );

  /*
   * 1 -> LEFT
   */
  const centerToLeft =
    this.createClone(
      this.centerImage(),
      centerElement,
    );

  this.appendClone(centerToLeft);

  this.animateClone(
    centerToLeft,
    centerRect,
    leftRect,
  );

  /*
   * 2 -> CENTER
   */
  const rightToCenter =
    this.createClone(
      this.rightImage(),
      rightElement,
    );

  this.appendClone(rightToCenter);

  this.animateClone(
    rightToCenter,
    rightRect,
    centerRect,
  );

  /*
   * 3 -> RIGHT
   *
   * Start outside LEFT.
   */
  const entering =
    this.createClone(
      newImage,
      leftElement,
    );

  this.appendClone(entering);

  const enteringStart = {
    left:
      leftRect.left -
      leftRect.width -
      50,

    top: leftRect.top,

    width: leftRect.width,

    height: leftRect.height,
  };

  this.setCloneRect(
    entering,
    enteringStart,
  );

  this.animateClone(
    entering,
    enteringStart,
    rightRect,
  );

  this.currentIndex =
    this.normalizeIndex(
      this.currentIndex + 1,
      images.length,
    );

  this.completeAnimation();
}

private animatePrevious(): void {
  const images = this.images();

  const leftElement =
    this.leftSlot()?.nativeElement;

  const centerElement =
    this.centerSlot()?.nativeElement;

  const rightElement =
    this.rightSlot()?.nativeElement;

  if (
  !leftElement ||
  !centerElement ||
  !rightElement
) {
  return;
}

  const leftRect =
    leftElement.getBoundingClientRect();

  const centerRect =
    centerElement.getBoundingClientRect();

  const rightRect =
    rightElement.getBoundingClientRect();

  /*
   * Current:
   *
   * [0] [1] [2]
   *
   * Previous:
   *
   * [-1] [0] [1]
   */

  const newIndex = this.normalizeIndex(
    this.currentIndex - 1,
    images.length,
  );

  const newImage = images[newIndex];

  this.isAnimating.set(true);

  /*
   * 2 -> outside RIGHT
   */
  const exitingRight =
    this.createClone(
      this.rightImage(),
      rightElement,
    );

  this.appendClone(exitingRight);

  const rightExitRect = {
    left:
      rightRect.left +
      rightRect.width +
      Math.max(100, rightRect.width * 0.6),

    top: rightRect.top,

    width: rightRect.width,

    height: rightRect.height,
  };

  this.animateClone(
    exitingRight,
    rightRect,
    rightExitRect,
  );

  /*
   * 1 -> RIGHT
   *
   * CENTER -> RIGHT
   *
   * The image becomes smaller.
   */
  const centerToRight =
    this.createClone(
      this.centerImage(),
      centerElement,
    );

  this.appendClone(centerToRight);

  this.animateClone(
    centerToRight,
    centerRect,
    rightRect,
  );

  /*
   * 0 -> CENTER
   *
   * LEFT -> CENTER
   *
   * The image becomes larger.
   */
  const leftToCenter =
    this.createClone(
      this.leftImage(),
      leftElement,
    );

  this.appendClone(leftToCenter);

  this.animateClone(
    leftToCenter,
    leftRect,
    centerRect,
  );

  /*
   * New image enters from RIGHT
   * and goes to LEFT.
   */
  const entering =
    this.createClone(
      newImage,
      rightElement,
    );

  this.appendClone(entering);

  const enteringStart = {
    left:
      rightRect.left +
      rightRect.width +
      50,

    top: rightRect.top,

    width: rightRect.width,

    height: rightRect.height,
  };

  this.setCloneRect(
    entering,
    enteringStart,
  );

  this.animateClone(
    entering,
    enteringStart,
    leftRect,
  );

  this.currentIndex =
    this.normalizeIndex(
      this.currentIndex - 1,
      images.length,
    );

  this.completeAnimation();
}

private createClone(
  image: string,
  sourceElement: HTMLElement,
): HTMLImageElement {
  const clone =
    document.createElement('img');

  clone.src = image;
  clone.alt = '';

  const computed =
    window.getComputedStyle(
      sourceElement,
    );

  clone.style.position = 'fixed';

  clone.style.margin = '0';

  clone.style.boxSizing =
    'border-box';

  clone.style.padding =
    computed.padding;

  clone.style.border =
    computed.border;

  clone.style.borderRadius =
    computed.borderRadius;

  clone.style.background =
    computed.background;

  clone.style.boxShadow =
    computed.boxShadow;

  clone.style.objectFit =
    computed.objectFit;

  clone.style.zIndex = '1000';

  clone.style.pointerEvents =
    'none';

  clone.style.willChange =
    'left, top, width, height';

  return clone;
}

private appendClone(
  clone: HTMLElement,
): void {
  document.body.appendChild(clone);

  this.activeClones.push(clone);
}

private setCloneRect(
  clone: HTMLElement,
  rect: {
  left: number;
  top: number;
  width: number;
  height: number;
},
): void {
  clone.style.left =
    `${rect.left}px`;

  clone.style.top =
    `${rect.top}px`;

  clone.style.width =
    `${rect.width}px`;

  clone.style.height =
    `${rect.height}px`;
}

private animateClone(
  clone: HTMLElement,
  from: {
  left: number;
  top: number;
  width: number;
  height: number;
},
  to: {
    left: number;
    top: number;
    width: number;
    height: number;
  },
): void {
  this.setCloneRect(
    clone,
    from,
  );

  /*
   * Force layout.
   */
  void clone.offsetWidth;

  clone.style.transition = `
      left ${this.animationDuration}ms cubic-bezier(.22,.61,.36,1),
      top ${this.animationDuration}ms cubic-bezier(.22,.61,.36,1),
      width ${this.animationDuration}ms cubic-bezier(.22,.61,.36,1),
      height ${this.animationDuration}ms cubic-bezier(.22,.61,.36,1)
    `;

  requestAnimationFrame(() => {
  this.setCloneRect(
    clone,
    to,
  );
});
}

private completeAnimation(): void {
  window.setTimeout(() => {
    this.updateVisibleImages();

    requestAnimationFrame(() => {
      this.removeClones();

      this.isAnimating.set(false);
    });
  }, this.animationDuration + 50);
}

private removeClones(): void {
  for (const clone of this.activeClones) {
  clone.remove();
}

  this.activeClones = [];
}

private rotateSimpleNext(): void {
  const images = this.images();

  if (!images.length) {
  return;
}

  this.currentIndex =
    this.normalizeIndex(
      this.currentIndex + 1,
      images.length,
    );

  this.updateVisibleImages();
}

private rotateSimplePrevious(): void {
  const images = this.images();

  if (!images.length) {
  return;
}

  this.currentIndex =
    this.normalizeIndex(
      this.currentIndex - 1,
      images.length,
    );

  this.updateVisibleImages();
}

private normalizeIndex(
  index: number,
  length: number,
): number {
  return (
    ((index % length) + length) %
    length
  );
}
}
