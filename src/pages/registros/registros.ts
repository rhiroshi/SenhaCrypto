import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Dao, Registro } from '../../providers/dao/dao';

@IonicPage()
@Component({
  selector: 'page-registros',
  templateUrl: 'registros.html',
})
export class Registros {

  constructor(public modal: ModalController, public dao:Dao, public navCtrl: NavController, public navParams: NavParams) {
  }

  novoRegistro() {
	  this.modal.create('NovoRegistro').present();
  }

}
