import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Configuracoes } from './configuracoes';

@NgModule({
  declarations: [
    Configuracoes,
  ],
  imports: [
    IonicPageModule.forChild(Configuracoes),
  ],
})
export class ConfiguracoesModule {}
