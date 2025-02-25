import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { UserValidationSchema } from '../schema/userValidationSchema.js';

// ------------------------------------------------------------------------------------------------------------------------
//                                                       Register User LOGIC
// ------------------------------------------------------------------------------------------------------------------------

// 1. Get all fields from user from req.
// 2. validation : input should be of correct data type + not empty
// 3. check if user already exists
// 4. Before storing in db hash password
// 5. create user obj. i.e store in db
// 6. remove password and refresh token from response
// 7. Check for user creation
// 8. Send response to frontend

// ------------------------------------------------------------------------------------------------------------------------

const registerUser = asyncHandler(async (req, res) => {
  // 1. Get all fields from user from req.
  const { name, email, password } = req.body;

  // 2. Validation
  UserValidationSchema.parse(req.body); // Throws an error if invalid

  // 3. Check if user already exists
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res
      .status(400)
      .json({ success: false, message: 'User already exists' });
  }

  // 5. create user obj. i.e store in db
  const user = await User.create({
    name,
    email,
    password,
  });

  // 6-7. Check for user creation + remove password and refresh token from response
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create user' });

  // 8. Send response to frontend
  res.status(201).json({
    success: true,
    createdUser,
    message: 'User registered successfully',
  });
});

// ------------------------------------------------------------------------------------------------------------------------
//                                                       Login User LOGIC
// ------------------------------------------------------------------------------------------------------------------------

// 1. Get the name or email, password from req.
// 2. Check if that email exists in our db.
// 3. If yes, then compare its password with the password stored in db
// 4. Generate access and refresh token and update user in db with refresh token
// 5. Send cookies to frontend

// ------------------------------------------------------------------------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  // Step 1 : Extract details from request body
  const { email, password } = req.body;
  UserValidationSchema.parse(req.body);

  // Step 2: Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  // Validate password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid password');
  }

  // Step 4: Generate access and refresh token and update user with refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Step 5: Send cookies to frontend
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  };
  // Don't send password and refresh token to user in response
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'User logged in successfully'
      )
    );
});

async function generateAccessAndRefreshTokens(userId) {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // we are not validating before saving because we are not updating any field. IMP Step

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Failed to generate tokens');
  }
}

// ------------------------------------------------------------------------------------------------------------------------
//                                                       Logout User LOGIC
// ------------------------------------------------------------------------------------------------------------------------

// 1. Get userId from req.user which comes from middleware
// 2. Update refresh token to null
// 3. Clear cookies

// ------------------------------------------------------------------------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {

  // Step 1: Get userId from req.user
 
  // console.log('req.user', req.user);
  await User.findByIdAndUpdate(
    req.user._id,
    { refreshToken: null },
    { new: true }
  );

  // Step 3: Clear cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  };
  // Send response
  res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, 'User logged out successfully'));
});

const getUserProfile = asyncHandler(async (req,res)=>{
  
  if (!req.user) {
    throw new ApiError(404, 'User not found'); 
  }

  const user= await User.findById(req.user._id).select('-password -refreshToken')
  if(!user)
    throw new ApiError(404, 'User not found')

  res
  .status(200)
  .json(new ApiResponse(200, user , 'User fetched successfully'));
})

const updateUserProfile = asyncHandler(async(req,res)=>{
  const { name, email, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res
  .status(200)
  .json(new ApiResponse(200, updatedUser, 'User updated successfully'));
})

const getUsers = asyncHandler(async(req,res)=>{
  const users = await User.find({});
  res.json(users);
})

// ------------------------------------------------------------------------------------------------------------------------
//                                                       Delete User LOGIC
// ------------------------------------------------------------------------------------------------------------------------
  // You can only delete users not admin
// ------------------------------------------------------------------------------------------------------------------------
const deleteUser = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);

  if(!user)
    throw new ApiError(404, 'User not found')

  if(!user.isAdmin)
    throw new ApiError(400, 'Can not delete admin user')


  const userToDelete= await User.deleteOne({_id:user._id})
  res.json({ message: 'User removed' });
})

const getUserById = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id).select('-password -refreshToken');

  if(!user)
    throw new ApiError(404, 'User not found')

  res.json(user);
})

const updateUser = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id).select('-password -refreshToken');

  if(!user)
    throw new ApiError(404, 'User not found')

  const { name, email, isAdmin } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = Boolean(isAdmin);

  const updatedUser = await user.save();

  res
  .status(200)
  .json(new ApiResponse(200, user, "User Updated successfully"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser,
  updateUser,
};
