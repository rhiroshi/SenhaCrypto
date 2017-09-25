import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ToastController } from 'ionic-angular';
import { Encriptador } from '../../providers/encriptador/encriptador';
import { Dao } from '../../providers/dao/dao';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

	private senha: string;

  constructor(public storage: Storage, public toast: ToastController, public alert: AlertController, public app: App, public dao: Dao, public encriptador: Encriptador, public navCtrl: NavController, public navParams: NavParams) {
  }

  logar() {
	  if (this.encriptador.gerarHash(this.senha) === this.dao.senhaHash) {
		  this.dao.setSenha(this.senha);
		  this.dao.abrir();
		  this.app.getRootNav().popToRoot().then(() => {
			  this.app.getRootNav().setRoot('Tabs');
		  });
	  } else {
		  this.toast.create({
			  message: 'Senha inválida',
			  duration: 1500,
			  position: 'top'
		  }).present();
	  }
  }

  esqueceu() {
	  this.alert.create({
		  message: 'Ao resetar a senha, todos os dados serão perdidos!!!! Deseja mesmo resetar a senha?',
		  buttons: [{
			  text: 'Sim',
			  handler: () => {
				  this.storage.remove('dados');
				  this.app.getRootNav().popToRoot().then(() => {
					  this.app.getRootNav().setRoot('Cadastro');
				  });
			  }
		  }, {
                          text: 'Nao'
			  }]
	  }).present();
  }

}
