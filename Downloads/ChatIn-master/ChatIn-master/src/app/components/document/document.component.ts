import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
  showSent: boolean = false;
  showReceived: boolean = false;
  email = new FormControl('');

  document: File | null = null;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file && file.type !== 'application/pdf') {
      alert('Please select a valid PDF file.');
      return;
    }
  
    this.document = file;
  }
  onSubmit() {
    if (!this.document || !this.email.value) {
      alert('Please enter an email and select a PDF file.');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('email', this.email.value);
    formData.append('document', this.document);

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // console.log('Email:', this.email.value);
    // console.log('Selected File:', this.document);
    // console.log('File Type:', this.document?.type);

    this.http
      .post('http://localhost:3000/api/signature-requests', formData, {
        headers,
      })
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.isLoading = false;
          alert('Request sent successfully!');
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
          if (error.status === 400) {
            alert('Bad Request: Please check the file and try again.');
            console.log('Server Response:', error);
          } else {
            alert('An error occurred. Please try again.');
          }
        },
      });
  }

  toggleSent() {
    this.showSent = !this.showSent;
    if (this.showReceived) {
      this.showReceived = false;
    }
  }

  toggleReceived() {
    this.showReceived = !this.showReceived;
    if (this.showSent) {
      this.showSent = false;
    }
  }
}
