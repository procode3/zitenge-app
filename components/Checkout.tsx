'use client'
import React, { useState, forwardRef, useImperativeHandle, useCallback, useEffect } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { debounce } from "lodash";

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
import {
  Select, SelectTrigger, SelectValue, SelectItem, SelectContent
} from "@/components/ui/select"


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

];


// {
//   frameColor:  "Rustic"
//   id: "66c21df6-e144-47f2-80de-67bdc316f48c"
//   price : 7500
//   rack:"30 Pair"
//   shelfColor: "Rustic"
// }


const Checkout = forwardRef((props, ref) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [paymentType, setPaymentType] = useState("deposit");
  const [fullAmount, setFullAmount] = useState(0)

  const { cart } = useCustomization();



  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      paymentMethod: "mpesa",
      notes: "",
      amount: 1000,
      paymentType: ""
    },
  })


  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
    setFullAmount(totalAmount)
  }, [cart]);



  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query || selected) return setSuggestions([]);
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}+kenya&format=geojson`
        );
        const data = await res.json();
        setSuggestions(data.features.map((feature) => feature.properties.display_name));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    if (!selected) fetchSuggestions(form.getValues("address"));
  }, [form.watch("address"), selected]);


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
                  <div className='relative text-sm'>
                    <Input
                      placeholder="Shooters, Utawala"
                      {...field}
                      onChange={(e) => {
                        setSelected(false);
                        field.onChange(e);
                        fetchSuggestions(e.target.value);
                      }}
                    />
                    {loading && <p className="absolute p-2 w-full border mt-1 bg-white shadow-lg  overflow-auto rounded">Loading...</p>}
                    {suggestions.length > 0 && (
                      <ul className="absolute w-full border mt-1 bg-white shadow-lg max-h-48 overflow-auto rounded">
                        {suggestions.map((s, idx) => (
                          <li
                            key={idx}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                              setSelected(true);
                              field.onChange(s);
                              setSuggestions([]);
                            }}
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Add your shipping address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Notes" {...field} />
                </FormControl>
                <FormDescription>
                  Add any tailored instructions .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 ">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <FormControl>
                      <Select
                        value={paymentType}
                        onValueChange={(value) => {
                          setPaymentType(value);
                          field.onChange(value);
                          if (value === "full") {
                            form.setValue("amount", fullAmount);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deposit">Deposit</SelectItem>
                          <SelectItem value="full">Pay in Full</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-1/2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{paymentType == 'full' ? 'Full Amount' : 'Deposit'}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1000"
                        type="number"
                        {...field}
                        disabled={paymentType === "full"}
                        min={paymentType === "deposit" ? 1000 : undefined}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      {paymentType === "deposit"
                        ? "Enter a deposit amount."
                        : `Full payment: ${fullAmount}`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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








