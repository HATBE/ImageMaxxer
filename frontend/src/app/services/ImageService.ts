import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllowedFormats } from '../models/AllowedFormats';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public upload(formData: FormData): Promise<{ status: boolean; message: string; data: any }> {
    return firstValueFrom(
      this.http.post<any>(`http://localhost:3000/api/v1/image/`, formData, {
        withCredentials: true,
      })
    );
  }
}
