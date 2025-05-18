import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraService } from '../service/bitacora.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-respuesta',
  templateUrl: './ver-bitacora.component.html',
  styleUrls: ['./ver-bitacora.component.scss']
})
export class VerBitacoraComponent {


  @Output() BitacoraV: EventEmitter<any> = new EventEmitter();
  @Input() bitacora: any;

  horas: number = 0;
  minutos: number = 0;

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.horas = Math.floor(this.bitacora.duracion / 60);
    this.minutos = this.bitacora.duracion % 60;
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ver-bitacora',
//   templateUrl: './ver-bitacora.component.html',
//   styleUrls: ['./ver-bitacora.component.scss']
// })
// export class VerBitacoraComponent {

// }
