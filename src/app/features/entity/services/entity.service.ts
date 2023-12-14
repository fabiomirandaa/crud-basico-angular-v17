import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity.interface';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private apiUrl = 'http://localhost:3000/entity';

  constructor(private http: HttpClient) {}

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.apiUrl);
  }

  addEntity(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(this.apiUrl, entity);
  }

  updateEntity(entity: Entity): Observable<Entity> {
    const url = `${this.apiUrl}/${entity.id}`;
    return this.http.put<Entity>(url, entity);
  }

  deleteEntity(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
