const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to Data Base');
    }catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = {dbConnect};