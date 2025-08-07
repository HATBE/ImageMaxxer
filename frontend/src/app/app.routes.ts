import { Routes } from '@angular/router';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UploadPageComponent,
        title: 'Upload',
      },
      {
        path: 'edit',
        component: EditPageComponent,
        title: 'Edit',
      },
      { path: '**', redirectTo: '/' },
    ],
  },
];
