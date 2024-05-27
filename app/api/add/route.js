import mongoose from 'mongoose'
import Payment from '@/models/Payment'
import { NextResponse } from 'next/server'

export async function POST(request) {
    let data = await request.json();

    // console.log("Post request is thrown")
    // console.log(data)
    const client = await mongoose.connect(process.env.URI)
    await Payment.findOneAndUpdate({oid: data.oid}, {done: true})

    return NextResponse.json({success: true})
}