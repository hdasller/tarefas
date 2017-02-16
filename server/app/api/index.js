var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/alurapic');

mongoose.connection.on('connected', function() {
	console.log('Conectado ao MongoBD');
});

mongoose.connection.on('error', function (error) {
	console.log('Erro na aplicacao' + error);
});

mongoose.connection.on('disconnected', function (error) {
	console.log('Desconectado do  MongoBD' + error);
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('conexao fechada  pelo termino da aplicacao')
		process.exit(0);

	})
});

var schema = mongoose.Schema({

	titulo:{
		type: String,
		required: true
	},
    descricao:{
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true},
    data: {
        type: Date,
		required: true
    }    
});

var database = mongoose.model('TaskFinal2', schema);



var api = {}

api.adiciona = function(req, res) {
    var foto = req.body;
    delete foto._id;
console.log(foto.url);
var status = ['Pendente','Em curso','Concluido']
     for (var i = 0; i<3 ;i++){

 if (foto.url == status[i]){
foto.descricao = i+1;
     }

     }
    
    
    foto.data = new Date();
   
    	database
	.create(foto)
	.then(function (foto){//serve para saber o id 
		res.json(foto);
	}, function (error) {
		console.log(error);
		res.status(500).json(error);

	})

  
};

api.busca = function(req, res) {
   db.findOne({_id: req.params.fotoId }, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.atualiza = function(req, res) {
    console.log('Parâmetro recebido:' + req.params.fotoId);
    db.update({_id : req.params.fotoId }, req.body, function(err, numReplaced) {
        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });  
};

/*api.lista = function(req, res) {
    db.find({}).sort({titulo: 1}).exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};*/

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);

   });


api.lista = function(req, res) {

  database.find({}).sort({descricao: -1, data: -1}).exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });

}



api.listaPorGrupo = function(req, res) {
    var grupoId = parseInt(req.params.grupoId);
    db.find({grupo: grupoId}, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
        
    });

};

api.remove = function(req, res) {


 database.remove({ _id: req.params.fotoId }, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });
};

api.listaGrupos = function(req, res) {

    res.json([
        {
            _id: 1, 
            nome: 'esporte'
        }, 
        { 
            _id: 2, 
            nome: 'lugares', 
        }, 
        { 
            _id: 3, 
            nome: 'animais'
        }
    ]);
        
};


module.exports = api;