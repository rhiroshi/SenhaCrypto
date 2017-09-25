import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { Dao, Registro } from '../../providers/dao/dao';
@IonicPage()
@Component({
  selector: 'page-novo-registro',
  templateUrl: 'novo-registro.html',
})
export class NovoRegistro {

	public registro: Registro = new Registro();

	constructor(public view: ViewController, public dao: Dao, public navCtrl: NavController, public navParams: NavParams) {
  }

	salvar() {
		if (this.registro.aplicacao && this.registro.usuario && this.registro.senha) {
			this.dao.novoRegistro(this.registro);
			this.view.dismiss();
		}
	}

	fechar() {
		this.view.dismiss();
	}

}
