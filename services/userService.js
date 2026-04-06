const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return { user, token };
  }

  async getAllUsers() {
    return await User.find();
  }

  async updateUser(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();