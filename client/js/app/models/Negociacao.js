class Negociacao {
	constructor(data, quantidade, valor) {
		this._data = new Date(data.getDate());
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this);
	}

	get data() {
		return new Date(this._data.getDate());
	}
	get quantidade() {
		return this._quantidade;
	}
	get valor() {
		return this._valor;
	}
	get volume() {
		return this._quantidade * this._valor;
	}
}