import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

type CollapseState = {
  professors: boolean;
  students: boolean;
  teachingAssistants: boolean;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  professors: any[] = [];
  isfetch: boolean = false;
  counter: number = 0;
  isCollapsed: CollapseState = {
    professors: false,
    students: false,
    teachingAssistants: false,
  };
  inviteObject = new invite();
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  onInvite() {
    this.isLoading = true;
    console.log('Invite Object:', this.inviteObject);

    this.http
      .post('http://localhost:3000/api/professors', this.inviteObject)
      .subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          this.isLoading = false;
          if (res) {
            alert('Invitation sent successfully.');
          } else {
            alert(res?.message || 'Failed to send invitation.');
          }
        },
        error: (err) => {
          console.error('Error occurred:', err);
          alert(
            err.error?.message || 'An error occurred. Please try again later.'
          );
          this.isLoading = false;
        },
      });
  }

  fetchData() {
    this.isfetch = true;

    this.http.get<any[]>('http://localhost:3000/api/professors').subscribe({
      next: (response) => {
        console.log('Data:', response);
        this.professors = response;
        this.isfetch = false;
        this.counter = this.professors.length;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isfetch = false;
      },
    });
  }

  toggleCollapse(section: keyof CollapseState) {
    (Object.keys(this.isCollapsed) as (keyof CollapseState)[]).forEach(
      (key) => {
        if (key !== section) {
          this.isCollapsed[key] = false;
        }
      }
    );
    this.isCollapsed[section] = !this.isCollapsed[section];
    if (section === 'professors' && this.isCollapsed.professors) {
      this.fetchData();
    }
  }
}

class invite {
  username: string;
  email: string;

  constructor() {
    this.username = '';
    this.email = '';
  }
}
