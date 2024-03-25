import express from "express";

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getUsers,
}
from "../controllers/users.js";
import { verifyToken } from "../midldeware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getUser);
router.get("/getusers/:searchQuery", getUsers);
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;