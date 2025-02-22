import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLinkPage } from './create-link.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLinkPageRoutingModule {}
