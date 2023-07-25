const adminService = require("../services/adminService");

// Controller function to get all users
async function getUsers(req, res) {
    try {
        const users = await adminService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller function to delete a user
async function deleteUser(req, res) {
    const { clientId } = req.params;
  
    try {
      const user = await adminService.deleteUser(clientId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controller function to delete all users
async function deleteAllUsers(req, res) {
    try {
      const deletedCount = await adminService.deleteAllUsers();
      res.json({ deletedCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsers,
    deleteUser,
    deleteAllUsers
}