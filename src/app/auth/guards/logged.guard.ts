import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "@auth/services/auth.service";


@Injectable({ providedIn: 'root' })
export class LoggedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/entity']);
      return false;
    }
    return true;
  }
}
