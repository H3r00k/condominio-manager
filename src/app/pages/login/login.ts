import { Component, inject } from '@angular/core';
import { NavigationService } from '../../service/navigation.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/auth/user.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected nav = inject(NavigationService);
  protected view = this.nav.view;
  protected userService = inject(UserService);
  protected authService = inject(AuthService);

  loginData = {
    email: '',
    password: '',
  };

  successMessage = '';
  errorMessage = '';

  goToRegisterPage() {
    this.nav.setViewHome('register');
  }

  onSubmit(form: NgForm) {
    const { email, password } = this.loginData;

    this.userService.loginUser(email, password).subscribe({
      next: (user) => {
        this.successMessage = 'Login Effettuato!';
        this.errorMessage = '';
        this.authService.login(user);
        this.nav.setViewHome('home');
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = 'Credenziali non Valide!';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2500);
        form.reset();
      },
    });
  }
}
