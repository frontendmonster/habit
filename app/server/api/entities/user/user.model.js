import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is required!'],
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minLength: [6, 'Password need to be longer!']
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticate(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
      _id: this._id
    }, process.env.JWT_SECRET);
  },
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      token: `Bearer ${this.createToken()}`
    };
  }
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;