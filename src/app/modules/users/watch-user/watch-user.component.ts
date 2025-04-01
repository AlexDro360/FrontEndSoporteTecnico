import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-watch-user',
  templateUrl: './watch-user.component.html',
  styleUrls: ['./watch-user.component.scss']
})
export class WatchUserComponent {
  @Output() UserE: EventEmitter<any> = new EventEmitter();
  @Input() roles: any[];
  @Input() USER_SELECTED: any;

  constructor(
    public modal: NgbActiveModal,
    public userService: UsersService,
    public toast: ToastrService,
  ) {  }
}
