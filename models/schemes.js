
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the "users" collection
const userSchema = new Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true }
});

// Define the schema for the "costs" collection
const costSchema = new Schema({
    user_id: { type: Number, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    id: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    sum: { type: Number, required: true }
});

// Create the models for the "users" and "costs" collections
const User = mongoose.model('User', userSchema);
const Cost = mongoose.model('Cost', costSchema);





module.exports = { User, Cost };