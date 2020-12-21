import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  controller = '/carimage';

  constructor(private http: HttpClient) { }

  addImageFileToCar(entityId: string, imageFile: File): Observable<HttpEvent<{}>>
  {
    const formData: FormData = new FormData();
    formData.append('imagefile', imageFile);

    const req = new HttpRequest('POST', environment.apiBaseUrl + this.controller + '/' + entityId, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
