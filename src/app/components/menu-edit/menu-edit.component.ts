import { Component } from '@angular/core';
import {Menu, MenuService} from "../../services/menu.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.scss'
})
export class MenuEditComponent {
  menu: Menu | undefined;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.menuService.getMenus().subscribe({
        next: (menus) => {
          this.menu = menus.find(m => m._id === id);
          if (!this.menu) {
            this.error = 'Menu item not found';
          }
        },
        error: () => this.error = 'Failed to load menu item'
      });
    }
  }

  onSubmit(): void {
    if (this.menu && this.menu._id) {
      this.menuService.updateMenu(this.menu._id, this.menu).subscribe({
        next: () => this.router.navigate(['/menus']),
        error: () => this.error = 'Failed to update menu item'
      });
    }
  }

  addIngredient(ingredient: string): void {
    if (ingredient && this.menu && !this.menu.ingredients.includes(ingredient)) {
      this.menu.ingredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: string): void {
    if (this.menu) {
      this.menu.ingredients = this.menu.ingredients.filter(i => i !== ingredient);
    }
  }
}
