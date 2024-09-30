import { Component } from '@angular/core';
import {Person, PersonService} from "../../services/person.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.scss'
})
export class PersonCreateComponent {
  person: Person = {
    name: '',
    age: 0,
    work: 'chef',
    mobile: '',
    email: '',
    address: '',
    salary: ''
  };
  error: string = '';

  constructor(private personService: PersonService, private router: Router) { }

  onSubmit(): void {
    this.personService.createPerson(this.person).subscribe({
      next: () => this.router.navigate(['/persons']),
      error: () => this.error = 'Failed to create person'
    });
  }
}
