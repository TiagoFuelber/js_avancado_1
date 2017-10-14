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

		console.log('entrou aqui');

		throw new Error('Você não pode adicionar dados');
		return;
		
		let data = new Date(
				this._inputData.value.split('-')
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