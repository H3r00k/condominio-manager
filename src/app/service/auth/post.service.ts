import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewPostPayload, Post } from '../../models/posts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:3000/posts';
  private readonly API_KEY = '$2a$12$1.A9iORrDntT8lu.JHGPT.2/pByjWQAA7KACETTUZs/3t1NgtKzMi';

  addPost(post: NewPostPayload): Observable<Post> {
    const headers = new HttpHeaders({ 'x-api-key': this.API_KEY });
    return this.http.post<Post>(this.API_URL, post, { headers });    
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL);

  }

  deletePost(id: string): Observable<void>{
    const headers = new HttpHeaders({ 'x-api-key' : this.API_KEY});
    return this.http.delete<void>(`${this.API_URL}/${id}`, {headers});
  }
}
