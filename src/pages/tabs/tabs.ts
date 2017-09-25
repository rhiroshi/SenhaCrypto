import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class Tabs {

	private tab1Root: any = 'Registros';
	private tab2Root: any = 'Configuracoes';

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}


}
