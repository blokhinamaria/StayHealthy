import express from 'express';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import session from 'express-session';
import { config } from 'dotenv';
import pkg from 'bcryptjs';
import passport from 'passport';
import pkgSign from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const app = express();

// Destructuring after import
const { genSalt, hash: _hash, compare } = pkg;
const { sign } = pkgSign;

// Load environment variables
config();

const router = express.Router();


// Initialize Passport Middleware
passport.initialize();
passport.session();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhich isbuiltinreactappproject';

// Set up session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

// Serialize and Deserialize User for session
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    cb(null, id);
});

// Route 1: Registering A New User: POST: http://localhost:8181/api/auth/register
router.post('/register', [
    body('name', "Username should be at least 4 characters.").isLength({ min: 4 }),
    body('phone', "Phone Number Should Be 10 Digits.").isLength({ min: 10 }),
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('password', "Password Should Be At Least 8 Characters.").isLength({ min: 8 }),
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const checkMultipleUser1 = await User.findOne({ email: req.body.email });
        if (checkMultipleUser1) {
            return res.status(403).json({ error: "A User with this email address already exists" });
        }

        const salt = await genSalt(10);
        const hash = await _hash(req.body.password, salt);
        
        const newUser = await User.create({
            name: req.body.name,
            accountType: req.body.accountType,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
            createdAt: Date(),
        });

        const payload = {
            user: { id: newUser.id },
        };
        const authtoken = sign(payload, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Login Route
// router.post('/login', [
//     body('email', "Please Enter a Vaild Email").isEmail(),
//     body('password', "Password is required").exists(),
// ], async (req, res) => {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { email, password } = req.body;
//         const theUser = await User.findOne({ email });

//         if (!theUser) {
//             return res.status(401).json({ error: "Invalid Credentials" });
//         }

//         const checkHash = await bcrypt.compare(password, theUser.password);
//         if (!checkHash) {
//             return res.status(401).json({ error: "Invalid Credentials" });
//         }

//         req.session.email = email;
//         console.log(`Session email set: ${req.session.email}`);

//         const payload = { user: { id: theUser.id } };
//         const authtoken = sign(payload, JWT_SECRET);

//         return res.status(200).json({ authtoken });

//     } catch (error) {
//         console.error("Login Error:", error.message);
//         return res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// });

router.post('/login', [
    body('email', "Please Enter a Valid Email").isEmail(),
    body('password', "Password is required").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        const theUser = await User.findOne({ email });
        if (!theUser) return res.status(401).json({ error: "Invalid Email" });

        const isMatch = await bcrypt.compare(password, theUser.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid Password" });

        const payload = { user: { id: theUser.id } };
        const authtoken = sign(payload, JWT_SECRET);
        return res.status(200).json({ authtoken,
            user: {
                name: theUser.name,
                phone: theUser.phone,
                email: theUser.email,
                accountType: theUser.accountType
            }
         });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

export default router;
