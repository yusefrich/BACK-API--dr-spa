const Role = require('../models/Role');
const User = require('../models/User');

module.exports = {
    async index(req, res){
        const roles = await Role.findAll();
        return res.json(roles);
    },
    async store(req, res){
        const { name } = req.body;

        const role = await Role.create({name});

        return res.json(role);
    },
    async delete(req, res){
        const { name } = req.params;
        
        if(req.user.role.name != "admin" && name != "admin"){
            return res.status(401).json({error: 'Permition denied'});
        }

        const role = await Role.findOne({where: {name}});
        if(!role) {
            return res.status(400).json({error: 'Role not found'});
        }

        role.destroy();

        return res.status(200).json({message: 'Role successfully deleted'});
    },
    //* Updates the role of the user
    //TODO update roles of users

}