'use client'
import { useState, useEffect } from 'react';
import { MoveRight } from 'lucide-react';
import { v4 as uuid } from 'uuid';


import { useCustomization } from '@/contexts/Customization';
import { getRacks } from '@/utils/actions/rack.actions';
import { getColors } from '@/utils/actions/colors.action';

// const shoeRacks = [
//   {
//     name: '12 Pair',
//     length: 65,
//     levels: 6,
//     price: {
//       rustic: 3500,
//       painted: 4200,
//       combined: 4000,
//     },
//   },
//   {
//     name: '18 Pair',
//     length: 72,
//     levels: 6,
//     price: {
//       rustic: 4500,
//       painted: 5500,
//       combined: 5000,
//     },
//   },
//   {
//     name: '24 Pair',
//     length: 90,
//     levels: 6,
//     price: {
//       rustic: 5300,
//       painted: 6500,
//       combined: 6000,
//     },
//   },
//   {
//     name: '30 Pair',
//     length: 110,
//     levels: 6,
//     price: {
//       rustic: 7500,
//       painted: 8500,
//       combined: 8000,
//     },
//   },
//   {
//     name: '40 Pair',
//     length: 110,
//     levels: 8,
//     price: {
//       rustic: 8500,
//       painted: 10000,
//       combined: 9000,
//     },
//   },
//   {
//     name: '50 Pair',
//     length: 110,
//     levels: 10,
//     price: {
//       rustic: 11000,
//       painted: 13000,
//       combined: 12000,
//     },
//   },
//   {
//     name: '60 Pair',
//     length: 130,
//     levels: 10,
//     price: {
//       rustic: 13000,
//       painted: 15000,
//       combined: 14000,
//     },
//   },
//   {
//     name: '70 Pair',
//     length: 150,
//     levels: 10,
//     price: {
//       rustic: 15000,
//       painted: 17000,
//       combined: 16000,
//     },
//   },
// ];


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


  const [price, setPrice] = useState(0);
  const [shoeRacks, setShoeRacks] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [racksRes, colorsRes] = await Promise.all([getRacks(), getColors()]);

      if (racksRes.success) {
        console.log(racksRes.racks);
        setShoeRacks(racksRes.racks);
      } else {
        console.error('Failed to fetch racks:', racksRes.message);
      }

      if (colorsRes.success) {
        setColors(colorsRes.colors);
      } else {
        console.error('Failed to fetch colors:', colorsRes.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);


  const calculateCost = (selectedRack, shelfColor, frameColor) => {
    if (!selectedRack) {
      throw new Error('Invalid rack selected.');
    }

    let priceType;

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
    return selectedRack.price[priceType] || 0;
  };

  const handleAddToCart = () => {
    if (!selectedRack || !shelfColor || !frameColor) {
      alert(
        'Please select a rack, shelf color, and frame color before adding to the cart.'
      );

      return;
    }

    const uniqueId = uuid(); // Generate a unique UUID for each cart item


    if (!selectedRack.id) {
      alert('Invalid rack selected.');
      return;
    }
    const cartItem = {
      id: uniqueId, // Use the UUID as the unique ID for the cart item
      shoeRackId: selectedRack.id,
      rack: selectedRack.name,
      shelfColor: shelfColor.name,
      frameColor: frameColor.name,
      quantity: 1,
      price,
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    const canvas = document.querySelector('canvas');
    const dataUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let screenshots = JSON.parse(localStorage.getItem('screenshots')) || {};
    screenshots[uniqueId] = dataUrl;
    localStorage.setItem('screenshots', JSON.stringify(screenshots));
    console.log(screenshots);

    addToCart(cartItem);
  };

  useEffect(() => {
    setPrice(calculateCost(selectedRack, shelfColor, frameColor));
  }, [selectedRack, shelfColor, frameColor]);

  const { length, levels } = selectedRack;
  const height = (levels - 1) * 21;

  return (
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
                className={`relative flex flex-col text-sm gap-1 items-center justify-center h-9 w-9 rounded-full border-slate-800 ${shelfColor?.color !== color?.color ? '' : 'border-[1px]'
                  } `}
              >
                <div
                  key={index}
                  className={` ${shelfColor?.name !== color?.name ? 'h-7 w-7' : 'h-6 w-6'
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
                className={`relative flex flex-col text-sm gap-1 items-center justify-center h-9 w-9 rounded-full border-slate-800 ${frameColor?.color !== color?.color ? '' : 'border-[1px]'
                  } `}
              >
                <div
                  key={index}
                  className={` ${frameColor?.name !== color?.name ? 'h-7 w-7' : 'h-6 w-6'
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
            <img src='/images/truck.svg' alt='Delivery' /> Affordable delivery
            cost
          </div>
          <div className='flex text-xs gap-1 items-center'>
            <img src='/images/calendar.svg' alt='Shipping' /> Ships in 1-2 weeks
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
