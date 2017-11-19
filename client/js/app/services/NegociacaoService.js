class NegociacaoService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    obterNegociacoesDaSemana() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  
       });        
    }
    
    obterNegociacoesDaSemanaAnterior() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  
       }); 
       
        
    }
    
    obterNegociacoesDaSemanaRetrasada() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  
       }); 
    }    
    
    
    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }    

    adicionar(negociacao) {

        console.log(negociacao);

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))            
            .then(dao => 
                dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(e => {
                console.log(e);
                throw new Error('Não foi possível adicionar negociação');
            });
    }

    apagar() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => mensagem)
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possivel apagar as negociações');
            })
    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes)
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível listar as negociações');
            });
    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente => 
                        negociacao.isEquals(negociacaoExistente)))
            )
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível buscar negociações para importar');
            })
    }
}

