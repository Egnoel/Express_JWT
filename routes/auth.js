// getting the router function of the express package
const router = require("express").Router();
//importing the user module
const User = require('../model/User');
//importing validation module
const {registerValidation, loginValidation} = require('../validation');
//omporting bcrypt module
const bcrypt = require('bcryptjs');
//importing jsonwebtoken
const jwt = require('jsonwebtoken');

//Post router
router.post('/register', async (req, res)=>{

    //Validating what came from the request
    const {error} = registerValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    //checking if email/user already exists
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //assign values to the data base from the api
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    //save the user to the database
    try {
        const savedUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

//Login router
router.post('/login', async(req, res)=>{
    //Validating what came from the request
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if email/user exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email incorret");
    //checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Password incorret");

    //create and assign token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
});


//Exporting the file to be used in other files as router
module.exports = router;