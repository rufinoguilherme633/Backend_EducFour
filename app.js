const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { request, response } = require('express');


const app = express();

app.use((request, response, next) => {

   response.header('Access-Control-Allow-Origin', '*');

   response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

   app.use(cors());

   next();

});

const bodyJson = bodyParser.json();

var controllerEducFour = require('./controller/controler_educfour')
var messages = require('./controller/modulo/config')

app.get('/v1/educ_four/adms', cors(), async function (request, response) {

   let dados = await controllerEducFour.selecionarTodososAdms()

   response.status(200)
   response.json(dados)

   console.log(dados);
   console.log('teste');


})

app.get('/v1/educ_four/news', cors(), async function (request, response) {

   let dados = await controllerEducFour.selecionarTodasAsNoticias()

   response.status(200)
   response.json(dados)

   console.log(dados);
   console.log('teste');
})

app.post('/v1/educ_four/postnews', cors(), bodyJson, async function (request, response) {
   let contentType = request.headers['content-type'];
   let dadosBody = request.body;
   let resultInsertNews = await controllerEducFour.inserirNoticia(dadosBody)
   response.json(resultInsertNews)
   console.log(dadosBody);

})

////////////////////////////////////////////////gg
app.post('/v1/educ_four/postNeighborhood', cors(), bodyJson, async function (request, response) {
   let contentType = request.headers['content-type'];


   if (String(contentType).toLowerCase() == 'application/json') {
      let dadosBody = request.body;
      let resultInsertNeighborhood = await controllerEducFour.inserirBairro(dadosBody)
      response.status(resultInsertNeighborhood.status)
      response.json(resultInsertNeighborhood)
     
   }else {
      response.status(messages.ERROR_INVALID_CONTENT_TYPE.status)
      response.json(messages.ERROR_INVALID_CONTENT_TYPE)
   }

})


app.post('/v1/educ_four/postadm', cors(), bodyJson, async function (request, response) {
   let contentType = request.headers['content-type'];
   if (String(contentType).toLowerCase() == 'application/json') {
      let dadosBody = request.body;
      let resultInsertAdm = await controllerEducFour.inserirAdm(dadosBody)
      // response.status(resultInsertAdm.status)
      response.status(resultInsertAdm.status)
      response.json(resultInsertAdm)

   } else {
      response.status(messages.ERROR_INVALID_CONTENT_TYPE.status)
      response.json(messages.ERROR_INVALID_CONTENT_TYPE)
   }


})

app.get('/v1/educ_four/postadm/:id', cors(), bodyJson, async function (request, response) {

   let idAdm = request.params.id

   let dados = await controllerEducFour.buscarIdAdm(idAdm)
   response.status(dados.status)
response.json(dados) 
})
//////////////////////////////////////////////gg
app.listen(8080, function () {
   console.log('servidor aguardado requisições na porta 8080')
})