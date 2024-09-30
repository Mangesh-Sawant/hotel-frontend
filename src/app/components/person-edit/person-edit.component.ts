import { Component } from '@angular/core';
import {Person, PersonService} from "../../services/person.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {
  person: Person | undefined;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getPersons().subscribe({
        next: (persons) => {
          this.person = persons.find(p => p._id === id);
          if (!this.person) {
            this.error = 'Person not found';
          }
        },
        error: () => this.error = 'Failed to load person'
      });
    }
  }

  onSubmit(): void {
    if (this.person && this.person._id) {
      this.personService.updatePerson(this.person._id, this.person).subscribe({
        next: () => this.router.navigate(['/persons']),
        error: () => this.error = 'Failed to update person'
      });
    }
  }
}
