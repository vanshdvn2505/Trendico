import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _created: {
        type: Date,
        default: Date.now
    },

    username: {
        type: String,
        required: [true, "Name is required!"],
    },

    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: {
            validator: function(v){
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (email) => `${email.value} is not a valid email address!`
        }
    },

    password: {
        type: String,
        required: [true, "Password is required!"],
    }
})

const User = mongoose.model("Users", userSchema);

export default User