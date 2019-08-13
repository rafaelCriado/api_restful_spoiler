const Spoiler       = require("../model/spoiler"); //Spoiler é um objeto sequelize
const status        = require('http-status');

exports.buscarUm = (request, response, next) => {
    const id = request.params.id;

    Spoiler.findByPk(id) //Retorna promisse
        .then(spoiler => {
            if(spoiler){
                response.status(status.OK).send(spoiler);
            }else{
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.buscarTodos = (request, response, next) => {
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    if(!Number.isInteger(limite) || !Number.isInteger(pagina)){
        response.status(status.BAD_REQUEST).send();
    }

    const ITENS_POR_PAGINA = 10;

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina*limite;

    Spoiler.findAll({ limit: limite, offset: pagina}) //Retorna promisse
        .then(spoilers => {
            response.status(status.OK).send(spoilers);
        })
        .catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const titulo        = request.body.titulo;
    const espoliador    = request.body.espoliador;
    const descricao     = request.body.descricao;

    console.log(request);

    Spoiler.create({
        titulo      : titulo,
        espoliador  : espoliador,
        descricao   : descricao
    }).then(()=>{
        response.status(status.CREATED).send();
        //response.location(`${config.hostname}:${config.port}/api/spoilers/${id}`);
    })
    .catch(error => next(error));
}

exports.atualizar = (request, response, next) => {
    const id            = request.params.id;

    const titulo        = request.body.titulo;
    const espoliador    = request.body.espoliador;
    const descricao     = request.body.descricao;

    Spoiler.findByPk(id) //Retorna promisse
        .then(spoiler => {
            if(spoiler){
                Spoiler.update({ //Retorna promisse
                    titulo      : titulo,
                    espoliador  : espoliador,
                    descricao   : descricao
                },
                { where: {id: id} })
                .then(()=>{
                    response.status(status.OK).send();
                })
                .catch(error => next(error));
            }else{
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.excluir = (request, response, next) => {
    const id = request.params.id;

    Spoiler.findByPk(id) //Retorna promisse
        .then(spoiler => {
            if(spoiler){
                Spoiler.destroy({ where : {id: id}}) //Retorna promisse
                    .then(()=>{
                        response.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }else{
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
}