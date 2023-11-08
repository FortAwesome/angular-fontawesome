import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplicitReferenceComponent } from './explicit-reference.component';

describe('ExplicitReferenceComponent', () => {
  let component: ExplicitReferenceComponent;
  let fixture: ComponentFixture<ExplicitReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExplicitReferenceComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicitReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
