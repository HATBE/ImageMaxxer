import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { UploadFormComponent } from './pages/upload-form/upload-form.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LandingPageComponent, title: 'Home' },
      {
        path: 'upload',
        component: UploadFormComponent,
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
