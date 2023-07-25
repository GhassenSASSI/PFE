const User = require('../models/user');
const Product = require('../models/product');

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
                    _id: 1,
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

// Service function to delete a user
async function deleteUser(clientId) {
    try {
      const user = await User.findOneAndDelete({ _id: clientId });
  
      if (!user) {
        throw new Error('User not found');
      }

      await Product.deleteMany({ userId: user._id });

      return user;
    } catch (error) {
      throw new Error(error.message + ' Failed to delete user');
    }
}

// Service function to delete all users and their associated products
async function deleteAllUsers() {
    try {
      const users = await User.find({ isAdmin: { $ne: true } });
      const userIds = users.map(user => user._id);
  
      const deleteUsersPromises = userIds.map(userId =>
        User.deleteOne({ _id: userId })
      );
      await Promise.all(deleteUsersPromises);
  
      const deleteProductPromises = userIds.map(userId =>
        Product.deleteMany({ userId: userId })
      );
      await Promise.all(deleteProductPromises);
  
      return users.length;
    } catch (error) {
      throw new Error('Failed to delete users');
    }
}

module.exports = {
    getUsers,
    deleteUser,
    deleteAllUsers
}