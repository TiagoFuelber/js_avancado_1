import {currentInstance} from 'js/app/controllers/NegociacaoController';
import {} from 'js/app/polyfill/fetch';

let negociacaoController = new currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);