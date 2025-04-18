import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/db.js'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const loginwithgoogel = async(req,res)=>{
    let {token} = req.body;
    try{    
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience:process.env.GOOGLE_CLIENT_ID,
        })
        const payload = ticket.getPayload();
        const {sub,email,name} = payload;

        let user = await User.findOne({email});
        if(!user){
            user = new User({
                    name,
                    email,
                    password: ' ',
                    role: 'user',
            })
            await user.save();
        }

        const jwtToken = await jwt.sign({id:user._id},process.env.Googel_client,{ expiresIn: '1h' })
        res.json({ token: jwtToken });
    }catch(err){
        // console.log(err.message);
        res.json({message:err});
    }
}