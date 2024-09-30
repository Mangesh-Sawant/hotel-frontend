import { Component } from '@angular/core';
import {Person, PersonService} from "../../services/person.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {
  persons: Person[] = [];
  error: string = '';

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPersons();
  }

  fetchPersons(): void {
    this.personService.getPersons().subscribe({
      next: (data) => this.persons = data,
      error: () => this.error = 'Failed to load persons'
    });
  }

  deletePerson(id: string): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe({
        next: () => this.fetchPersons(),
        error: () => this.error = 'Failed to delete person'
      });
    }
  }
}
