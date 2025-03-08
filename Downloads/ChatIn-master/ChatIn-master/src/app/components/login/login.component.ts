import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../services/user-auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginObject = new Login();
  isLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: UserAuthService
  ) {}

  onLogin() {
    this.isLoading = true;
    console.log('Login Object:', this.loginObject);

    this.http
      .post('http://localhost:3000/api/auth/login', this.loginObject)
      .subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          this.isLoading = false;
          if (res && res.token && res.user) {
            localStorage.setItem('authToken', res.token);
            this.authService.setFlag(true);
            this.router.navigate(['/home']);
          } else {
            alert(
              res?.message || 'Login failed. Please check your credentials.'
            );
          }
        },
        error: (err) => {
          console.error('Error occurred:', err);
          alert('An error occurred. Please try again later.');
          this.isLoading = false;
        },
      });
  }
}

class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
