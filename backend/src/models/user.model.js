import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        // We will write about the name
        type: String,
        required: true, // if we did not define required, then it will be optional
        trim: true, // it will remove the extra spaces from the name
        minlength: 3, // it will check the minimum length of the name
        maxlength: 50 // it will check the maximum length of the name
    },
    email: {
        // We will write about the email
        type: String,
        required: true, // if we did not define required, then it will be optional
        unique: true, // it will check the uniqueness of the email
        trim: true, // it will remove the extra spaces from the email
        lowercase: true, // it will convert the email to lowercase
        // match: [/\S+@\S+\.\S+/, 'is invalid'], // it will check the email format
        // We can also use the validator package to validate the email format @gmail.com
    },
    password: {
        // We will write about the password
        type: String,
        required: true, // if we did not define required, then it will be optional
        trim: true, // it will remove the extra spaces from the password
        minlength: 6, // it will check the minimum length of the password
        // We can also use the validator package to validate the password format
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'is invalid'], // it will check the password format
    }
},
{
    timestamps: true // it will add createdAt and updatedAt fields to the schema
}
)

const User = mongoose.model('User', userSchema);

export default User;