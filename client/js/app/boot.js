'use strict';

System.register(['js/app/controllers/NegociacaoController', 'js/app/polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_jsAppControllersNegociacaoController) {
      currentInstance = _jsAppControllersNegociacaoController.currentInstance;
    }, function (_jsAppPolyfillFetch) {}],
    execute: function () {
      negociacaoController = new currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});