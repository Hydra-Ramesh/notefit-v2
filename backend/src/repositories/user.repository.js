import User from "../models/user.model.js";

class UserRepository{
    // user create function
    async create(userData){
        return await User.create(userData);
    }

    /*
    name: "Ramesh",
    email: "dasramesh8343003905@gmail.com",
    password: "Ramesh@123"
    */
    
    // user find by id function
    async findById(userId){
        return await User.findById(userId);
    }

    /**
     * id: "64a7f8e2c9b1f2a5d6e8b9c1" offered by mongoose
     */
    // user find by email function thsi function will return the user data
    async findByEmail(email){
        return await User.findOne({ email });
    }

    /**
     * email: "dasramesh8343003905@gmail.com"
     */

    // email exist function and this function will return true or false
    async existByEmail(email){
        return await User.exists({ email });
    }

    /**
     * email: "dasramesh8343003905@gmail.com"
    */
}

export default new UserRepository();