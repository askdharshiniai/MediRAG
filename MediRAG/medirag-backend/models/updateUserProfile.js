const User = require('./User'); // or wherever your Mongoose model is

const updateUserProfile = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  user.name = updateData.name;
  user.age = updateData.age;
  user.dateOfBirth = updateData.dateOfBirth;
  user.gender = updateData.gender;
  user.bloodGroup = updateData.bloodGroup;
  user.medicalHistory = updateData.medicalHistory;

  const updatedUser = await user.save();
  return updatedUser;
};

module.exports = updateUserProfile;
