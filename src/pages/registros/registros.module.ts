import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registros } from './registros';

@NgModule({
  declarations: [
    Registros,
  ],
  imports: [
    IonicPageModule.forChild(Registros),
  ],
})
export class RegistrosModule {}
