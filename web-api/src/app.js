const http          = require('http');
const express       = require('express');
const status        = require('http-status');
const spoilerRoute  = require('./routes/spoiler');
const sequelizeDB   = require('./database/database');

const app = express();

app.use(express.json());
app.use('/api', spoilerRoute);

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

/*Retorna promisse * o parametro {force:true} toda vez que o servidor for inicializado ele apaga todas as tabelas
 e cria elas novamente do zero e vazias uma vez criada as tabelas remova esse parametro */
 //sequelize.sync({ force: true }) 
 sequelizeDB.sync() 
    .then(()=> {
        const port = process.env.PORT || 3001;
        app.set('port', port);

        const server = http.createServer(app);

        server.listen(port);
    });
   



