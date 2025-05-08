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

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService,
  ) {
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
