import mongoose from 'mongoose';
const Schema = mongoose.Schema; // to tell mongoose the very particular fields our model is going to have

// Define the model 
const userSchema = new Schema({
    email : {type: String, unique: true, lowercase: true}, // mongodb is case sensitive
    password: String
});
// Create the model class and export it.
export default mongoose.model('user', userSchema); // represents all users as this a class of Users. 
// we tell mongoose about our user model and its type.



