'use client'
import { useClickAway } from 'react-use';
import { useRef, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { House, Search, DraftingCompass, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCustomization } from '@/contexts/Customization';

export const routes = [
  {
    title: 'Home',
    href: '/',
    Icon: House,
  },
  {
    title: 'Explore',
    href: '/',
    Icon: Search,
  },
  {
    title: 'Configurator',
    href: '/experience',
    Icon: DraftingCompass,
  },
  {
    title: 'Cart',
    href: '/cart',
    Icon: ShoppingCart,
  },
];

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const { cart } = useCustomization();

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className='relative md:hidden z-10'>
      <div className='flex text-black justify-between w-screen px-4  bg-white fixed top-0 z-11 items-center'>
        <h2 className='text-2xl'>zitenge</h2>
        <div className='flex w-fit items-center  gap-2'>
          <Link href={'/cart'}>
            <div className='relative flex items-center'>
              <ShoppingCart size={20} />
              {cart?.length > 0 && (
                <p className='absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                  {cart?.length}
                </p>
              )}
            </div>
          </Link>
          <Hamburger
            toggled={isOpen}
            size={20}
            toggle={setOpen}
            color='black'
          />
        </div>
      </div>

      {isOpen && (
        <div className='font-quicksand fixed left-0 z-10 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 backdrop-blur-md bg-white/30 border-b border-b-white/20'>
          <ul className='grid gap-2'>
            {routes.map((route) => {
              const { Icon } = route;

              return (
                <li
                  key={route.title}
                  className='w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-slate-800 via-slate-950 to-slate-700'
                >
                  <Link
                    onClick={() => setOpen((prev) => !prev)}
                    className={
                      'flex items-center justify-between w-full p-5 rounded-xl bg-gray-150'
                    }
                    href={route.href}
                  >
                    <span className='flex gap-1 text-lg font-normal'>
                      {route.title}
                    </span>
                    <Icon className='text-xl' />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
