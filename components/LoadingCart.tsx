import { Skeleton } from "@/components/ui/skeleton"
import { Button } from './ui/button';

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
export default function LoadingCart() {
    return (
        <div className='mt-16 md:mt-0 flex flex-col gap-4 text-black items-center justify-center w-screen h-full p-4 md:p-6 '>
            <h2 className='text-xl text-center '>Cart (0 Items)</h2>
            <div className='flex flex-col lg:flex-row  gap-8 lg:gap-12 w-full lg:w-[90%] h-fit justify-center  '>
                <div className='font-quicksand mt-12 md:mt-0 bg-white p-4 md:px-8 text-black w-full lg:w-[60%] h-full '>
                    <h2 className='text-lg my-2 text-center font-semibold'>Delivery Information</h2>
                    <div>
                        <div className="space-y-4  grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-18 w-full py-2 my-3" />
                            <Skeleton className="h-18 w-full py-2 my-3" />
                            <Skeleton className="h-18 w-full py-2 my-3" />
                            <Skeleton className="h-18 w-full py-2 my-3" />
                            <Skeleton className="h-18 w-full py-2 my-3" />
                            <div className="flex gap-4 ">
                                <div className="w-1/2">
                                    <Skeleton className="h-18 w-full py-2 my-3" />
                                </div>

                                <div className="w-1/2">
                                    <Skeleton className="h-18 w-full py-2 my-3" />
                                </div>
                            </div>

                            <div>
                                <div>Payment Method</div>
                                <div className="flex gap-4 flex-wrap">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method?.name}

                                            className={`px-4 py-2 border rounded cursor-pointer bg-gray-100}`}
                                        >
                                            {method?.label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full lg:w-1/3 gap-8 h-fit'>
                    <div className='flex flex-col gap-4 justify-center rounded w-full h-full bg-white items-center p-4 '>
                        <h2 className='font-semibold text-lg'>Summary</h2>
                        <hr className='w-full border-1 border-gray-300' />
                        <div className='flex flex-col w-full overflow-hidden  overflow-y-auto overflow-x-auto max-h-[50vh]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full'>
                            <Skeleton className="h-20 py-8 my-4 w-full" />
                        </div>
                        <hr className='w-full border-gray-300' />
                        <div className='flex flex-col gap-2 w-full px-4'>
                            <div className='flex justify-between'>
                                <p>Order total</p>
                                <p>Ksh. {0}</p>
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
                            <p>Ksh. {0}</p>
                        </div>
                    </div>
                    <Button
                        disabled
                        className='bg-cyan-700 text-white text-nowrap text-sm p-2 rounded w-32 ms-auto md:ms-auto md:mx-0 '
                    >
                        Pay
                    </Button>
                </div>
            </div>
        </div>
    )
}
