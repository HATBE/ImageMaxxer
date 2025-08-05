import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LandingPageComponent, title: 'Home' },
      {
        path: 'upload',
        component: UploadPageComponent,
        title: 'Upload',
      },
      {
        path: 'edit',
        component: EditPageComponent,
        title: 'Edit',
      },
    ],
  },
];
