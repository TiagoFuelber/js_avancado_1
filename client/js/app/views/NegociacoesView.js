class NegociacoesView {

	constructor(element) {

		this._element = element;
	}

	_template() {

		return `
			<table class="table table-hover table-bordered">
		        <thead>
		            <tr>
		                <th>DATA</th>
		                <th>QUANTIDADE</th>
		                <th>VALOR</th>
		                <th>VOLUME</th>
		            </tr>
		        </thead>
		        
		        <tbody>
		        </tbody>
		        
		        <tfoot>
		        </tfoot>
		    </table>
		`;
	}

	update(element) {

		this._element.innerHTML = this._template();
	}
}