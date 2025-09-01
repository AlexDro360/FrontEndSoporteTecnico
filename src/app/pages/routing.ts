import { Routes } from '@angular/router';
import { RoleRedirectGuard } from '../modules/auth/services/RoleRedirectGuard';
import { RoleRedirectComponent } from '../modules/auth/services/role-redirect.component';
import { AuthGuard } from '../modules/auth/services/auth.guard';
import { PermissionGuard } from '../guards/permission.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_dashboard' }
  },
  // {
  //   path: 'builder',
  //   loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  // },
  {
    path: 'crafted/pages/profile',
    loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    // data: { layout: 'light-sidebar' },
  },
  // {
  //   path: 'crafted/account',
  //   loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
  //   // data: { layout: 'dark-header' },
  // },
  // {
  //   path: 'crafted/pages/wizards',
  //   loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  //   // data: { layout: 'light-header' },
  // },
  // {
  //   path: 'crafted/widgets',
  //   loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
  //   // data: { layout: 'light-header' },
  // },
  // {
  //   path: 'apps/chat',
  //   loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  //   // data: { layout: 'light-sidebar' },
  // },
  // {
  //   path: 'apps/users',
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  //   canActivate: [AuthGuard, PermissionGuard],
  //   data: {  }
  // },
  // {
  //   path: 'apps/roles',
  //   loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  //   canActivate: [AuthGuard, PermissionGuard],
  //   data: {}
  // },
  // {
  //   path: 'apps/permissions',
  //   loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
  // },
  //MIS MODULOS localhost:4200/roles/list
  {
    path: 'roles',
    loadChildren: () => import('../modules/roles/roles.module').then((m) => m.RolesModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_role' }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('../modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_user' }
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('../modules/solicitudes/solicitudes.module').then((m) => m.SolicitudesModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_solicitud' }
  },
  // {
  //   path: 'respuestas',
  //   loadChildren: () => import('../modules/respuestas/respuestas.module').then((m) => m.RespuestasModule),
  // },
  {
    path: 'bitacora',
    loadChildren: () => import('../modules/bitacora/bitacora.module').then((m) => m.BitacoraModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_bitacora' }
  },
  {
    path: 'config-adicionales',
    loadChildren: () => import('../modules/config-adicionales/config-adicionales.module').then((m) => m.ConfigAdicionalesModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_extra' }
  },
  {
    path: 'mis-solicitudes',
    loadChildren: () => import('../modules/mis-solicitudes/mis-solicitudes.module').then((m) => m.MisSolicitudesModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'view_my_solicitudes' }
  },
  {
    path: '',
    canActivate: [AuthGuard], 
    component: RoleRedirectComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
