import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import { UserModel } from '../models/user.model.js';

const register = async (req, res) =>{
    try{
        const { username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ok: false, msg: 'Missing required fields'});
        }

        const userExists = await UserModel.findOneByEmail(email);
        if(userExists){
            return res.status(409).json({ok: false, msg: 'Email already exists'});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await UserModel.create({email, password:hashedPassword, username});

        const token = await createAccessToken({email: newUser.EMAIL})
        res.cookie('token', token);
        res.status(201).json({
            id: newUser.UID,
            username: newUser.USERNAME,
            email: newUser.EMAIL,
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }
}

const login = async (req, res) =>{

    const { email, password } = req.body;

    try{ 
        if(!email || !password){
            return res.status(400).json({ok: false, msg: 'Missing required fields'})
        }

        const userExists = await UserModel.findOneByEmail(email);
        if(!userExists){
            return res.status(404).json({ok: false, msg: 'User not found'});
        }

        const isMatch = await bcryptjs.compare(password, userExists.PASSWORD);

        if(!isMatch){
            return res.status(401).json({ok: false, msg: 'Invalid credentials'});
        }

        const token = await createAccessToken({id: userExists.UID, email: userExists.EMAIL})
        res.cookie('token', token);
        res.status(200).json({
            id: userExists.UID,
            username: userExists.USERNAME,
            email: userExists.EMAIL,
        })                  

    } catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }
}

const logout = async (req, res) => {
    res.cookie('token', "", { expires: new Date(0)});
    return res.status(200).json({msg: 'logout successful'});
};

const profile = async (req, res) => {
    try{
        const user = await UserModel.findOneByEmail(req.user.email);
        if(!user){
            return res.status(400).json({ok: false, msg: 'User not found'});
        }

        return res.json({ok: true, msg: user});
    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }
}

export const userController = {
    register,
    login,
    logout,
    profile
}