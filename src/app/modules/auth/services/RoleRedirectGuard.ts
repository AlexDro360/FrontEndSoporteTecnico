import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { AuthService } from '../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.user?.role;

    console.log(role)
    if (role === 'Super-Admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }

    return false; // retornamos false porque la navegación ya se maneja con router.navigate
  }
}
