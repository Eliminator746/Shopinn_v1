import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import jwt from 'jsonwebtoken';

// ------------------------------------------------------------------------------------------------------------------------
//                                                          Verify JWT Logic
// ------------------------------------------------------------------------------------------------------------------------

// 1. Get token from cookies or headers
// 2. Verify token
// 3. Check if user exists, We've the access of id. While signing jwt we provided id in payload
// 4. Send user data via req.user

// ------------------------------------------------------------------------------------------------------------------------
export const verifyJWT= asyncHandler(async (req,res,next) => {
    
    try {
      // Step 1: Get token from cookies or headers
      const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
      if(!token){
        throw new ApiError(401, 'Unauthorized');
      }
      // Step 2: Verify token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // This will throw an error if token is invalid
      console.log('decodedToken', decodedToken);
  
      // Step 3: Check if user exists
      const user = await User.findById(decodedToken?._id).select('-password -refreshToken');
      if(!user){
        throw new ApiError(404, 'User not found');
      }
  
      // Step 4: Send user data via req.user
  
      req.user = user;
      next();
 
    } catch (error) {
      throw new ApiError(401, 'Unauthorized');
    }
 
 });

export const admin = asyncHandler(async (req, res, next) => {
  // Check if req.user exists
   if (!req.user) {
    throw new ApiError(401, 'Not authenticated');
  }
  // Check if user is Admin
  if (!req.user.isAdmin) 
    throw new ApiError(401, 'Not authorized as an admin');

  next();
});
