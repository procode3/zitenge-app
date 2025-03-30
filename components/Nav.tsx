'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react';
import { useCustomization } from '@/contexts/Customization';

const Nav = () => {
  const { cart } = useCustomization();

  return (
    <nav className='hidden md:flex items-center justify-center w-screen border-b-[1px] border-gray-400'>
      <div className='flex font-quicksand w-[90%] h-20 text-black justify-between items-center '>
        <h2 className='text-2xl w-1/3 '>zitenge</h2>
        <ul className='flex gap-4 justify-evenly w-1/3'>
          <li>
            <Link href='/experience'>Order</Link>
          </li>
          <li>
            <Link href='/track'>Track</Link>
          </li>
          <li>
            <Link href='/gallery'>Gallery</Link>
          </li>
          <li>
            <Link
              href='/experience'
              className='bg-cyan-700 text-white px-4 py-2 rounded hover:text-white'
            >
              Configurator
            </Link>
          </li>
          <li>
            <Link href='/cart'>
              <div className='relative flex items-center'>
                <ShoppingCart size={28} />
                {cart?.length > 0 && (
                  <p className='absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                    {cart?.length}
                  </p>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
