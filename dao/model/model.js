const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/h5');

const UserSchema = new mongoose.Schema({
    username: String,
	password: String,
	email: String,
	regTime: Date
});

const positionSchema = new mongoose.Schema({
	companyName: String,
	salary: Number,
	workName:String,
	workExp: String,
	logo: String,
	workType: String,
	workSpace: String
});
const User = mongoose.model('users', UserSchema); // 对应 "users" 集合
// Model-集合：职位
const Position = mongoose.model('position', positionSchema); // 对应 "positions" 集合

module.exports = {User, Position};