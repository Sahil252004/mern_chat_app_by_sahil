import User from "../models/model.js";
export const getUsersForSidebar = async(req,res) =>{
    try{
        const loggedInuserId = req.user._id;

        const Filteredusers = await User.find({_id:{$ne:loggedInuserId }}).select("-password").select("-confirmpassword");
        //the above cmd will find all the users in the database except the login user bcz u will not have to just send messages to yourself

        res.status(200).json(Filteredusers);
    }
    catch(error)
    {
        console.log("error in usercontroller file ", error.message);
        res.status(500).json({error:"INTERNAL SERVER ERROR"});
    }
}