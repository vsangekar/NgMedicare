import { Component, EventEmitter, Output, TemplateRef,inject } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrNotificationService } from '../../services/toastr/toastr-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Changed styleUrl to styleUrls
})
export class HeaderComponent {
  private modalService = inject(NgbModal);
	closeResult = '';
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus:boolean=false;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  currentPassword: any;
  newPassword: any;
  confirmPassword: any;
  constructor(private toastrNotificationService: ToastrNotificationService){
    
  }

  ngOnInit():void{}

  SideNavToggled(){
    this.menuStatus=!this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  changePassword(newPassword: string, confirmPassword: string): void {
    const token = localStorage.getItem('token');
    let email: string = "";
    let password=newPassword;
    if(password!= confirmPassword){
      this.toastrNotificationService.showError("Password and Confirm password should be same!", "Error!");
    }
    if (token) {
      const decodedToken: any = jwt_decode(token);
      email = decodedToken.email; 
    }
  }

  toggleShowPassword(field: string): void {
   if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}

function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

