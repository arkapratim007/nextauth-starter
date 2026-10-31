import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    try{
        await connect();
        const {token,newPassword} = await req.json();

        if(!token || !newPassword){
            return NextResponse.json({error:"Token and new password are required"},{status:400})
        }

        const user = await User.findOne({
            forgotPasswordToken:token,
            forgotPasswordTokenExpiry:{$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({error:"Invalid or expired token"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword,salt);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:"Password reset successful"},{status:200})
        

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}

