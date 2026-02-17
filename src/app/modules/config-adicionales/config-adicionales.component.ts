import { Component } from '@angular/core';
import { isPermission } from 'src/app/config/config';

@Component({
  selector: 'app-config-adicionales',
  templateUrl: './config-adicionales.component.html',
  styleUrls: ['./config-adicionales.component.scss']
})
export class ConfigAdicionalesComponent {

  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') ?? '');
  }

  isPermission(permission: string) {
    return isPermission(permission);
  }
}
