class NegociacaoService {
    
  constructor() {

    this._http = new HttpService();
  }

  importaNegociacoes() {
        
    return Promise.all([
            this._obterNegociacoesDaSemana(),
            this._obterNegociacoesDaSemanaAnterior(),
            this._obterNegociacoesDaSemanaRetrasada()                                                
        ])
        .then(periodos => {

          let negociacoes = periodos
              .reduce((dados, periodo) => dados.concat(periodo), []);
              
          return negociacoes;

        })
        .catch(erro => {
          throw new Error(erro);
        });
  }

  _obterNegociacoesDaSemana() {
    
    return this._http
      .get('negociacoes/semana')
      .then(negociacoes => { 
        return negociacoes.map(objeto => {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        })
      })
      .catch(erro => {
        console.log(erro);
        return 'Não foi possível obter as negociações da semana';
      });    
  };

  _obterNegociacoesDaSemanaAnterior() {
    
    return this._http
      .get('negociacoes/anterior')
      .then(negociacoes => { 
        return negociacoes.map(objeto => {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        })
      })
      .catch(erro => {
        console.log(erro);
        return 'Não foi possível obter as negociações da semana anterior';
      });    
  }  

  _obterNegociacoesDaSemanaRetrasada() {
  
    this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => { 
        return negociacoes.map(objeto => {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        })
      })
      .catch(erro => {
        console.log(erro);
        return 'Não foi possível obter as negociações da semana retrasada';
      });    
  }       
}
