const express = require('express')
const router = express.Router();
const User = require('../models/Users');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'anonymoustokenstring'
const fetchUser = require('../middleware/fetchUser')

let success = false;
//  Route 1: Create a user using: POST "/api/auth/new-user". Doesn't require auth
router.post('/new-user', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 8}),

],
async (req,res)=>{
    // check whether there are errors, if there are return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        // check whether user (email) exists, if not create new user and if it exists return error
        let user = await User.findOne({email: req.body.email})
        if(user){
            success=false;
            return res.status(400).json({success, error: `This E-mail is already registered`})
        }
        const salt = await bcrypt.genSalt(10);
        
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const authToken = jwt.sign(user.id, JWT_SECRET)
        success = true;
        res.json({success, authToken: authToken})
        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occured.!");
    }
})

// Route 2: Authenticate a user using: POST "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be empty').exists(),
    body('password', 'Enter a valid password').isLength({min: 8})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success, errors: errors.array()});
    }
    // console.log(req.body)

    const {email, password} = req.body;
    
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success, error: `Please enter correct credentials`});
        }
        
        const passCompare = await bcrypt.compare(password, user.password);
        if(!passCompare){
            success =false
            return res.status(400).json({success, error: `Please enter correct credentials`});
        }
        
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET)
        success=true;
        res.json({success, authToken: authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occured.!");
    }
    
})

// Route 3: Get logged in user details using: POST /api/auth/getuser Login Required

router.post('/getuser', fetchUser,
async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occured.!");
    }    
})

module.exports = router;