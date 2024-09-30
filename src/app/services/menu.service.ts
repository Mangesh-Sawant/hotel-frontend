import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Menu {
  _id?: string;
  name: string;
  price: number;
  taste: 'sweet' | 'spicy' | 'sour';
  is_drink: boolean;
  ingredients: string[];
  num_sales: number;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'https://hotel-1-0dup.onrender.com/menu'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenusByTaste(taste: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/${taste}`);
  }

  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  updateMenu(id: string, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menu);
  }

  deleteMenu(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
