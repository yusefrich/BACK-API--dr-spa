const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res){
        const users = await User.findAll({include: [{ association: 'addresses'}, { association: 'role'}]});

        return res.json(users);
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
    }
}