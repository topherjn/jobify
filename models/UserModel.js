import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    lastName: this.lastName,
    location: this.location,
    role: this.role,
  };
};

export default mongoose.model('User', UserSchema);