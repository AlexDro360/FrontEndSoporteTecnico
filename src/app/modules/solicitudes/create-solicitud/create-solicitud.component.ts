import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-solicitud',
  templateUrl: './create-solicitud.component.html',
  styleUrls: ['./create-solicitud.component.scss']
})
export class CreateSolicitudComponent {
  @Output() SolicitudC: EventEmitter<any> = new EventEmitter();
  @Input() tipo:any[];
  
}
