const {Position} = require("../model/model.js");

const PositionDao = {
    save(positionInfo){
        // console.log(positionInfo);
        const position = new Position(positionInfo);
        return position.save();
    },

    findByPage(page){
        const pageSize = 5;
        return Position.find({}).limit(pageSize).skip((page - 1) * pageSize);
    },
    
    delete(deleteInfo){
        return Position.remove(deleteInfo);
    },

    update(_id,updateInfo){
        console.log(_id);
        return Position.update({"_id":_id},{$set:updateInfo});
    }

}

module.exports = PositionDao;