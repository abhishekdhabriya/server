import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema; // to tell mongoose the very particular fields our model is going to have

// Define the model 
const userSchema = new Schema({
    email : {type: String, unique: true, lowercase: true}, // mongodb is case sensitive
    password: String
});

// On save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function (next) {
    // get access to the user model
    const user = this; // we get access to user.email and user.password

    // generate a salt
    bcrypt.genSalt(10, (err, salt)=> {
        if(err) {
            return next(err);
        }

        // encrypt the pasword using the salt
        bcrypt.hash(user.password, salt, null, (err, password) => {
            if (err) {
                return next(err);
            }

            user.password = password;
            next(); // go ahead and run the next middleware, which is save the user.
        });
    });
});

// Create the model class and export it.
export default mongoose.model('user', userSchema); // represents all users as this a class of Users. 
// we tell mongoose about our user model and its type.



