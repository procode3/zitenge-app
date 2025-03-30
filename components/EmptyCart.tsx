import Image from 'next/image';
import Link from 'next/link';

function EmptyCart() {
  return (
    <div className='mt-16 md:mt-0 font-quicksand flex flex-col text-black  items-center justify-center gap-4 my-10'>
      <div className='h-56 w-48 relative'>
        <Image
          src='/images/empty-cart.svg'
          fill
          alt='Empty cart'
        />
      </div>
      <p className='text-center text-lg font-semibold'>
        Your cart is empty. <br />{' '}
        <span className='text-sm font-normal opacity-50'>
          It seems like you have not made a choice yet...
        </span>
      </p>
      <Link
        type='button'
        href={`/experience`}
        className={`flex group text-nowrap text-center items-center bg-cyan-700 text-white px-8 w-fit  py-2 rounded hover:text-white`}
      >
        Shop Now
      </Link>
    </div>
  );
}

export default EmptyCart;
