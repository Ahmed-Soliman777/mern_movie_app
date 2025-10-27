import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// export async function getAllUsers(req, res) {
//     try {
//         const users = await User.find()
//         return res.status(200).json({ Data: users })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }

// export async function getUser(req, res) {
//     try {
//         const { id } = req.params
//         if (!id) {
//             return res.status(400).json({ message: "User ID is required" })
//         }

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: `Invalid user ID: ${id}` });
//         }

//         const user = await User.findById(id)

//         if (!user) {
//             return res.status(400).json({ message: `user with ID: ${id}, not found` });
//         }

//         return res.status(200).json({ Data: user })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }

export async function getProfile(req, res) {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: "No token provided!" })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodeToken) {
            return res.status(401).json({ message: "Invalid Token!" })
        }

        const user = await User.findById(decodeToken.id).select("-password")

        if (!user) {
            return res.status(400).json({ message: "Invalid User!" })
        }


        return res.status(200).json({ user: user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "REQUIRED INFO !" })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered." });
        }

        const hashedpassword = await bcryptjs.hash(password, 10)

        const user = await User.create({ username, email, password: hashedpassword })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
        }

        return res.status(201).json({ message: "User registered successfully", data: user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params
        const { username, email, password } = req.body
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: `Invalid user ID: ${id}` });
        }
        const hashedpassword = await bcryptjs.hash(password, 10)
        const updateuser = await User.findByIdAndUpdate(id, { username, email, password: hashedpassword }, { new: true })
        if (!updateuser) {
            return res.status(404).json({ message: `User with ID: ${id} not found` });
        }
        return res.status(201).json({ message: "User updated successfully", data: updateuser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: `Invalid user ID: ${id}` });
        }
        const deleteuser = await User.findByIdAndDelete(id)
        if (!deleteuser) {
            return res.status(404).json({ message: `User with ID: ${id} not found` });
        }
        return res.status(201).json({ message: `User ${id} has been deleted successfully` })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(201).json({ message: "User logged successfully", data: user, token: token })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function logout(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully!" })
}