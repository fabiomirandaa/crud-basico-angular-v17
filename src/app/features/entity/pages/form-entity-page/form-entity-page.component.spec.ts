import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntityPageComponent } from './form-entity-page.component';

describe('FormEntityPageComponent', () => {
  let component: FormEntityPageComponent;
  let fixture: ComponentFixture<FormEntityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEntityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEntityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
