import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExplicitReferenceComponent } from './explicit-reference.component';

describe('ExplicitReferenceComponent', () => {
  let component: ExplicitReferenceComponent;
  let fixture: ComponentFixture<ExplicitReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule], // <--
      declarations: [ExplicitReferenceComponent],
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
