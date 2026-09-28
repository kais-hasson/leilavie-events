import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageSliderAnimations } from './image-slider-animations';

describe('ImageSliderAnimations', () => {
  let component: ImageSliderAnimations;
  let fixture: ComponentFixture<ImageSliderAnimations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSliderAnimations],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSliderAnimations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
