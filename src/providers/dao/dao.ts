import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Encriptador } from '../encriptador/encriptador';
import 'rxjs/add/operator/map';
import TextEncoder from 'text-encoding';

@Injectable()
export class Dao {

	private diretorio = this.file.externalDataDirectory+'SenhaCrypto/';
	public senhaHash: string = '';
	private registros: Registro[];
	private registrosEncriptados: Uint8Array;
	private senha: string;

	constructor(private storage: Storage, private file: File, private encriptador: Encriptador) {
  }

	setSenha(senha: string) {
		this.senha = senha;
	}
	cadastraSenha(senhaHash: string) {
		this.senhaHash = senhaHash;
		this.salvarArquivo();
	}

	checarArquivo() {
		return this.file.checkDir(this.file.externalDataDirectory, 'SenhaCrypto');
	}

	novoRegistro(registro: Registro) {
		if (!this.registros) {
			this.registros = new Array<Registro>();
		}
		this.registros.push(registro);
		console.log('Registros desencriptados - ', this.registros);
		this.salvarArquivo();
	}

	salvarArquivo() {
		let registrosEncriptados: Uint8Array;
		if (this.registros) {
			registrosEncriptados = this.encriptador.encriptar(JSON.stringify(this.registros), this.senha);
		}

		let dadoJson = {
			senhaHash: this.senhaHash,
			registrosEncriptados: registrosEncriptados
		};
		console.log("ESCREVENDO OBJETO JSON: ", dadoJson);
		this.storage.set('dados', dadoJson);
	      console.log("Dados escritos no arquivo");
		/*return new Promise((resolve) => {
			this.file.writeFile(this.diretorio, 'dados.sea', dado, { append: true }).then(() => {
				console.log('Dado escrito no arquivo!');
				resolve(true);
			}).catch(err => {
				console.log('Erro ao escrever no arquivo: ', err);
				resolve(false);
			});
		}
            );*/
	}


	abrir() {
		if (this.registrosEncriptados) {
			console.log('Abrindo registros... ', typeof(this.registrosEncriptados));
			let desencriptado = this.encriptador.desencriptar(this.registrosEncriptados, this.senha);
			console.log('Desencriptado : ', desencriptado);
			this.registros = desencriptado;
		}
	}

	ler(){
		return new Promise((resolve) => {
			this.storage.get('dados').then(dadosJson => {
				console.log('lendo ', dadosJson);
				this.senhaHash = dadosJson.senhaHash;
				this.registrosEncriptados = dadosJson.registrosEncriptados;
				resolve(true);
			}).catch(er => {
				console.log('erro ao ler', er);
				resolve(false);
			});

			/*this.file.readAsText(this.diretorio, 'dados.sea').then(dado => {
				let json = JSON.parse(dado);

				console.log("LENDO DADO JSON1: ", json);

				//json.registrosEncriptados = temp;

				this.senhaHash = json.senha;
				if (json.registrosEncriptados) {
					let temp = new TextEncoder.TextEncoder("utf-8").encode(json.registrosEncriptados);
					console.log('Temp = ', temp);
					console.log('existe registros ', json.registrosEncriptados);
					this.registrosEncriptados = temp;
				}
				console.log("LENDO DADO JSON2: ", json);
				resolve(true);
			}).catch(err => {
				console.log('Erro ao ler : ', err);
				resolve(false);
			});*/
		});
	}
      


}

export class Registro{

	public aplicacao: string;
	public usuario: string;
	public senha: string;

	public Registro() { }

}
