import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCustomization } from '../contexts/Customization';
import Image from 'next/image';

const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeFromCart } = useCustomization();
  const { name, shelfColor, frameColor, price } = item;
  const screenshots = JSON.parse(localStorage.getItem('screenshots') as string);
  const dataUrl = screenshots[item.id];
  return (
    <div className='flex justify-between gap-2 items-center w-full py-4  px-4 '>
      <div className='flex gap-2 md:gap-8 items-center w-2/3'>
        <div className='min-w-20  max-w-20 min-h-20  max-h-20 relative rounded overflow-hidden border-[1px] border-gray-300'>
          <Image
            src={dataUrl}
            alt='shoe rack'
            width={100}
            height={100}
          />
        </div>

        <div className='flex flex-col gap-0 w-1/2'>
          <h2 className='text-sm font-semibold'>{`${name?.toLowerCase()} shoe rack`}</h2>
          <p className='text-xs opacity-50'>
            {frameColor.hex === shelfColor.hex
              ? frameColor.name
              : `${frameColor.name} on ${shelfColor.name}`}{' '}
          </p>
          <p className='text-sm'>{`Ksh. ${price}`}</p>
        </div>
      </div>

      <div className='flex flex-col-reverse  md:flex-row gap-1 items-center content-center'>
        <button className='cursor-pointer'>
          <Minus size={20} strokeWidth={1.2} />
        </button>
        <p className='text-center text-lg px-3 border border-gray-300 rounded'>
          {1}
        </p>
        <button className='cursor-pointer'>
          <Plus size={20} strokeWidth={1.2} />
        </button>
      </div>
      <Trash2
        size={24}
        strokeWidth={1.2}
        color='red'
        className='cursor-pointer'
        onClick={() => removeFromCart(item)}
      />
    </div>
  );
};

export default CartItem;
