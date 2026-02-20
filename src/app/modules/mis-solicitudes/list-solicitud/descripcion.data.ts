export const DESCRIPCIONES_ESTADO: { [key: number]: string } = {
    1: 'Su solicitud está en la lista de espera para ser revisada y asignada al personal técnico.',
    
    3: 'El personal técnico ha sido asignado y se encuentra trabajando activamente en su solicitud en este momento.',
    
    2: 'La solicitud no pudo ser procesada. Esto puede deberse a falta de información, por favor edite los datos de la solicitud.',
    
    4: 'El personal técnico intervino, pero el problema no pudo resolverse de forma inmediata.',
    
    5: 'El personal técnico aplicó una solución al problema reportado y se considera arreglado.',
    
    6: 'La solicitud está a la espera de su confirmación, para la generación de su reporte de orden de trabajo',
    
    7: 'Usted ha confirmado que su solicitud se concluyo con éxito. El ciclo de esta solicitud ha concluido definitivamente.'
};