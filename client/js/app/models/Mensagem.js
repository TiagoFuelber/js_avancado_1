class Mensagem {

	constructor(text="") {

		this._texto = text;
	}

	get mensagem() {

		return this._texto;
	}

	set mensagem(text) {

		this._texto = text;
	}
}