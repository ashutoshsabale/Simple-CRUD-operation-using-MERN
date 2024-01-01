import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(createUser)
router.route("/all-users").get(getAllUsers)
router.route("/:id").get(getSingleUser)
router.route("/update-user/:id").patch(updateUser)
router.route("/delete-user/:id").delete(deleteUser)

export default router