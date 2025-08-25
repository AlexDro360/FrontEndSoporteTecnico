import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '..';

@Component({
  selector: 'app-role-redirect',
  template: '' // No renderiza nada
})
export class RoleRedirectComponent {
  constructor(private authService: AuthService, private router: Router) {
    const role = this.authService.user?.role_name;

    // Redirige según el rol
    console.log(role);
    if (role === 'Super-Admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/mis-solicitudes/list']);
    }
  }
}

