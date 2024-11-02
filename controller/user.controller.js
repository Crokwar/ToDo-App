import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

        const token = jwt.sign({email: newUser.EMAIL}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
        return res.status(201).json({
            ok: true,
            msg: token
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
    try{
        const {email, password} = req.body;
        
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

        const token = jwt.sign({email: userExists.EMAIL}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        return res.status(200).json({
            ok: true,
            msg: token
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }
}

const profile = async (req, res) => {
    try{
        const user = await UserModel.findOneByEmail(req.email);
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
    profile
}