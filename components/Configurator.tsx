'use client'
import { useState, useEffect } from 'react';
import { MoveRight } from 'lucide-react';
import { v4 as uuid } from 'uuid';

import { Color, Rack, useCustomization, CartItem } from '@/contexts/Customization';
import { getRacks } from '@/utils/actions/rack.actions';
import { getColors } from '@/utils/actions/colors.action';
import Image from 'next/image';



const Configurator = () => {
  const {
    shelfColor,
    setShelfColor,
    frameColor,
    setFrameColor,
    selectedRack,
    setSelectedRack,
    addToCart,
  } = useCustomization();

  const [price, setPrice] = useState<number>(0);
  const [shoeRacks, setShoeRacks] = useState<Rack[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [racksRes, colorsRes] = await Promise.all([getRacks(), getColors()]);

      if (racksRes.success) {
        setShoeRacks(racksRes.racks as Rack[]);
      } else {
        console.error('Failed to fetch racks:', racksRes.message);
      }

      if (colorsRes.success) {
        setColors(colorsRes.colors as Color[]);
      } else {
        console.error('Failed to fetch colors:', colorsRes.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const calculateCost = (selectedRack: Rack, shelfColor: Color, frameColor: Color): number => {
    if (!selectedRack) throw new Error('Invalid rack selected.');

    let priceType: keyof typeof selectedRack.price;

    if (
      shelfColor?.name.toLowerCase() === 'rustic' &&
      frameColor?.name.toLowerCase() === 'rustic'
    ) {
      priceType = 'rustic';
    } else if (
      shelfColor?.name.toLowerCase() !== 'rustic' &&
      frameColor?.name.toLowerCase() !== 'rustic'
    ) {
      priceType = 'painted';
    } else {
      priceType = 'combined';
    }

    return selectedRack.price[priceType] ?? 0;
  };

  const handleAddToCart = () => {
    if (!selectedRack || !shelfColor || !frameColor) {
      alert('Please select a rack, shelf color, and frame color before adding to the cart.');
      return;
    }

    if (!selectedRack.id) {
      alert('Invalid rack selected.');
      return;
    }

    const uniqueId = uuid();

    const cartItem: CartItem = {
      id: uniqueId,
      shoeRackId: selectedRack.id,
      rack: selectedRack,
      shelfColor: shelfColor,
      frameColor: frameColor,
      quantity: 1,
      price,
      name: selectedRack.name,
      design: "solid",
    };

    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const screenshots: Record<string, string> = JSON.parse(localStorage.getItem('screenshots') || '{}');
      screenshots[uniqueId] = dataUrl;
      localStorage.setItem('screenshots', JSON.stringify(screenshots));
    }

    addToCart(cartItem);
  };

  useEffect(() => {
    if (selectedRack && shelfColor && frameColor) {
      setPrice(calculateCost(selectedRack, shelfColor, frameColor));
    }
  }, [selectedRack, shelfColor, frameColor]);

  const { length = 0, levels = 0 } = selectedRack || {};
  const height = (levels - 1) * 21;

  return !loading && (
    <div className='flex flex-col text-black text-wrap h-full w-[90%] md:h-fit md:w-4/12 whitespace-nowrap  gap-3 md:gap-4  px-4 pt-4 pb-12 md:px-6 md:mx-8 bg-white border-solid md:border-[1px] rounded-2xl md:mr-8  md:overflow-hidden'>
      <div className=''>
        <h2 className='text-lg font-bold'>Handcrafted Shoe Rack</h2>
        <p className='text-xs md:text-sm my-1 text-black/80'>
          Configure your shoe rack to fit your needs. The shoe rack comes with a
          solid wood with a collapsible frame. <br /> Dimensions:{' '}
          <span className='text-xs font-semibold mt-1'>
            Length {length}cm × Height {height}cm × Depth {32}cm{' '}
          </span>
        </p>
        <div className='flex flex-col gap-2'>
          <h2 className='text-base font-semibold'>Size</h2>
          <div className='flex gap-3 flex-wrap text-sm font-medium select-none'>


            {shoeRacks?.map((rack, index) => (
              <div
                key={index}
                onClick={() => setSelectedRack(rack)}
                className={`w-18 h-8 border-solid border-[1px] rounded cursor-pointer px-3 items-center content-center  ${selectedRack?.name === rack.name
                  ? 'bg-slate-800 text-white'
                  : 'hover:bg-slate-300 text-black/55'
                  }`}
              >
                {rack.name}
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-base font-semibold'>Shelf </h2>
        <div className='flex justify-between gap-2'>
          <div className='flex gap-2 flex-wrap'>
            {colors.map((color, index) => (
              <div
                key={index}
                className={`relative flex flex-col text-sm gap-1 items-center justify-center h-9 w-9 rounded-full border-slate-800 ${shelfColor?.hex !== color?.hex ? '' : 'border-[1px]'
                  } `}
              >
                <div
                  key={index}
                  className={` ${shelfColor?.hex !== color?.hex ? 'h-7 w-7' : 'h-6 w-6'
                    }  rounded-full cursor-pointer border-slate-800 border-[1px]`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setShelfColor(color)}
                ></div>
              </div>
            ))}
          </div>
          <label className='content-center text-sm font-normal'>
            {shelfColor?.name}
          </label>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-base font-semibold'>Frame </h2>
        <div className='flex justify-between gap-2'>
          <div className='flex gap-2 flex-wrap'>
            {colors.map((color, index) => (
              <div
                key={index}
                className={`relative flex flex-col text-sm gap-1 items-center justify-center h-9 w-9 rounded-full border-slate-800 ${frameColor?.hex !== color?.hex ? '' : 'border-[1px]'
                  } `}
              >
                <div
                  key={index}
                  className={` ${frameColor?.hex !== color?.hex ? 'h-7 w-7' : 'h-6 w-6'
                    }  rounded-full cursor-pointer border-slate-800 border-[1px]`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setFrameColor(color)}
                ></div>
              </div>
            ))}
          </div>
          <label className='content-center text-sm font-normal'>
            {frameColor?.name}
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-2 w-full md:mt-auto md:mb-4'>
        <div className='flex flex-col w-full justify-between'>
          <h2 className='text-base'>
            Price: &nbsp;
            <span className='text-normal font-bold '>Ksh. {price}</span>
          </h2>
        </div>
        <button
          onClick={handleAddToCart}
          className='flex justify-evenly items-center select-none w-full md:w-[70%] mx-auto h-10 bg-cyan-700 text-sm text-white text-center rounded cursor-pointer content-center'
        >
          Add to cart
          <MoveRight size={32} strokeWidth={1.2} />
        </button>
        <div className='flex justify-evenly '>
          <div className='flex text-xs gap-2 items-center'>
            <Image src='/images/truck.svg' width={20} height={20} alt='Delivery' /> Affordable delivery
            cost
          </div>
          <div className='flex text-xs gap-1 items-center'>
            <Image src='/images/calendar.svg' width={20} height={20} alt='Shipping' /> Ships in 1-2 weeks
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;


