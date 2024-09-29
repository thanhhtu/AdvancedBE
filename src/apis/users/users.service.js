import usersModel from '../../models/users.model.js';
import hashService from '../../service/hash.service.js'

class UsersService{
    async getInfo(user){
        user.Gender = user.Gender === 0 ? 'man' : 'woman';
        user.Role = user.Role === 0 ? 'admin' : 'user';
    }

    async getUsers(){
        try {
            const users = await usersModel.getUsers();
            for(let user of users){
                this.getInfo(user);
            }
            return users;
        }catch(error){
            throw error;
        }
    }

    async getDetailUser(userId){
        try {
            const user = await usersModel.getDetailUser(userId);
            if(!user){
                throw new Error("Not have this user");
            }
            this.getInfo(user);
            return user;
        }catch(error){
            throw error;
        }
    }
    
    async createUser(user){
        try {
            const newUser = await usersModel.getUserByEmail(user.Email);
            if(newUser){
                throw new Error("Duplicate email");
            }

            const hashObj = await hashService.hashPassword(user.Password);
            user.Password = hashObj.hashedPassword;

            const result = await usersModel.createUser(user);
            return result;
        }catch(error){
            throw error;
        }
    }

    async updateUser(user){
        try {
            const updateUser = await usersModel.getDetailUser(user.UserID);
            if(!updateUser){
                throw new Error("Not have this user");
            }

            const result = await usersModel.updateUser(user);
            return result;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try {
            const updateUser = await usersModel.getDetailUser(userId);
            if(!updateUser){
                throw new Error("Not have this user");
            }

            const result = await usersModel.deleteUser(userId);
            return result;
        }catch(error){
            throw error;
        }
    }
}

export default new UsersService();