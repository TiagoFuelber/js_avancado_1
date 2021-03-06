'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = require('./HttpService');

var _Negociacao = require('../models/Negociacao');

var _ConnectionFactory = require('./ConnectionFactory');

var _NegociacaoDao = require('../Dao/NegociacaoDao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = exports.NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new _HttpService.HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {

            return this._http.get('negociacoes/semana').then(function (negociacoes) {
                console.log(negociacoes);
                return negociacoes.map(function (objeto) {
                    return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {

            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                console.log(negociacoes);
                return negociacoes.map(function (objeto) {
                    return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {

            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                console.log(negociacoes);
                return negociacoes.map(function (objeto) {
                    return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {

            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []).map(function (dado) {
                    return new _Negociacao.Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                });

                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {

            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {

            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociações apagadas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            });
        }
    }]);

    return NegociacaoService;
}();