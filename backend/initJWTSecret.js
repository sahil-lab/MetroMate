const mongoose = require('mongoose');
const Config = require('./models/Config');
require('dotenv').config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const initJWTSecret = async () => {
    try {
        const jwtSecret = require('crypto').randomBytes(64).toString('hex');
        const existingConfig = await Config.findOne({ key: 'jwtSecret' });
        if (existingConfig) {
            console.log('JWT Secret already exists');
        } else {
            const newConfig = new Config({
                key: 'jwtSecret',
                value: jwtSecret,
            });
            await newConfig.save();
            console.log('JWT Secret initialized');
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB().then(initJWTSecret).finally(() => mongoose.disconnect());
