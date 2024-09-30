import { Component } from '@angular/core';
import {Menu, MenuService} from "../../services/menu.service";
import {Router, RouterLink} from "@angular/router";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent {
  menus: Menu[] = [];
  error: string = '';

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.fetchMenus();
  }

  fetchMenus(): void {
    this.menuService.getMenus().subscribe({
      next: (data) => this.menus = data,
      error: () => this.error = 'Failed to load menus'
    });
  }

  deleteMenu(id: string): void {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.menuService.deleteMenu(id).subscribe({
        next: () => this.fetchMenus(),
        error: () => this.error = 'Failed to delete menu item'
      });
    }
  }
}
