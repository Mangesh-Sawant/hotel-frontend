import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/menu-create/menu-create.component';
import { MenuEditComponent } from './components/menu-edit/menu-edit.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/menus', pathMatch: 'full' },

  // Menu Routes
  { path: 'menus', component: MenuListComponent },
  { path: 'menus/create', component: MenuCreateComponent },
  { path: 'menus/edit/:id', component: MenuEditComponent },

  // Person Routes
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/create', component: PersonCreateComponent },
  { path: 'persons/edit/:id', component: PersonEditComponent },

  { path: '**', redirectTo: '/menus' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
