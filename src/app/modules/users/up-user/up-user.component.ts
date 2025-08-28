import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-up-user',
  templateUrl: './up-user.component.html',
  styleUrls: ['./up-user.component.scss']
})
export class UpUserComponent {
  @Output() UserD: EventEmitter<any> = new EventEmitter();
  @Input() USER_SELECTED: any;

  name: string = '';
  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public rolesService: UsersService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {

  }

  alta() {

    this.rolesService.upUser(this.USER_SELECTED.id).subscribe((resp: any) => {

      if (resp.message == 403) {
        this.toast.error("Validación", resp.message_text);
      } else {
        this.toast.success("Exito", "El usuario se dio de alta correctamento");
        this.UserD.emit(resp.role);
        this.modal.close();
        // location.reload();
      }
    })
  }
}
