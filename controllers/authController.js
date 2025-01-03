const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json("test is working")
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body
        if(!name){
            return res.json({
                error: 'name is required'
            })
        }
        if(!password || password.length < 8){
            return res.json({
                error: 'Password is required and should be 8 characters long'
            })
        }
        if(confirmPassword !== password){
            return res.json({
                error: "Passwords don't match"
            })
        }
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'email is already taken'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err
                res.json({user,token})
            })
        }
        if(!match){
            return res.json({
                error: "Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const editUserById = async (req, res) => {
    try {
        const { name, email, password, new_password, _id } = req.body;
        
        const user = await UserModel.findById(_id);
        if (!user) {
            return res.send({ error: "User not found" });
        }
        // Check if the user wants to update their password
        if (password && new_password) {
            const comparePass = await comparePassword(password, user.password);
            if (!comparePass) {
                return res.send({ error: "Password incorrect"});
            }
            const hashedNewPassword = await hashPassword(new_password);
            user.password = hashedNewPassword; // Update password
        }
        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();
        res.send({ message: "User Updated", user });
    } catch (error) {
        // Handle server error
        res.send({ error: error.message });
    }
};

// const getProfile = (req, res) => {
//     const {token} = req.cookies
//     if(token){
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//             if(err) throw err
//             res.json(user)
//         })
//     } else{
//         res.json(null)
//     }
// }

module.exports = {
    test,
    registerUser,
    loginUser,
    editUserById
}


