import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairOfWordsComponent } from './pair-of-words.component';

describe('PairOfWordsComponent', () => {
  let component: PairOfWordsComponent;
  let fixture: ComponentFixture<PairOfWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairOfWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PairOfWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
