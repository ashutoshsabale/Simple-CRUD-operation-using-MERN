import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createUser = asyncHandler( async(req, res)=>{
      const {name, email, age} = req.body

      if(
            [email, name, age].some((field)=>field?.trim()==="")
      ){
            return res
            .status(400)
            .json(
                  new ApiError(400,{}, "All fields required")
            )
      }

      // checking existed user
      const existedUser = await User.findOne({email})

      if(existedUser){
            return res
            .status(400)
            .json(
                  new ApiError(409,{}, "Email has already been registered.")
            )

      }

      const user = await User.create({
            name,
            email: email.toLowerCase(),
            age
      })

      if(!user){
            return res
            .status(500)
            .json(
                  new ApiError(500,{}, "Server error")
            )

      }

      return res
      .status(200)
      .json(
            new ApiResponse(
                  200,
                  user,
                  "Successfuly created a new account.",
            )
      )
})

const getAllUsers = asyncHandler( async (req, res)=>{
      const allUsers = await User.find();

      if(!allUsers){
            return res
            .status(500)
            .json(
                  new ApiError(500,{}, "Server error")
            )
      }

      return res
      .status(200)
      .json(
            new ApiResponse(
                  200,
                  allUsers,
                  "List of users fetched successfully"
            )
      )
})

const getSingleUser = asyncHandler( async (req, res)=>{
      const {id} = req.params;
      const singleUser = await User.findById({_id:id});

      if(!singleUser){
            return res
            .status(500)
            .json(
                  new ApiError(500,{}, "Server error")
            )
      }

      return res
      .status(200)
      .json(new ApiResponse(200, singleUser, "User fetched successfully"))
})

const updateUser = asyncHandler( async (req, res) =>{
      const {id} = req.params;
      const {name, email, age} = req.body

      const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                  $set: {
                        name,
                        email,
                        age
                  }
            },
            {new: true}
      );

      return res
      .status(200)
      .json(
            new ApiResponse(200, updatedUser, "User updated successfully")
      )

})

const deleteUser = asyncHandler( async (req, res)=>{
      const {id} = req.params;
      const userDeleted = await User.findByIdAndDelete({_id:id});

      console.log(userDeleted)

      return res
      .status(200)
      .json(new ApiResponse(200, null, "User removed successfully"))
})

export {
      createUser,
      getAllUsers,
      getSingleUser,
      updateUser,
      deleteUser,
}