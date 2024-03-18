import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import feed from "../models/Feedback.js";

//singup
export const signup = async (req, res, next) => {
    
    const { username , email, password,Name,PhoneNumber,Address,Height,weight } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        
        next(errorHandle(400, 'all fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);



    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        Name,
        PhoneNumber,
        Address,
        Height,
        weight
    });

   

    try {
        await newUser.save();
        res.json(  'Signup succes');
        
    } catch (error) {

       next(error);



        
    }
}

//singup
export const signgin = async (req, res, next) => {

    const { email, password } = req.body;

    if( !email || !password  || email === '' || password === ''){
        
       return next(errorHandle(400, 'all fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            next(errorHandle(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandle(404, 'Invalid password'));
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }


}



//user feed back
  export const Feedcreate = async (req, res, next) => {
    
  
    const { CurrentuseId,name,Email,type,descrp } = req.body;
  
    const newFeed = new feed({
      CurrentuseId,
      name,
      Email, 
      type,
      descrp
    });
    try {
      const savedfeed = await newFeed.save();
      res.status(201).json(savedfeed);
    } catch (error) {
      next(error);
    }
  };

 //show feedback
  export const getfeed = async (req, res, next) => {
    try {
      
  
      const {  CurrentuseId } = req.params;
        console.log(CurrentuseId)
  
        const Feed = await feed.find({ CurrentuseId });
  
        if (Feed.length > 0) {
          res.json({
            message: "Employe details retrieved successfully",
           Feed
          });
        } else {
          return next(errorHandle(404, " house not fonud "));
        }
     
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };

//update feedback
  export const updatefedd = async (req, res, next) => {
  
    try {
      const updatehouse = await feed.findByIdAndUpdate(
        req.params.FeedId,
        {
          $set: {
            name:req.body.name,
            Email:req.body.Email,
            type:req.body.type,
            descrp:req.body.descrp
            
          },
        },
        { new: true }
      );
      res.status(200).json(updatehouse);
    } catch (error) {
      next(error);
    }
  };

//delete feedback
  export const deletefeed = async (req, res, next) => {
    try {
      const deletedEmployee = await feed.findByIdAndDelete(req.params.FeeddId);
      
      if (!deletedEmployee) {
        // If the employee with the provided ID is not found, return an error response
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // If the employee is successfully deleted, return a success response
      res.status(200).json({ message: 'The Employee has been deleted' });
    } catch (error) {
      // If an error occurs during the deletion process, pass it to the error handler middleware
      next(error);
    }
  };

  
  

