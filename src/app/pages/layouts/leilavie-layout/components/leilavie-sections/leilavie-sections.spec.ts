import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeilavieSections } from './leilavie-sections';

describe('LeilavieSections', () => {
  let component: LeilavieSections;
  let fixture: ComponentFixture<LeilavieSections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeilavieSections],
    }).compileComponents();

    fixture = TestBed.createComponent(LeilavieSections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
