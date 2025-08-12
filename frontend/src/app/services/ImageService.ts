import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(protected http: HttpClient) {}

  public async post(image: File): Promise<{ data: { image: { id: string } } }> {
    const formData = new FormData();
    formData.append('image', image);

    return firstValueFrom(
      this.http.post<any>(`httpo://localhost:3000/api/v1/image/edit/`, formData, {
        withCredentials: true,
      })
    );
  }

  public async postEdit(
    id: string,
    imageEditOptions: ImageEncodeOptions
  ): Promise<{ data: { imageProcessing: { id: string } } }> {
    return firstValueFrom(
      this.http.post<any>(`httpo://localhost:3000/api/v1/image/edit/${id}`, imageEditOptions, {
        withCredentials: true,
      })
    );
  }
}
