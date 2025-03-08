import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-nav-for-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './nav-for-profile.component.html',
  styleUrl: './nav-for-profile.component.scss',
})
export class NavForProfileComponent {
  @ViewChild('sidenav') sidenav!: ElementRef; 

  constructor(private router: Router, private authService: UserAuthService) {}

  toggleSidenav() {
    const sidenavElement = this.sidenav.nativeElement;
    sidenavElement.classList.toggle('active');
  }
}
