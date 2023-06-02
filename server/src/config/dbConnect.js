const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect suss");
    } catch (error) {
        console.log("Connect fail");
        console.log(error);
    }
};

module.exports = { connect };
