import { Component, EventEmitter, OnInit, Output, TemplateRef,inject } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrNotificationService } from '../../services/toastr/toastr-notification.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangepasswordService } from '../../services/password/changepassword.service';
import { LogoutService } from '../../services/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Changed styleUrl to styleUrls
})
export class HeaderComponent implements OnInit {
  changePasswordForm!: FormGroup;
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
  passwordForm: FormGroup;
  showOldPassword: any;
  constructor(private toastrNotificationService: ToastrNotificationService, private changepasswordservice: ChangepasswordService, private logoutservice: LogoutService, private route: Router){
    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit():void{

  }

  SideNavToggled(){
    this.menuStatus=!this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  changePassword(formValue: any) {
    const newPassword = formValue.newPassword;
    const confirmPassword = formValue.confirmPassword;
    const oldPassword = formValue.oldPassword

    if (newPassword !== confirmPassword) {
      this.toastrNotificationService.showError("Password and Confirm password should be same!", "Error!");
      return; 
    }

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
  
    if (!email || !token) {
      this.toastrNotificationService.showError("Email or token not found!", "Error!");
      return; 
    }

    this.changepasswordservice.onChangePassword({ email, oldPassword, newPassword }).subscribe(
      (obj: any) => {
        this.toastrNotificationService.showError(obj, "Success!");
      },
      (error) => {
        console.error('Error occurred:', error);
        this.toastrNotificationService.showError('Error occurred:',error);
      }
    );
  }  

  toggleShowPassword(field: string): void {
    if (field === 'oldPassword') {
      this.showOldPassword = !this.showOldPassword;
    } else if (field === 'newPassword') {
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

  logout() {
    this.logoutservice.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        this.route.navigateByUrl('/');
      },
      (error) => {
        this.toastrNotificationService.showError("Something Went Wrong", "Error!");
      }
    );
  }
}

function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

