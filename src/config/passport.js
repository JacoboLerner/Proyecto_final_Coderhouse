import passport from "passport";
import local from "passport-local";
import bcrypt from "bcryptjs"; // Librería para encriptar contraseñas
import GitHubStrategy from "passport-github2";
import  config  from "./env.js";
import jwt from "passport-jwt";
import User from "../dao/mongo/models/user.model.js";

const JWTStrategy= jwt.Strategy;
const ExtractJWT=jwt.ExtractJwt;

const LocalStrategy= local.Strategy;

const cookieExtractor=req=>{
    let token=null;
    if( req && req.cookies){
        token= req.cookies['token']
    }
    return token
}
const initializePassport =()=>{
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.privateKey,
    }, async(jwt_payload,done)=>{
        try{
            console.log(jwt_payload);
            return done(null,jwt_payload);
        }
        catch(err){
            return done(err)
        }
    }))


    passport.use("github",new GitHubStrategy({
        clientID:"Iv1.16380aa0534ce3c7",
        clientSecret:"b7004419dda2c049449905155638560f53c78335",
        callbackURL:`http://localhost:${config.port}/api/sessions/githubcallback`
    },async(req,accessToken, refreshToken,profile,done)=>{
        try{
            let user= await User.findOne ({email: profile._json.email})
            const saltRounds = 10;
            const password=" " 
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            if(!user){
                let newUser= new User({
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    password: hashedPassword,
                    age: " ",
                    role:
                      profile._json.email == config.adminName ? "admin" : "usuario",
                })
                await newUser.save()
                const token = jwt.sign(newUser, process.env.JWT, { expiresIn: "1h" });
                req.token = token;
                done(null,newUser)
            }
            else{
                const token = jwt.sign(user, process.env.JWT, { expiresIn: "1h" })
                req.token = token;
                done(null,user)
            }
        }catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id,done)=>{
        let user = await User.findById(id);
        done (null,user);
    })
}



export default initializePassport