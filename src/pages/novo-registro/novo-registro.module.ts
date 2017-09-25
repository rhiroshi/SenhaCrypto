import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoRegistro } from './novo-registro';

@NgModule({
  declarations: [
    NovoRegistro,
  ],
  imports: [
    IonicPageModule.forChild(NovoRegistro),
  ],
})
export class NovoRegistroModule {}
