'use client'
import React, { useRef } from 'react';
import { useCustomization } from '@/contexts/Customization';
import EmptyCart from '@/components/EmptyCart';
import Checkout from '@/components/Checkout';
import CartItem from '@/components/CartItem';
import LoadingCart from '@/components/LoadingCart'


function Cart() {
    const ref = useRef(null);

    const { cart, clearCart, removeFromCart, isLoadingCart } = useCustomization();
    const subTotal = cart.reduce((acc, item) => acc + item.price, 0);

    const handleSubmit = () => {
        ref.current.submit();
    };



    if (isLoadingCart) {
        return < LoadingCart />; // Replace with a better loading UI if needed
    }


    return cart?.length > 0 ? (
        <div className='mt-16 md:mt-0 font-quicksand flex flex-col gap-4 text-black items-center justify-center w-screen h-full p-4 md:p-6 '>
            <h2 className='text-xl text-center '>Cart ({cart?.length} Items)</h2>
            <div className='flex flex-col lg:flex-row  gap-8 lg:gap-12 w-full lg:w-[90%] h-fit justify-center  '>
                <Checkout ref={ref} />
                <div className='flex flex-col w-full lg:w-1/3 gap-8 h-fit'>
                    <div className='flex flex-col gap-4 justify-center rounded w-full h-full bg-white items-center p-4 '>
                        <h2 className='font-semibold text-lg'>Summary</h2>
                        <hr className='w-full border-1 border-gray-300' />
                        <div className='flex flex-col w-full overflow-hidden  overflow-y-auto overflow-x-auto max-h-[50vh]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full'>
                            {cart.map((item, index) => (
                                <div key={'div1' + index}>
                                    <CartItem key={index} item={item} />
                                </div>
                            ))}
                        </div>
                        <hr className='w-full border-gray-300' />
                        <div className='flex flex-col gap-2 w-full px-4'>
                            <div className='flex justify-between'>
                                <p>Order total</p>
                                <p>Ksh. {subTotal}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Promo Code</p>
                                <input
                                    type='text'
                                    className='relative w-1/2 border bg-white border-gray-300 rounded p-1'
                                    placeholder='CODE'
                                />
                                <span className=' absolute text-cyan-700 text-nowrap text-sm p-2 rounded right-10 lg:right-32 xl:right-36 select-none cursor-pointer'>
                                    Apply
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Discount</p>
                                <p>Ksh. 0</p>
                            </div>
                        </div>
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
