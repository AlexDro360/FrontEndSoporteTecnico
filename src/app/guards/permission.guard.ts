import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../modules/auth';


@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.user;

    if (!user) {
      // No está logueado → redirige al login
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Se espera que en la ruta se definan los permisos requeridos
    const requiredPermission = route.data['permission'] as string;

    if (!requiredPermission || user.permissions.includes(requiredPermission)) {
      // Usuario tiene el permiso → permite acceso
      return true;
    }

    // Usuario no tiene el permiso → redirige a una página de "Acceso denegado"
    this.router.navigate(['/error/permiso-denegado']);
    return false;
  }
}
