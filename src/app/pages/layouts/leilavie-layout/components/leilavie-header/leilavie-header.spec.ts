import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeilavieHeader } from './leilavie-header';

describe('LeilavieHeader', () => {
  let component: LeilavieHeader;
  let fixture: ComponentFixture<LeilavieHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeilavieHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(LeilavieHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
