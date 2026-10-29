import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { name, email, password, confirmPassword } = reqBody;

        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("USER SAVED:", savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });

    } catch (error: any) {
        console.error("SIGNUP ERROR:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}