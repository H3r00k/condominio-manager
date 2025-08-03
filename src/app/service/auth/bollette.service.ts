import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bolletta } from '../../models/bolletta.model';

@Injectable({
  providedIn: 'root'
})
export class BolletteService {
  private http = inject(HttpClient);

  private readonly API_UPLOAD = 'http://localhost:3000/upload-bollette';
  private readonly API_URL = 'http://localhost:3000/bollette';
  private readonly API_KEY = '$2a$12$1.A9iORrDntT8lu.JHGPT.2/pByjWQAA7KACETTUZs/3t1NgtKzMi';

  uploadBolletta(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.API_KEY
    });

    return this.http.post(this.API_UPLOAD, formData, {headers});
  }

  getBollette(): Observable<Bolletta[]> {
    return this.http.get<Bolletta[]>(this.API_URL);
  }

  deleteBolletta(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.API_KEY
    });

    return this.http.delete(`${this.API_URL}/${id}`, {headers});
  }
}
