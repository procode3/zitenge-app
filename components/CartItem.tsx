import React from 'react';
import { CartItem as CartItemType } from '../contexts/Customization';
import Image from 'next/image';

const CartItem = ({ item }: { item: CartItemType }) => {
  const { name, shelfColor, frameColor, price } = item;
  const screenshots = JSON.parse(localStorage.getItem('screenshots') as string);
  const dataUrl = screenshots[item.id];
  return (
    <div className='flex justify-between gap-2 items-center w-full py-4   '>
      <div className='flex gap-2 md:gap-8 items-center w-2/3'>
        <div className='w-18 h-18 relative rounded overflow-hidden border-[1px] border-gray-300'>
          <Image
            src={dataUrl}
            alt='shoe rack'
            fill
          />
        </div>

        <div className='flex  flex-col gap-0 w-1/2'>
          <h2 className='text-sm font-semibold'>{`${name?.toLowerCase()} shoe rack`}</h2>
          <p className='text-xs opacity-50'>
            {frameColor.hex === shelfColor.hex
              ? frameColor.name
              : `${frameColor.name} on ${shelfColor.name}`}{' '}
          </p>

        </div>
      </div>

      <p className='text-sm font-semibold'>{`Ksh. ${price}`}</p>

    </div>
  );
};

export default CartItem;
