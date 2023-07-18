const User = require("../models/user");

// Service function to get all users
async function getUsers() {
    try {
        const users = await User.aggregate([
            {
                $match: {
                    isAdmin: { $ne: true }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'products'
                }
            },
            {
                $project: {
                    _id: 0,
                    userName: 1,
                    email: 1,
                    registrationDate: 1,
                    productCount: { $size: '$products' }
                }
            }
        ]);
        return users;
    } catch (error) {
        throw new Error("Failed to retreive users");
    }
}

module.exports = {
    getUsers
}