import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <div className='font-quicksand flex flex-col w-[100%] border-t-[1px] border-gray-400  h-full py-4 md:py-12 text-black items-center justify-center'>
      <div className=' flex gap-2 justify-between w-[90%] h-full border-b-[1px] border-gray-300 pb-4'>
        <div className='flex flex-col gap-2 w-1/2  p-4'>
          <h2 className='text-2xl semi-bold'>Contact</h2>
          <p className='text-sm'>
            Benedictor, Utawala
            <br />
            Nairobi, Kenya
          </p>
          <p className='text-sm'>
            254-739-591212
            <br />
          </p>
        </div>
        <div className='flex flex-wrap w-1/2  justify-between'>
          <div className='flex flex-col w-full md:w-1/3 gap-2 h-fit p-4'>
            <h2 className='text-xl semi-bold'>Company</h2>
            <ul className='flex flex-col gap-1 text-sm opacity-65'>
              <li className='hover:underline cursor-pointer'>About Us</li>
              <li className='hover:underline cursor-pointer'>Work With US</li>
              <li className='hover:underline cursor-pointer'>Blog and News</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2 w-full md:w-1/3 h-fit p-4'>
            <h2 className='text-xl semi-bold'>Support</h2>
            <ul className='flex flex-col gap-1 text-sm opacity-65'>
              <li className='hover:underline cursor-pointer'>FAQs</li>
              <li className='hover:underline cursor-pointer'>Shipping</li>
              <li className='hover:underline cursor-pointer'>Return Policy</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2 w-full md:w-1/3 h-fit p-4'>
            <h2 className='text-xl semi-bold'>Legal</h2>
            <ul className='flex flex-col gap-1 text-sm opacity-65 '>
              <li className='hover:underline cursor-pointer'>
                Terms and Conditions
              </li>
              <li className='hover:underline cursor-pointer'>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex text-sm gap-6 justify-between w-[90%] p-4'>
        <p className='font-semibold'>
          &copy; 2024. All rights reserved. Zitenge
        </p>
        <div className='flex flex-wrap md:w-1/6 md:justify-evenly gap-8 md:gap-2 items-center px-2'>
          <Link href='#' className='relative w-6 h-6'>
            <Image fill src='/images/whatsapp.png' alt='whatsapp' />
          </Link>
          <Link href='#' className='relative w-6 h-6'>
            <Image fill src='/images/tiktok.png' alt='tiktok' />
          </Link>
          <Link href='#' className='relative w-6 h-6'>
            <Image fill src='/images/instagram.png' alt='instagram' />
          </Link>
          <Link href='#' className='relative w-6 h-6'>
            <Image fill src='/images/facebook.png' alt='facebook' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
