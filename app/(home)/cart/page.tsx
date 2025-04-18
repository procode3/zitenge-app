'use client'
import React, { useRef } from 'react';
import { useCustomization } from '@/contexts/Customization';
import EmptyCart from '@/components/EmptyCart';
import CartItem from '@/components/CartItem';
import LoadingCart from '@/components/LoadingCart'


function Cart() {
    const ref = useRef<HTMLFormElement | null>(null);

    const { cart, isLoadingCart } = useCustomization();
    const subTotal = cart.reduce((acc, item) => acc + item.price, 0);

    const handleSubmit = () => {
        ref?.current?.submit();
    };



    if (isLoadingCart) {
        return < LoadingCart />; // Replace with a better loading UI if needed
    }


    return cart?.length > 0 ? (
        <div className='mt-16 md:mt-0 font-quicksand flex flex-col gap-4 text-black justify-center w-4/5 h-full mx-auto p-4 md:p-6 '>
            <h2 className='text-xl font-semibold md:ml-12 '>Your Cart</h2>
            <div className='flex flex-col lg:flex-row  gap-8 lg:gap-12 w-full lg:w-[90%] h-fit justify-center  '>

                <div className='flex flex-col w-full lg:w-2/3 gap-8 h-fit'>
                    <div className='flex flex-col gap-4 justify-center rounded w-full h-full items-center p-4 '>
                        <div className='flex bg-red-200 w-1/2 ml-auto justify-between'>
                            <h2 className=''>Price</h2>
                            <h2 className=''>Quantity</h2>
                            <h2 className=''>Total</h2>
                        </div>
                        <hr className='w-full bg-slate-200 dark:bg-gray-700' />
                        <div className='flex flex-col w-full overflow-hidden  overflow-y-auto overflow-x-auto max-h-[50vh]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full'>
                            {cart.map((item, index) => (
                                <div key={'div1' + index} className='w-full'>
                                    <CartItem key={index} item={item} />
                                </div>
                            ))}
                        </div>

                        <hr className='w-full bg-slate-200 dark:bg-gray-700' />
                        <div className='flex w-full font-semibold px-4 justify-between items-center py-2'>
                            <p>Subtotal</p>
                            <p>Ksh. {subTotal}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className='bg-cyan-700 text-white text-nowrap text-sm p-2 rounded w-32 mx-auto md:ml-auto md:mx-0 '
                    >
                        Pay
                    </button>


                </div>
            </div>
        </div>
    ) : (
        <EmptyCart />
    );
}



export default Cart;
