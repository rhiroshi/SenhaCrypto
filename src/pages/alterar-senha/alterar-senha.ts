import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import { Dao } from '../../providers/dao/dao';
import { Encriptador } from '../../providers/encriptador/encriptador';
@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenha {

	private senhaAntiga: string;
	private senhaNova: string;

  constructor(public encriptador: Encriptador, public view: ViewController, public toast: ToastController, public navCtrl: NavController, public dao: Dao, public navParams: NavParams) {
  }


  alterar() {
	  let senhaAntigaHash = this.encriptador.gerarHash(this.senhaAntiga);
	  if (senhaAntigaHash === this.dao.senhaHash) {
		  let senhaNovaHash = this.encriptador.gerarHash(this.senhaNova);
		  this.dao.setSenha(this.senhaNova);
		  this.dao.cadastraSenha(senhaNovaHash);
		  this.toast.create({
			  message: 'Senha alterada',
			  duration: 1500,
			  position: 'top'
		  }).present();
		  this.fechar();
	  } else {
		  this.toast.create({
			  message: 'Senha invalida',
			  duration: 1500,
                    position: 'top'
		  }).present();
	  }
  }

  fechar() {
	  this.view.dismiss();
  }

}
