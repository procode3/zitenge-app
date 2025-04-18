"use client"

import { Button } from '@/components/ui/button'
import CartItem from '@/components/CartItem';
import { useCustomization } from '@/contexts/Customization';
import Checkout from '@/components/Checkout';
import { useRef } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { creditCardSchema } from '@/schemas/order.schema'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LockKeyhole, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

function Payment() {
    const ref = useRef<HTMLFormElement | null>(null);
    const { cart } = useCustomization();
    const subTotal = cart.reduce((acc, item) => acc + item.price, 0);

    const form = useForm<z.infer<typeof creditCardSchema>>({
        resolver: zodResolver(creditCardSchema),
        defaultValues: {
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: ""
        },
    })

    function onSubmit(values) {
        alert(values)
    }



    return (
        <div className='flex justify-center items-center w-full'>

            <div className='flex w-5/8'>
                <div className='flex flex-col w-4/5 ml-auto gap-4 p-8'>

                    <h2 className='text-center text-sm'>Express checkout</h2>
                    <div className='flex gap-4  pr-4'>
                        <Button className=' flex items-center gap-0 w-1/2 h-12 bg-green-900 hover:bg-green-700 cursor-pointer'>
                            <span className='text-white font-semibold text-lg '>M</span>
                            <div className='relative w-1/12 h-6'>
                                <Image
                                    src={"images/mpesa.svg"}
                                    fill
                                    alt='Lipa na mpesa'
                                />
                            </div>
                            <span className='text-white font-semibold text-xl'>pesa</span>

                        </Button>
                        <Button className=' flex w-1/2 h-12 bg-black hover:bg-gray-800 cursor-pointer'>
                            <div className='relative w-1/12 h-6'>
                                <Image
                                    src={"images/google.svg"}
                                    fill
                                    alt='Google pay'
                                />
                            </div>
                            <span className='text-white font-semibold text-lg'>Pay</span>

                        </Button>
                    </div>
                    <div className='flex items-center py-2 gap-2'>
                        <hr className='w-1/2 bg-slate-200 dark:bg-gray-700' />
                        <p className='text-sm opacity-70'>OR</p>
                        <hr className='w-1/2 bg-slate-200 dark:bg-gray-700' />
                    </div>

                    <Checkout ref={ref} />
                    <div className='flex flex-col gap-2'>
                        <h2>Shipping Method</h2>
                        <Input placeholder='International Shipping' disabled />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col py-2'>
                            <h2 className='text-lg font-semibold'>Payment</h2>
                            <p className='text-sm  text-gray-500'>All transactions are secure and encrypted.</p>
                        </div>

                        <div className='flex flex-col h-full w-full rounded bg-slate-100 gap-4'>
                            <div className='flex justify-between items-center  border-1 border-slate-800 py-2 px-4 rounded'>
                                <p className='text-sm'>Credit Card</p>
                                <div className='flex gap-2  h-full'>
                                    <div className='relative h-8 w-8'>
                                        <Image
                                            src={"images/mastercard.svg"}
                                            fill
                                            alt='Mastercard'
                                        />
                                    </div>
                                    <div className='relative h-8 w-8'>
                                        <Image
                                            src={"images/visa.svg"}
                                            fill
                                            alt='Visa'
                                        />
                                    </div>


                                </div>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-col gap-2 p-4">
                                    <FormField
                                        control={form.control}
                                        name="cardNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Card number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Card number" {...field} className='bg-white' />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className='flex sm:flex-wrap md:flex-nowrap justify-between gap-2'>
                                        <FormField
                                            control={form.control}
                                            name="expiryDate"
                                            render={({ field }) => (
                                                <FormItem className='w-1/2'>
                                                    <FormLabel>Expiry date</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Expiry date (MM/YY)" {...field} className='bg-white' />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cvv"
                                            render={({ field }) => (
                                                <FormItem className='w-1/2'>
                                                    <FormLabel>Cvv</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Security code" {...field} className='bg-white' />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="cardHolder"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Card holder</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name on card" {...field} className='bg-white' />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <span className='flex items-center gap-2 text-xs text-gray-600'><LockKeyhole strokeWidth={0.75} size={12} /> Secure and encrypted</span>
                                </form>
                            </Form>

                        </div>
                        <Button onClick={form.handleSubmit(onSubmit)} className=' flex items-center gap-0 w-full h-12 bg-red-600 hover:bg-red-500 my-4 text-white text-lg cursor-pointer'> Pay now</Button>
                    </div>
                    <hr className='mt-8 w-full bg-slate-200 dark:bg-gray-700' />
                    <div className='flex flex-wrap gap-4'>
                        <Link href={"#"} className='text-sm cursor-pointer text-gray-500 hover:underline'>Shipping policy</Link>
                        <Link href={"#"} className='text-sm cursor-pointer text-gray-500 hover:underline'>Return policy</Link>
                        <Link href={"#"} className='text-sm cursor-pointer text-gray-500 hover:underline'>Privacy policy</Link>
                        <Link href={"#"} className='text-sm cursor-pointer text-gray-500 hover:underline'>Terms of service</Link>
                    </div>
                </div>
            </div>

            <div className="h-full min-h-[1em] w-px  self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
            <div className='h-full w-1/2 bg-slate-50'>
                <div className='w-4/5 sticky top-0 h-fit py-8 px-8 tracking-tight '>
                    {cart.map((item, index) => (
                        <div key={'div1' + index}>
                            <CartItem key={index} item={item} />
                        </div>
                    ))}

                    <div className='flex justify-between items-center mb-4'>
                        <Input placeholder='Discount code' className='w-2/3 ' />
                        <Button variant={"outline"} className='h-12' >Apply</Button>
                    </div>
                    <div className='flex justify-between items-center p-1 text-sm '>
                        <p>Subtotal</p>
                        <p>{`Ksh. ` + subTotal}</p>
                    </div>
                    <div className='flex justify-between items-center p-1 text-sm'>
                        <span className='flex  items-center'>Shipping
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant={'ghost'} size={'icon'} ><ShieldAlert strokeWidth={0.75} size={12} /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>The final shipping cost <br /> will be confirmed by <br /> email or text after you  <br /> place your order</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </span>
                        <p>{`Ksh. ` + 0}</p>
                    </div>
                    <div className='flex justify-between items-center px-1 py-4  font-semibold'>
                        <p>Total</p>
                        <p>{`Ksh. ` + subTotal}</p>
                    </div>
                </div>

            </div>

        </div >

    )
}

export default Payment