import { Component } from '@angular/core';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../../../_metronic/kt/components';
import { Router } from '@angular/router';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-permiso-denegado',
  templateUrl: './permiso-denegado.component.html',
  styleUrls: ['./permiso-denegado.component.scss']
})
export class PermisoDenegadoComponent {

  constructor(private router: Router, private authService: AuthService) { }

  routeToDashboard() {
    this.router.navigate(['auth/login']);
    setTimeout(() => {
      ToggleComponent.reinitialization();
      ScrollTopComponent.reinitialization();
      DrawerComponent.reinitialization();
      StickyComponent.bootstrap();
      MenuComponent.reinitialization();
      ScrollComponent.reinitialization();
    }, 200);
  }

  logout() {
    this.authService.logout();
    window.location.href = '/auth/login';

  }
}
