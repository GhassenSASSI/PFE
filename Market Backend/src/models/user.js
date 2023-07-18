const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    registrationDate: {
      type: String,
      default: function () {
        const formattedDate = formatDate(new Date());
        return formattedDate;
      },
      required: true,
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const User = mongoose.model('User', userSchema);

// Create the indexes
(async () => {
    try {
      await User.init();
    } catch (error) {
      console.error('Failed to create indexes:', error);
    }
  })();

module.exports = User;