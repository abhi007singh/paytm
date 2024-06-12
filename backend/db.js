const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

userSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // return await bcrypt.hash(plainTextPassword, salt);

    // Salt and hash in single line
    return await bcrypt.hash(plainTextPassword, saltRounds);
};
userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        default: 0,
        min: 0,
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = { User, Account }

