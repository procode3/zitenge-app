'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react';
import { useCustomization } from '@/contexts/Customization';


const Nav = () => {
  const { cart } = useCustomization();

  return (
    <nav className='hidden fixed top-0 md:flex items-center justify-center w-full font-medium z-50 backdrop-blur-md'>
      <div className='flex font-quicksand w-[90%] h-20 text-black justify-between items-center '>
        <Link href='/' className='logo text-2xl tracking-tight '>zitenge</Link>


        <div className='flex gap-7'>
          <Link href='/cart'>Orders</Link>

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
          {/* <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar> */}
        </div>

      </div>
    </nav>
  );
};

export default Nav;
