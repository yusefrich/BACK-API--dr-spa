const User = require('../models/User');
const Role = require('../models/Role');

module.exports = {
    async index(req, res){
        const users = await User.findAll({
            include: { association: 'addresses'},
            include: { association: 'role'},
        });

        return res.json(users);
    },
    async signin(req, res){
        const { email, password } = req.body;

        /* const user = await User.findByPk(email, {
            include: { association: 'addresses'}
        }); */
        const user = await User.findOne({where: {email}, include: { association: 'addresses'},include: { association: 'role'}});

        if(!user) {
            return res.status(401).json({error: 'Email or Password invalid'});
        }

        return res.json(user);

    },
    async store(req, res){

        const { role_name } = req.params;
        const { name, email, password } = req.body;

        const role = await Role.findOne({where: {name: role_name}});
        
        if(!role) {
            return res.status(400).json({error: 'Role not found'});
        }
        
        const role_id = role.id;
        const user = await User.create({name, email, role_id, password});

        return res.json(user);
    }
}