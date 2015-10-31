var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var vk = require('./vk');
var bodyParser = require('body-parser');
var LabeledUser = require('./LabeledUser');

var app = express();

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({ src: __dirname + '/public', compile: compile}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/do/:user_id', (req, res) => {
	var user_id = req.params.user_id;

	vk.request('friends.get', {
		user_id: user_id,
		fields: ['photo_100', 'sex'].join(','),
		v: '5.8'
	}, 'friends.loaded');

	vk.once('friends.loaded', (response) => {
		var girls = response.response.items.filter(user => user.sex === 1);
		res.render('girls', { girls: girls });
	})
})

app.post('/vote', (req, res) => {
	var status = req.body.status;
	var girlId = req.body.girlId;

	if (!isNaN(parseInt(status)) && !isNaN(parseInt(girlId))) {
		LabeledUser.create({girlId: girlId.toString(), status: status}, function(err, labeledUser) {
			if (err) {
				console.log(err);
				res.status(400);
				return res.send(err);
			}

			console.log('Good', labeledUser.toObject());
			res.send('Good');
		});
	} else {
		console.log('Bad', girlId, status);
	}
})

app.listen(3000);
