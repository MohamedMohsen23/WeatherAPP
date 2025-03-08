import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyComponent } from './components/verify/verify.component';
import { DocumentComponent } from './components/document/document.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: ProfileComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'chat', component: ChatPageComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'document', component: DocumentComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];
