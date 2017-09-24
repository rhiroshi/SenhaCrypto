import { Injectable } from '@angular/core';
import asmCrypto from "asmcrypto.js";
import 'rxjs/add/operator/map';

@Injectable()
export class EncriptadorProvider {

	private aesKey: any;
	private salt = "Frase que nao precisa esconder";
	private iterations = 100; //numero de interacoes pra encriptar com o PBKDF2. o ideal eh acima de 1000 porem uso 100 aqui pra ficar mais rapido
	private nonceLen = 12;
      constructor() {
      }

	gerarChave(senha: string) {
		this.aesKey = asmCrypto.PBKDF2_HMAC_SHA256.bytes(senha, this.salt, this.iterations, 32);  //gera uma chave de 32 bytes (256 bit)
	}

	encriptar(dado) {
		const nonce = new Uint8Array(this.nonceLen);
		asmCrypto.getRandomValues(nonce); //cria um nonce pra concatenar com os dados encriptados.

		const encriptado = asmCrypto.AES_GCM.encrypt(dado, this.aesKey, nonce);

		//concatenando o nonce com os dados 
		const buf = new Uint8Array(nonce.length + encriptado.length);
		nonce.forEach((byte, i) => buf[i] = byte);
		encriptado.forEach((byte, i) => buf[i + nonce.length] = byte);
		return buf; //aqui, temos concatenado (dados encriptados) + (nonce)
	}

	desencriptar(buf: Uint8Array) {
		//separar o dado encritado do nonce
		const nonce = new Uint8Array(this.nonceLen);
		const dado = new Uint8Array(buf.length - this.nonceLen);
		buf.forEach((byte, i) => {
			if (i < this.nonceLen) {
				nonce[i] = byte;
			} else {
				dado[i - this.nonceLen] = byte;
			}
		});
		const parts = { nonce, dado }; //aqui temos os dados encriptados separado do nonce :)

		//desencriptando
		const dadoDesencriptado = asmCrypto.AES_GCM.decrypt(parts.dado, this.aesKey, parts.nonce);
		//Aqui o dado está em byte e precisa ser traduzido pra string e depois pra JSON.
		const dadoDesencriptadoString = asmCrypto.bytes_to_string(dadoDesencriptado);
		return JSON.parse(dadoDesencriptadoString); //retorna o JSON pronto pra usar! :D
	}

}
