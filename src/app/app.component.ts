import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dao } from '../providers/dao/dao';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(file: File, platform: Platform, dao: Dao, statusBar: StatusBar, splashScreen: SplashScreen) {
	  platform.ready().then(() => {
		  dao.ler().then(() => {
			  if (dao.senhaHash) {
				  this.rootPage = 'Login';
			  } else {
				  this.rootPage = 'Cadastro';
			  }
		  }).catch(() => {
			  this.rootPage = 'Cadastro';
		  });

              /*
		  let diretorio = file.externalDataDirectory + 'SenhaCrypto/';
		  dao.checarArquivo().then(() => {
			  console.log('Diretorio existe');
			  file.checkFile(diretorio, 'dados.sea').then(() => {
				  console.log('Arquivo existe');
        
				  dao.ler().then(() => {
					  console.log('lido');
				      this.rootPage = 'Login';
				  });
			  }).catch(err => {
				  console.log('Arquivo nao existe : ', err);
				  file.createFile(diretorio, 'dados.sea', false).then(() => {
					  console.log('Arquivo criado');
					  this.rootPage = 'Cadastro';
				  }).catch(err => {
					  console.log('Erro ao criar arquivo: ', err);
				  });
			  });
		  }).catch(err => {
			  console.log('Diretorio nao existe: ', err);
			  file.createDir(file.externalDataDirectory, 'SenhaCrypto', false).then(() => {
				  console.log('Diretorio criado!');
				  file.createFile(diretorio, 'dados.sea', false).then(() => {
					  console.log('Arquivo criado');
					  this.rootPage = 'Cadastro';
				  }).catch(err => {
					  console.log('Erro ao criar arquivo: ', err);
				  });
			  }).catch(err => {
				  console.log('Erro ao criar diretorio : ', err);
			  });
	        });*/
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}



