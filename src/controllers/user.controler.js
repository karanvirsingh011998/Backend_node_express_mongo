import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/ayncHandler.js";
import { uploadFile } from "../utils/fileUpload.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    console.log('fisrt errror')
    throw new ApiError(400, "All fields are required");
  }
  console.log('object')

  const existedUser =await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser) {
    console.log('ExistedUser found')
    throw new ApiError(400, "Already exists");
  }

  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    console.log('localpath')
    throw new ApiError(400, "Avatar required");
  }
  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath);
  if (!avatar) {
    console.log('avatar error')
    throw new ApiError(400, "Avatar not uploaded");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url ?? "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong");
  }

  return (
    res.status(200),
    json(new ApiResponse(200, createdUser, "Registeration Successfull"))
  );
});

export { registerUser };
