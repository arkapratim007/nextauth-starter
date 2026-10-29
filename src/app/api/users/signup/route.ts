import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {name, email, password, confirmPassword} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"},
            {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);
        if (password !== confirmPassword) {
            return NextResponse.json({error: "Passwords do not match"},
            {status: 400})
        }
        if (password !== confirmPassword) {
            return NextResponse.json({error: "Passwords do not match"},
            {status: 400})
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}