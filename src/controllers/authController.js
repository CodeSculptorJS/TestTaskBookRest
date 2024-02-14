const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');

const createToken = (id, username, password)=>{
    return jwt.sign({id, username, password}, 'secret', {
        expiresIn: '3h'
    });
}

const signup_post = async(req, res, next)=>{
    const info = {
        username: req.body.username, 
        password: req.body.password,
        roleId: req.body.roleId? req.body.roleId : 2,
    };
    try{
        const user = await db.User.create(info);
        const token = createToken(user.id, user.username, user.password);
        return res.cookie('jwt', token, { maxAge: 3 }).status(200).json(user);
    }catch(err)
    {
        next(err);
    }
}

const login_post = async(req, res, next)=>{
    try{
        const user = await db.User.findOne({ where: { username: req.body.username } });
        console.log(user);
        if(user)
        {
            const auth = await bcrypt.compare(req.body.password, user.password);
            if(auth)
            {
                const token = createToken(user.id);
                return res.cookie('jwt', token, { maxAge: 3 }).status(200).json({user:user})
            }
            else{
                next({status: 400, message: 'Password is incorrect'});
            }
        }
        else{
            next({status: 400, message: 'Username is incorrect'});
        }
    }catch(err)
    {
        next(err);
    }
}

module.exports = {
    signup_post,
    login_post
}