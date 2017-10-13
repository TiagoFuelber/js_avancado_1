class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData 		= $('#data');
		this._inputQuantidade 	= $('#quantidade');
		this._inputValor		= $('#valor');
		Object.freeze(this);
	}

	adiciona(event) {
		event.preventDefault;
		
		let data = new Date(
				this._inputData.value.split('-');
			);

		this.limpaFormulario();

		return new Negociacao(
				new Date(data.getDate()), 
				this._inputQuantidade.value, 
				this._inputValor.value
			);
	}

	limpaFormulario() {
		document.querySelector('form').reset();
		this._inputData[0].focus();
	}
}