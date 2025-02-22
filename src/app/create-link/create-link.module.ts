import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLinkPageRoutingModule } from './create-link-routing.module';

import { CreateLinkPage } from './create-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLinkPageRoutingModule
  ],
  declarations: [CreateLinkPage]
})
export class CreateLinkPageModule {}
