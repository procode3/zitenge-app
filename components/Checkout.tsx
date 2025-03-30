'use client'
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useCustomization } from '@/contexts/Customization';
import { OrderItem } from '@prisma/client';


// import {
//   LucideIcon,
//   UserRound as UserIcon,
//   AtSign,
//   MapPin,
//   Wallet,
//   Phone,
// } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { useForm } from "react-hook-form"

import { orderSchema } from '@/schemas/order.schema';


const paymentMethods = [
  {
    name: 'mpesa',
    label: "M-Pesa",
    enabled: true,
  },
  {
    name: "card",
    label: 'Credit Card',
    enabled: false,
  },
  {
    name: "cash",
    label: 'Cash',
    enabled: false,
  },
  {
    name: "bank_transfer",
    label: 'Bank Transfer',
    enabled: false,
  },

];


// {
//   frameColor:  "Rustic"
//   id: "66c21df6-e144-47f2-80de-67bdc316f48c"
//   price : 7500
//   rack:"30 Pair"
//   shelfColor: "Rustic"
// }


const Checkout = forwardRef((props, ref) => {
  const { cart } = useCustomization();
  const subTotal = cart.reduce((acc, item) => acc + item.price, 0);



  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      paymentMethod: "mpesa"
    },
  })




  function onSubmit(data: z.infer<typeof orderSchema>) {
    console.log(cart)
    alert(JSON.stringify(data));
  }

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  return (
    <div className='font-quicksand mt-12 md:mt-0 bg-white p-4 md:px-8 text-black w-full lg:w-[60%] h-full '>
      <h2 className='text-lg my-2 text-center font-semibold'>Delivery Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Elon Musk" {...field} />
                </FormControl>
                <FormDescription>
                  This is your name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+254712345678" {...field} />
                </FormControl>
                <FormDescription>
                  This is your mobile number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="elon@x.com" {...field} />
                </FormControl>
                <FormDescription>
                  Add your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Input placeholder="Shooters, Utawala" {...field} />
                </FormControl>
                <FormDescription>
                  Add your shipping address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <div className="flex gap-4 flex-wrap">
                    {paymentMethods.map((method) => (
                      <div
                        key={method?.name}
                        onClick={() => field.onChange(method?.name)}
                        className={`px-4 py-2 border rounded cursor-pointer ${field.value === method.name ? "bg-blue-500 text-white" : "bg-gray-100"
                          }`}
                      >
                        {method?.label}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
});

Checkout.displayName = 'checkoutForm'

export default Checkout;








