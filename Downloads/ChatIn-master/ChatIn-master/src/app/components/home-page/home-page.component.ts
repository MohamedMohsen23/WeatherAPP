import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router, private authService: UserAuthService) {}
  isLoggedIn(): boolean {
    return this.authService.getFlag();
  }
}
