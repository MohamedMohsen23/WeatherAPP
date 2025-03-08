import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavForProfileComponent } from '../nav-for-profile/nav-for-profile.component';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavForProfileComponent,
    RouterModule,
    DashboardComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  showImage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showImage = this.router.url === '/home';
    });
  }
}
