import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Image } from '../models/Image';

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

  public async getById(id: string): Promise<{ status: boolean; message: string; data: Image }> {
    try {
      const data = await firstValueFrom(
        this.http.get<{ status: boolean; message: string; data: Image }>(
          `http://localhost:3000/api/v1/image/${id}`,
          { withCredentials: true }
        )
      );

      console.log(data);

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
