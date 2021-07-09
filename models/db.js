
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, (error) => {
    if (error) {
        console.log('Error in MongoDB Connection :')
    }
    console.log("MongoDB connection is succeeded.");
})

require('./user.model')