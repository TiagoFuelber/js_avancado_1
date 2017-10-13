var form = document.querySelector('.form');

var pegaDados = function() {
	var 
		data	 	= form.querySelector('#data'),
		quantidade 	= form.querySelector('#quantidade'),
		valor 		= form.querySelector('#valor')
	;

	var valores = {
		'data' 			: data.value,
		'quantidade' 	: quantidade.value,
		'valor'			: valor.value
	};

	return valores;
}

var montaTr = function() {
	var tr = document.createElement('tr');

	for(i = 1; i < 5; i++ ) {
		var td = document.createElement('td');
		tr.appendChild(td);
	}

	return tr;
}

var preencheTr = function(tr, dados) {
	var tds = tr.querySelectorAll('td');
	tds[0].textContent = dados.data;
	tds[1].textContent = dados.quantidade;
	tds[2].textContent = dados.valor;
	tds[3].textContent = dados.valor * dados.quantidade;

	return tr;
}

var criaRegistro = function(event) {
	event.preventDefault();

	var 
		tr = montaTr(),
		dados = pegaDados(),
		tbody = document.querySelector('tbody');
	;

	tr = preencheTr(tr, dados);
	tbody.appendChild(tr);
	form.reset();
}

form.addEventListener('submit', criaRegistro);