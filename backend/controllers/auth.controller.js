import User from '../models/model.js';
import bcrypt from "bcryptjs";
import generateTokenandSetcookie from '../utils/generatetoken.js';

export const signup = async (req,res) => {
    try{
        const { fullName, username, password, confirmpassword, gender } = req.body;
        
        if(password !== confirmpassword) {
            
            return res.status(400).json({error:"Password don't match."});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username Already Exist"});
        }

        
        const hashedpwd = await bcrypt.hash(password,10);
        const hashedcpwd = await bcrypt.hash(confirmpassword,10);


        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


        const newUser = new User({
            fullName,
            username,
            password:hashedpwd,
            confirmpassword:hashedcpwd,
            gender,
            profilepic : gender === "male" ? boyProfilepic : girlProfilepic,
        });
        if(newUser){
            //Generate JWT token here
            generateTokenandSetcookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullName:newUser.fullName,
                username: newUser.username,
                profilePic:newUser.profilepic,
            });
        }else{
            return res.status(400).json({error:"Invalid User Data"});
        }
        
    }catch(error)
    {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login =async (req,res) => {
    try{
        const { username , password} = req.body;
        const user = await User.findOne({username});
        const ispasswordcorrect = await bcrypt.compare(password,user?.password || "")
        if(!user || !ispasswordcorrect)
        {
            return res.status(400).json({error:"INVALID CREDENTIALS"});
        }

        generateTokenandSetcookie(user._id, res);

        res.status(201).json({
            _id : user._id,
            fullName:user.fullName,
            username: user.username,
            profilePic:user.profilepic,
        });
    }catch(error)
    {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxage:0});
        res.status(200).json({message: "Logged Out Successfully"})
    }catch(error)
    {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

