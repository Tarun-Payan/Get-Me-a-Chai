'use client'
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { initiate, paymentData } from "@/actions/userAction"
import Script from "next/script"
import { userData } from "@/actions/userAction"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const page = (params) => {
  // Check user is sing in or not. If not then redirect to the login page
  const { data: session } = useSession()
  if(!session){
    return useRouter().push('/login')
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [initiateData, setInitiateData] = useState({})
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [payments, setPayments] = useState([])

  const [totoalOfpayments, settotoalOfpayments] = useState()
  const [totalPayments, settotalPayments] = useState()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    userData(params.params.slug).then((values) => {
      setInitiateData(values)
    })

    paymentData(params.params.slug).then((values) => {
      const donePayments = values.filter(payment => payment.done) // Filter orders that are done
      const filteredAndSortedOrders = donePayments 
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 10);
      setPayments(filteredAndSortedOrders)

      const totalAmount = donePayments.reduce((sum, payment) => sum + payment.amount, 0)
      settotoalOfpayments(totalAmount)

      settotalPayments(donePayments.length)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm();

  const onSubmit = async (data, e) => {

    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.name;

    let amount

    if (buttonName == 'pay') {
      amount = data.amount
    }
    else if (buttonName == 'pay10') {
      amount = 10
    }
    else if (buttonName == 'pay20') {
      amount = 20
    }
    else {
      amount = 30
    }

    let order = await initiate(data, params.params.slug, amount, initiateData.razorpayId, initiateData.razorpaySecret)
    // console.log("Order: ", order)

    var options = {
      "key": initiateData.razorpayId, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Get Me a Chai", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response) {
        //     alert(response.razorpay_payment_id);
        //     alert(response.razorpay_order_id);
        //     alert(response.razorpay_signature)
        alert(`Congractulation! Succefully pay ${data.amount} to ${params.params.slug}`)

        // Update payment to done: true when payment is done
        let req = await fetch("/api/add", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            oid: order.id
          }), // body data type must match "Content-Type" header
        })
        let res = await req.json()
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    let rres = await rzp1.open()
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="coverPicture relative h-[275px]">
        <Image
          alt="Cover Picture"
          src={initiateData.coverpic}
          className="object-cover object-center"
          fill
        />
      </div>
      <div className="profilePicture w-[100px] h-[100px] relative left-[50%]">
        <Image
          alt="Profile Picture"
          src={initiateData.profilepic}
          className="relative object-cover translate-x-[-50%] translate-y-[-50%] rounded-full border-t-[1px] border-x-[1px] border-white"
          fill
          sizes="full"
        />
      </div>
      <div className="profileInfo relative translate-y-[-50px] text-slate-400">
        <h2 className=" font-bold text-center">{initiateData.username}</h2>
        <p className="text-center text-xs">{initiateData.email}</p>
        <p className="text-center text-xs">{totalPayments} Payment • ₹{totoalOfpayments} raised</p>
      </div>

      <div className="payment container m-auto my-6 flex justify-center gap-2">
        <div className="paymentInfo w-[40%] h-[400px] bg-slate-800 rounded-md py-8 px-6">
          <h2 className="text-xl font-bold">Top 10 Supporter</h2>
          <div className="supporter pl-5 py-5 flex flex-col gap-1">
            {payments ? payments.map(item => {
              if (item.done) {
                return (<div className="flex gap-1 items-center" key={item._id}>
                  <Image
                    alt="Profile Picture"
                    src={"/Images/user.png"}
                    sizes="50px"
                    width={20}
                    height={20}
                    className="rounded-full w-[20px] h-[20px]"
                  />
                  <p className="text-xs text-nowrap overflow-clip">{item.name} denote <strong>₹{item.amount}</strong> with a message &ldquo;{item.message}&quot;</p>
                </div>)
              }
            }):
            <div>There is no supporter</div>}
          </div>
        </div>

        <div className="makePayment w-[40%] h-[400px] bg-slate-800 rounded-md py-8 px-6">
          <h2 className="text-xl font-bold">Make a Payment</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1.5 my-4">
            <label>
              <input type="text" className="w-full bg-gray-600 rounded-md py-2 px-2 outline-none text-xs" placeholder="Enter Name" {...register("name", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 20, message: "Max length is 20" } })} />
              {errors.name && <div className='text-red-500 font-semibold text-xs'>{errors.name.message}</div>}
            </label>
            <label>
              <input type="text" className="w-full bg-gray-600 rounded-md py-2 px-2 outline-none text-xs" placeholder="Enter Message" {...register("message", { required: { value: true, message: "Field is required" }, minLength: { value: 3, message: "Min length is 3" } })} />
              {errors.message && <div className='text-red-500 font-semibold text-xs'>{errors.message.message}</div>}
            </label>
            <label>
              <input type="number" className="w-full bg-gray-600 rounded-md py-2 px-2 outline-none text-xs" placeholder="Enter Amount" {...register("amount", { required: { value: true, message: "Field is required" }, minLength: { value: 1, message: "Min length is 3" }, maxLength: { value: 7, message: "Max length is 20" } })} />
              {errors.amount && <div className='text-red-500 font-semibold text-xs'>{errors.amount.message}</div>}
            </label>
            <button type="submit" className="w-full text-gray-900 bg-gray-100 hover:bg-gray-200 cursor-pointer font-medium rounded-lg text-sm py-1.5 inline-flex justify-center items-center dark:focus:ring-gray-500 me-2 mb-2 active:bg-gray-300" name="pay">Pay</button>

            <div className="payButtons flex gap-1.5">
              <button type="submit" name="pay10" className="bg-gray-700 rounded-md py-2 px-4 text-xs">Pay ₹10</button>
              <button type="submit" name="pay20" className="bg-gray-700 rounded-md py-2 px-4 text-xs">Pay ₹20</button>
              <button type="submit" name="pay30" className="bg-gray-700 rounded-md py-2 px-4 text-xs cursor-pointer">Pay ₹30</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default page