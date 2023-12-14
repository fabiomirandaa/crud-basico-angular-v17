import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";

import { AuthService } from "@auth/services/auth.service";
import { of, throwError } from "rxjs";
import { LoginCardComponent } from "./login-card.component";


describe('LoginCardComponent', () => {
  let component: LoginCardComponent;
  let fixture: ComponentFixture<LoginCardComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy().and.returnValue(of(true))
    };
    routerMock = {
      navigate: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        LoginCardComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should display error message if login form is invalid', fakeAsync(() => {
    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Por favor, preencha todos os campos corretamente.');
    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement.nativeElement.textContent).toContain('Por favor, preencha todos os campos corretamente.');
  }));

  it('should call AuthService.login() if form is valid', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();
    tick();

    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');
  }));

  it('should navigate to entity page on successful login', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();
    tick();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/entity']);
  }));

  it('should display error message on login failure', fakeAsync(() => {
    authServiceMock.login.and.returnValue(throwError('Error'));
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Ocorreu um erro. Por favor, tente novamente.');
  }));
});
