import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class Configuracoes {

	constructor(public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

	alterarSenha() {
		this.modal.create('AlterarSenha').present();
  }

}
