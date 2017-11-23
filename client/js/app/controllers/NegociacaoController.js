class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
         
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');  

        this._service = new NegociacaoService();  

        this._ordemAtual = '';
        
        this._init();    
    }

    _init() {

        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(e => {
                console.log(e);
                this._mensagem.texto = "Não foi possivel obter as negociações";
            })

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }
    
    adiciona(event) {
        
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        
        this._service
            .adicionar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso'; 
                this._limpaFormulario();   
            })
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });
    }
    
    importaNegociacoes() {
        
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);               
    }
    
    apaga() {
        
        return this._service
            .apagar()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            }) 
            .catch(e => console.log(e));
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseFloat(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    ordena(coluna) {

        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;   
    }
}