import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse,} from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "USer doesn't exist"},
            {status:400})
        }
        //check if pass is correct
        const validPassword = await bcryptjs.compare(
            password, user.pasword)
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"},
            {status:400})
        }

    }catch (error) {
        return NextResponse.json({message: "Internal Server Error", error},
         {status: 500})
    }
}