const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/aa');

const UserSchema = new mongoose.Schema({
    username: String,
	password: String,
	email: String,
	regTime: Date
});

const positionSchema = new mongoose.Schema({
	name: String,
	salary: Number,
	company: String,
	logo: String
});
const User = mongoose.model('user', userSchema); // 对应 "users" 集合
// Model-集合：职位
const Position = mongoose.model('position', positionSchema); // 对应 "positions" 集合

module.exports = {User, Position};