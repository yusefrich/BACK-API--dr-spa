const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res){
        const users = await User.findAll({include: [{ association: 'addresses'}, { association: 'role'}]});

        return res.json(users);
    },
    async single(req, res){
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {include: [{ association: 'addresses'}, { association: 'role'}]});
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.json(user);
    },
    async signin(req, res){
        const { email, password } = req.body;

        //* checking user email
        const user = await User.findOne({where: {email}, include: [{ association: 'addresses'}, { association: 'role'}]});
        if(!user) {
            return res.status(401).json({error: 'Email or Password invalid'});
        }

        //*checking user password
        bcrypt.compare(password, user.getDataValue('password'), (err, result) => {
            if(err)
                return res.status(401).json({error: 'Email or Password invalid'}); 
            if(result){
                const token = jwt.sign(user.dataValues, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "5d"
                })
                return res.status(200).json({message: 'Signin successfull', user: user, token: token}); 
            }
            return res.status(401).json({error: 'Email or Password invalid'}); 
        })
    },
    async store(req, res){

        const { role_name } = req.params;
        const { name, email } = req.body;
        var { password } = req.body;
        bcrypt.hash(password, 10, async (errBcrypt, hash) =>  {
            if(errBcrypt) {return res.status(500).json({error: `${errBcrypt}`});}
            password = hash;
            
            //* check if role is valid
            const role = await Role.findOne({where: {name: role_name}});
            if(!role) { 
                return res.status(400).json({error: 'Role not found'});
            }
            
            //* check if email exists
            const current_user_email = await User.findOne({where: {email}, include: { association: 'addresses'},include: { association: 'role'}});
            if(current_user_email) { 
                return res.status(401).json({error: 'Email already exists'});
            }
            
            //* reating user
            const role_id = role.id;
            var user = await User.create({name, email, role_id, password});
            delete user.dataValues.password;

            return res.json(user);
        })
    },
    async update(req, res){

        const { user_id } = req.params;
        const { name } = req.body;

        //* checking if the user is trying to edit another users data
        if(user_id != req.user.id && req.user.role.name != "admin"){
            return res.status(401).json({error: 'Permition denied'});
        }

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({error: 'User not found'});
        }
        await user.update({
            name
        })

        return res.json(user);
    },
    async delete(req, res){

        const { user_id } = req.params;

        //* checking if the user is trying to edit another users data
        if(user_id != req.user.id && req.user.role.name != "admin"){
            return res.status(401).json({error: 'Permition denied'});
        }

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({error: 'User not found'});
        }
        await user.destroy()

        return res.status(200).json({message: 'User successfully deleted'});
    }
}