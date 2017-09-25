import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarSenha } from './alterar-senha';

@NgModule({
  declarations: [
    AlterarSenha,
  ],
  imports: [
    IonicPageModule.forChild(AlterarSenha),
  ],
})
export class AlterarSenhaModule {}
