import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { signinValidation, signupValidation } from '../utils/authValidation';


const saltRounds = 10;
const jwtSecret = 'your_secret_key';

class AuthController {
    public async signup(req: Request, res: Response) {
        try {
            const { error } = signupValidation.validate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const { fullName, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({ fullName, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async signin(req: Request, res: Response) {
        try {
            const { error } = signinValidation.validate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ email: user.email }, jwtSecret);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export { AuthController };
