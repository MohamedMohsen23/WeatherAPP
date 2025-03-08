import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

pdfDefaultOptions.workerSrc = () => './assets/pdf.worker.min.js';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
