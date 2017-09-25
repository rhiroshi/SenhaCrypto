import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Dao } from '../../providers/dao/dao';
import { Encriptador } from '../../providers/encriptador/encriptador';
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class Cadastro {

	private senha: string = '';

  constructor(public app: App, public encriptador: Encriptador, public navCtrl: NavController, public navParams: NavParams, private dao: Dao) {
  }

  cadastrar() {
	  let hash = this.encriptador.gerarHash(this.senha);
	  this.dao.cadastraSenha(hash);
	  this.dao.setSenha(this.senha);
	  this.senha = '';
	  this.app.getRootNav().popToRoot().then(() => {
		  this.app.getRootNav().setRoot('Tabs');
	  });
  }

}
