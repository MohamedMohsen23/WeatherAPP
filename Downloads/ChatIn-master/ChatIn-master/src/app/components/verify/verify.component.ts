import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent {
  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            e.target.result as string
          );
        }
      };

      reader.readAsDataURL(file);
    } else {
      alert('Error:');
    }
  }
  onclick(event: Event) {
    event.preventDefault();

    const input = document.getElementById('file-upload') as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post('http://localhost:3000/api/auth/verify', formData)
        .subscribe({
          next: (res: any) => {
            console.log('Response:', res);
            this.router.navigate(['/home/verify']);
          },
          error: (err) => {
            console.error('Error occurred:', err);
            alert('An error occurred. Please try again later.');
          },
        });
    } else {
      alert('Please select a file first.');
    }
  }
}
