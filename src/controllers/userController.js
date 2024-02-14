const { where } = require('sequelize');
const db = require('../models');

const deleteUser = async(req, res)=>{
    let id = req.params.id;
    if(id){
        await db.User.destroy({where:{id: id}});
        return res.status(200).send("User deleted");
    }
    return res.status(500);
}

const addUser = async(req, res)=>{
    let info={
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId
    };
    const user = await db.User.create(info);
    return res.status(200).send(user);
}

const updateUser = async(req, res)=>{
    let id = req.params.id;
    if(id){
        const user = await db.User.update(req.body, {where:{id:id}});
        return res.status(200).send(user);
    }
}

module.exports = {
    updateUser,
    addUser,
    deleteUser
}