import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        success => {
          this.isLoading = false;
          if (success) {
            this.router.navigate(['/entity']);
          } else {
            this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
          }
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      this.loginForm.markAllAsTouched();
    }
  }
}
