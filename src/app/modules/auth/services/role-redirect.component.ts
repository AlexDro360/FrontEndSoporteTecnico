import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '..';

@Component({
  selector: 'app-role-redirect',
  template: '' // No renderiza nada
})
export class RoleRedirectComponent {
  constructor(private authService: AuthService, private router: Router) {
    const role = this.authService.user?.role_id;

    // Redirige según el rol
    console.log(this.authService.user);
    if (role === 1) {
      this.router.navigate(['/dashboard']);
    } else if ((role === 2)){
      this.router.navigate(['/solicitudes/list']);
    } else if (role === 3){
      this.router.navigate(['/mis-solicitudes/list']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}

