'use client'
import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form"
import { useSession, getSession } from "next-auth/react"
import { saveUserData, userData } from '@/actions/userAction'
import { useRouter } from "next/navigation"

const page = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/login');
      } else {
        setSession(session);
        setLoading(false);
        userData(session.user.name).then((values)=>{
          setValue("email", values.email)
          setValue("username", values.username)
          setValue("name", values.name?values.name:"")
          setValue("ppicture", values.profilepic?values.profilepic:"")
          setValue("cpicture", values.coverpic?values.coverpic:"")
          setValue("rid", values.razorpayId?values.razorpayId:"")
          setValue("rsecret", values.razorpaySecret?values.razorpaySecret:"")
        })
      }
    };
    fetchSession();
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm();

  const onSubmit = async (data) => {
    let res = await saveUserData(data)
    console.log(res)
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold py-12 text-center px-2'>Welcome to your Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[95%] md:w-[738px] flex flex-col gap-2 pb-10'>
        <label className='flex flex-col'>
          <span className='text-gray-500'>Name</span>
          <input type='text' className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("name", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 20, message: "Max length is 20" } })} />
          {errors.name && <div className='text-red-500 font-semibold text-xs'>{errors.name.message}</div>}
        </label>

        <label className='flex flex-col'>
          <span className='text-gray-500'>Email</span>
          <input type="email" name='email' className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("email", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 40, message: "Max length is 20" } })} />
          {errors.email && <div className='text-red-500 font-semibold text-xs'>{errors.email.message}</div>}
        </label>

        <label className='flex flex-col'>
          <span className='text-gray-500'>Username</span>
          <input type="text" name='username' className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("username", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 20, message: "Max length is 20" } })} />
          {errors.username && <div className='text-red-500 font-semibold text-xs'>{errors.username.message}</div>}
        </label>

        <label className='flex flex-col'>
          <span className='text-gray-500'>Profile Picture</span>
          <input type="text" className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("ppicture", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" } })} />
          {errors.ppicture && <div className='text-red-500 font-semibold text-xs'>{errors.ppicture.message}</div>}
        </label>

        <label className='flex flex-col'>
          <span className='text-gray-500'>Cover Picture</span>
          <input type="text" className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("cpicture", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" } })} />
          {errors.cpicture && <div className='text-red-500 font-semibold text-xs'>{errors.cpicture.message}</div>}
        </label>

        <label className='flex flex-col'>
          <span className='text-gray-500'>Razorpay ID</span>
          <input type="text" className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("rid", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 40, message: "Max length is 20" } })} />
          {errors.rid && <div className='text-red-500 font-semibold text-xs'>{errors.rid.message}</div>}
        </label>

        <label className='flex flex-col'>
          <span className='text-gray-500'>Razorpay Secret</span>
          <input type="text" className='text-black rounded-md pl-2 bg-gray-300 py-[1px] outline-none' {...register("rsecret", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 40, message: "Max length is 20" } })} />
          {errors.rsecred && <div className='text-red-500 font-semibold text-xs'>{errors.rsecred.message}</div>}
        </label>

        <input type="submit" className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-lg text-sm px-5 py-1.5 focus:bg-gradient-to-t text-center mb-2 cursor-pointer' />
      </form>
    </div>
  )
}

export default page
