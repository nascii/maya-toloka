const mongoose = require('mongoose');

const db = mongoose.connection;

const MONGO_URL = 'mongodb://127.0.0.1/maya';
const OPTIONS = {
	auto_reconnect: true,
	socketOptions: {
		keepAlive:        24 * 3600 * 1000,
		connectTimeoutMS: 24 * 3600 * 1000,
		socketTimeoutMS:  24 * 3600 * 1000
	}
}

db.on('open', console.log.bind(console, 'DB connection opened') )
db.on('close', console.log.bind(console, 'DB connection closed') )
db.on('error', console.log.bind(console, 'DB error') )

mongoose.connect(MONGO_URL, OPTIONS);

var LabeledUserShema = mongoose.Schema({
	girlId: { 
		type: String, 
		required: true, 
		unique: true
	},

	status: { 
		type: Number, 
		required: true, 
		enum: [0, 1, 2]
	}
})

var LabeledUser = mongoose.model('LabeledUser', LabeledUserShema, 'labeledUsers');
module.exports = LabeledUser;
