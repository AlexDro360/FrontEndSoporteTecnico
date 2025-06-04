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
          name:'Asignar Tecnico',
          permiso: 'asign_tecnico',
        },
        {
          name:'Rechazar',
          permiso: 'decline_solicitud',
        },
        {
          name:'Responder',
          permiso: 'response_solicitud',
        },
        {
          name:'Registrar Bitacora',
          permiso: 'register_bitacora_solicitud',
        }
      ]
    },
    {
      'name': 'Bitacora',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_bitacora',
        },
        {
          name:'Editar',
          permiso: 'edit_bitacora',
        }
      ]
    },
    {
      'name': 'Configuraciones Adicionales',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_extra',
        },
        {
          name:'Registrar Jefe',
          permiso: 'add_Jefe',
        },
        {
          name:'Recargar Folio de Respuesta',
          permiso: 'reload_folio_respuesta',
        },
        {
          name:'Editar Folio de Respuesta',
          permiso: 'edit_folio_respuesta',
        },
        {
          name:'Recargar Folio de Solicitud',
          permiso: 'reload_folio_solicitud',
        },
        {
          name:'Editar Folio de Solicitud',
          permiso: 'edit_folio_solicitud',
        }
      ]
    },
    {
      'name': 'Mi Solicitud',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_my_solicitudes',
        },
        {
          name:'Registar',
          permiso: 'register_my_solicitudes',
        },
        {
          name:'Ver Respuesta',
          permiso: 'view_response_my_solicitudes',
        }
      ]
    },
    {
      'name': 'Dashboard',
      'permisos': [
        {
          name:'Ver',
          permiso: 'view_dashboard',
        }
      ]
    }
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

export function myRol(){
  let USER_AUTH = JSON.parse(localStorage.getItem('user') ?? '');
  
  return USER_AUTH.role_id;
}