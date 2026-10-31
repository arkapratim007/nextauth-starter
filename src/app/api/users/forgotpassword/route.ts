import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
    try{
        await connect();
        const {email} = await req.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"If an account exists, a reset link was sent."},{status:200})
        }

        // sendEmail handles token generation and saving to DB
        await sendEmail({email: user.email, emailType:"RESET", userId: user._id});
        return NextResponse.json({message:"If an account exists, a reset link was sent."},{status:200})

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
