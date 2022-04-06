const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const db = config.get('DATABASE_URL');
console.log('->', db);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('********** DB - YES **********');
    } catch (err) {
        console.log('500 Error!, rejection - connection failure!', err.message);
        process.exit(1);
        console.log('********** DB - NO **********');
    }
}

module.exports = connectDB;