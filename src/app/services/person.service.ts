import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  _id?: string;
  name: string;
  age: number;
  work: 'chef' | 'waiter' | 'manager';
  mobile: string;
  email: string;
  address: string;
  salary: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://hotel-1-0dup.onrender.com/person';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getPersonsByWork(work: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/${work}`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(id: string, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
