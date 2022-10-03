require('dotenv').config();
const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.DATABASE_PASS}@cluster0.lymyd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`);
}

main().then(() => {
    console.log('Database successfully connected with the server');
    return;
}).catch((err) => {
    console.log('Error in connecting with the database ', err);
    return;
});