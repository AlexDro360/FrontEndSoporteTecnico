import { environment } from "src/environments/environment";

export const URL_BACKEND = environment.URL_BACKEND;
export const URL_SERVICIOS = environment.URL_SERVICIOS;
export const URL_FRONTED = environment.URL_FRONTED;

export const SIDEBAR:any = [
    {
      'name': 'Roles',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_role',
        },
        {
          name:'Registrar',
          permiso: 'register_role',
        },
        {
          name:'Editar',
          permiso: 'edit_role',
        },
        {
          name:'Eliminar',
          permiso: 'delete_role',
        }
      ]
    },
    {
      'name': 'Usuarios',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_user',
        },
        {
          name:'Registrar',
          permiso: 'register_user',
        },
        {
          name:'Editar',
          permiso: 'edit_user',
        },
        {
          name:'Eliminar',
          permiso: 'delete_user',
        }
      ]
    },
    {
      'name': 'Solicitudes',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_solicitud',
        },
        {
          name:'Registrar',
          permiso: 'register_solicitud',
        },
        {
          name:'Editar',
          permiso: 'edit_solicitud',
        },
        {
          name:'Eliminar',
          permiso: 'delete_solicitud',
        }
      ]
    },
    {
      'name': 'Respuesta',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_response',
        },
        {
          name:'Registrar',
          permiso: 'register_response',
        },
        {
          name:'Editar',
          permiso: 'edit_response',
        },
        {
          name:'Eliminar',
          permiso: 'delete_response',
        }
      ]
    },
];

export function isPermission(permission:string){
  let USER_AUTH = JSON.parse(localStorage.getItem('user') ?? '');
  if(USER_AUTH){
    if(USER_AUTH.role_name == 'Super-Admin'){
      return true;
    }
    if(USER_AUTH.permissions.includes(permission)){
      return true;
    }
    return false;
  }
  return false;
}