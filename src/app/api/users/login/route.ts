import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json();
        const { email, password } = reqBody;

        //check if user exists
        const user = await User.find({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        //create and assign a token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({
            message: "Login successful",
            sucess: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

