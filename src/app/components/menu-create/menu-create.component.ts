import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Menu, MenuService} from "../../services/menu.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-menu-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './menu-create.component.html',
  styleUrl: './menu-create.component.scss'
})
export class MenuCreateComponent {
  menu: Menu = {
    name: '',
    price: 0,
    taste: 'sweet',
    is_drink: false,
    ingredients: [],
    num_sales: 0
  };
  error: string = '';

  constructor(private menuService: MenuService, private router: Router) { }

  onSubmit(): void {
    this.menuService.createMenu(this.menu).subscribe({
      next: () => this.router.navigate(['/menus']),
      error: () => this.error = 'Failed to create menu item'
    });
  }

  addIngredient(ingredient: string): void {
    if (ingredient && !this.menu.ingredients.includes(ingredient)) {
      this.menu.ingredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: string): void {
    this.menu.ingredients = this.menu.ingredients.filter(i => i !== ingredient);
  }

}
