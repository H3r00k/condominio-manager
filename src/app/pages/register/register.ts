import { Component, inject } from '@angular/core';
import { NavigationService } from '../../service/navigation.service';
import { NewUser } from '../../models/user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/auth/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected nav = inject(NavigationService)
  protected view = this.nav.view;
  protected userService = inject(UserService);

  formData: NewUser ={
    name: '',
    subname: '',
    email: '',
    villetta: '',
    password: '',
  };
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';

  goToLoginPage() {
    this.nav.setViewHome('login');
  }

  onSubmit(form: NgForm){
    if (this.formData.password !== this.confirmPassword) {
      this.errorMessage = 'le password non corrispondono!';
      this.successMessage = '';
      setTimeout(() => form.reset(), 1500);
      setTimeout(() => this.errorMessage = '', 1500);
      return;      
    }

    this.userService.registerUser(this.formData).subscribe({
      next: (user) => {
        this.successMessage = 'registrazione completata con successo!';
        this.errorMessage = '';
        setTimeout(() => this.nav.setViewHome('login'), 1500);
      },
      error: (err) => {
        this.errorMessage = 'errore durante la registrazione. Riprova!';
        this.successMessage = '';
      }
    })

    
  }

}
