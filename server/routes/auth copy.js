//Use import instead of require consistently.
// Import findOne and create properly (assuming you're using Mongoose).
// Remove duplicate /register routes.
// Handle passport and bcryptjs imports correctly.
// Adjust dotenv configuration.
// Make sure all async/await functions work without errors.





import { Router } from 'express';
const router =  Router();
// import { genSalt, hash as _hash, compare } from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import session from 'express-session';

// import { findOne, create } from '../models/User.js' NEED TO SOLVE THIS;

// import { initialize, session as _session, serializeUser, deserializeUser } from 'passport';
import pkg from 'bcryptjs';
const { genSalt, hash: _hash, compare } = pkg;

import pkgPassport from 'passport';
const { initialize, session: _session, serializeUser, deserializeUser } = pkgPassport;


import { config } from 'dotenv';
config();



const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhich isbuiltinreactappproject';

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));


router.use(initialize());
router.use(_session());

serializeUser(function (user, cb) {
    cb(null, user.id);
});

deserializeUser(function (id, cb) {
    cb(null, id);
});

router.post('/register', (req, res) => {
    console.log('Register endpoint hit');
    res.status(200).json({ message: 'User registered successfully' });
  });
  

// Route 1: Registering A New User: POST: http://localhost:8181/api/auth/register. No Login Required
router.post('/register',[
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('name', "Username should be at least 4 characters.").isLength({ min: 4 }),
    body('password', "Password Should Be At Least 8 Characters.").isLength({ min: 8 }),
    body('phone', "Phone Number Should Be 10 Digits.").isLength({ min: 10 }),
], async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    try {
        const checkMultipleUser1 = await findOne({ email : req.body.email });
        if(checkMultipleUser1){
            return res.status(403).json({ error: "A User with this email address already exists" });
        }

        const salt = await genSalt(10);
        const hash = await _hash(req.body.password, salt);
        
        const newUser =  await create({
            email: req.body.email,
            name: req.body.name,
            password: hash,
            phone: req.body.phone,
            createdAt: Date(),
        });

        const payload = {
            user: {
                id: newUser.id,
            }
        }
        const authtoken = sign(payload, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }

});

router.post('/login', [
    body('email', "Please Enter a Vaild Email").isEmail(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
      
        const theUser = await findOne({ email: req.body.email }); // <-- Change req.body.username to req.body.name
            // console.log('my',theUser.name);
        // req.session.name=theUser.name
        req.session.email = req.body.email; // <-- Change req.body.username to req.body.name
        console.log(req.session.email);
        // console.log(req.session.name);
        if (theUser) {
            let checkHash = await compare(req.body.password, theUser.password);
            if (checkHash) {
                let payload = {
                    user: {
                        id: theUser.id
                    }
                }
                const authtoken = sign(payload, JWT_SECRET);
                return res.status(200).json({ authtoken });
            } else {
                return res.status(403).json({ error: "Invalid Credentials" });
            }
        } else {
            return res.status(403).json({ error: "Invalid Credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.put('/update', [
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;

        const existingUser = await findOne({ username: name });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.name = name;
        existingUser.updatedAt = Date();

        const updatedUser = await existingUser.save();

        const payload = {
            user: {
                id: updatedUser.id,
            },
        };

        const authtoken = sign(payload, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 4: Fetch user data based on the email: GET: http://localhost:8181/api/auth/user
router.get('/user', async (req, res) => {
    try {
      const email = req.headers.email; // Extract the email from the request headers

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }
    
        const user = await findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    
        // Send only the necessary user details to the client
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    
        res.json(userDetails);
        } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
router.put('/user', [
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    
        try {
        const email = req.headers.email; // Extract the email from the request headers
    
        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }
    
        const existingUser = await findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
    
        existingUser.name = req.body.name;
        existingUser.phone = req.body.phone;
        existingUser.updatedAt = Date();
    
        const updatedUser = await existingUser.save();
    
        const payload = {
            user: {
            id: updatedUser.id,
            },
        };
    
        const authtoken = sign(payload, JWT_SECRET);
        res.json({ authtoken });
        } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
        }
});


export default router;