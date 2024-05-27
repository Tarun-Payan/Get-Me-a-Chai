'use server'
import React from 'react'
import Razorpay from 'razorpay'
import mongoose from 'mongoose'
import Payment from '@/models/Payment'
import User from '@/models/User'

export const initiate = async (data, username, amount, rid, rsecret) => {
  // console.log(data)

  var instance = new Razorpay({ key_id: rid, key_secret: rsecret })

  let options = {
    "amount": amount * 100,
    "currency": "INR",
  }

  let x = await instance.orders.create(options);

  const client = await mongoose.connect(process.env.URI)
  const payment = new Payment({oid: x.id, to_user: username, name: data.name, message: data.message, amount: amount})
  await payment.save()
  
  return x
}

export const paymentData = async (username) => {
  // console.log(username)
  const client = await mongoose.connect(process.env.URI)
  const payment = await Payment.find({to_user: username}).lean()

  if(payment)
    // send plain object
    return JSON.parse(JSON.stringify(payment))
  else 
    return {starus: false}
}

// Save user data from dashboard
export const saveUserData = async (data) => {
  const client = await mongoose.connect(process.env.URI)
  const updated = await User.findOneAndUpdate({email: data.email}, {
    name: data.name,
    profilepic: data.ppicture,
    coverpic: data.cpicture,
    razorpayId: data.rid,
    razorpaySecret: data.rsecret
  })
  // console.log(updated)
  // console.log(data)

  if(updated){
    return {status: true}
  }
  else{
    return {status: false}
  }
}

export const userData = async (name) => {
  // console.log(name)
  const client = await mongoose.connect(process.env.URI)
  const user = await User.findOne({username: name}).lean()
  // console.log("User", user)
  // return user
  // console.log(user.toObject())
  if(user){
    return user
  }
  else{
    return {status: false}
  }
}