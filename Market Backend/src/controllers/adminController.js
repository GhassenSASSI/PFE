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

module.exports = {
    getUsers
}