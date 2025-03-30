import FeatureCard from './FeatureCard';
import Nav from './Nav';
import NavMobile from './NavMobile';
import Footer from './Footer';

const features = [
  {
    title: 'Customizable Colors',
    description:
      'Design your desired shoe rack from a variety of colors to match your unique style',
    icon: `DraftingCompass`,
  },
  {
    title: 'Affordable Shipping',
    description:
      'We offer affordable country wide shipping on all orders within 1-2 weeks',
    icon: `Truck`,
  },
  {
    title: 'Quality Craftsmanship',
    description:
      'Our shoe racks are made from the best quality materials to ensure durability',
    icon: `Award`,
  },
  {
    title: 'Easy Assembly',
    description:
      'Our shoe racks are easy to set up and collapse for easy storage',
    icon: `ChevronsDownUp`,
  },
];

const Home = () => {
  return (
    <div className='font-quicksand flex flex-col items-center content-center h-full w-screen '>
      <section className='flex h-full px-4 md:px-0 md:w-[70%] text-center md:text-left md:py-16  text-black gap-4 justify-evenly md:justify-between flex-wrap-reverse md:flex-nowrap '>
        <div className='flex flex-col justify-evenly  gap-8 h-full items-center md:items-baseline w-full md:w-1/2 '>
          <span className='text-cyan-700 mt-20 text-sm font-semibold md:hidden'>
            Trusted by over 2000+ customers
          </span>
          <h1 className='text-4xl font-semibold leading-tight tracking-wide'>
            Improve the way you organize your shoes with our Handcrafted Shoe
            Racks
          </h1>
          <p className='text-black/65 text-normal'>
            Elevate your space with style and flexibility! Our sleek,
            collapsible shoe racks are as versatile, with customizable colors to
            match your unique vibe.
          </p>

          <NavLink
            type='button'
            to={`/experience`}
            className={`flex group text-nowrap text-center items-center bg-cyan-700 text-white px-8 w-fit  py-2 rounded hover:text-white`}
          >
            Shop Now
          </NavLink>
        </div>
        <div className='hidden md:flex content-center h-1/2 md:h-3/4 filter '>
          <img
            src='/images/rack-hero.png'
            width={200}
            className='rounded-xl'
            alt='Shoe Rack'
          />
        </div>
      </section>
      <section className='flex justify-between flex-wrap  py-16 gap-8 text-black px-4 md:px-0 md:w-[70%] h-full'>
        <div className='flex flex-col gap-4 w-[100%] text-center'>
          <h2 className='text-3xl font-semibold'>
            Why choose Zitenge Shoe Racks?
          </h2>
          <p className='text-black/65 text-sm'>
            We are committed to providing you with the best quality shoe racks
            that are not only functional but also stylish.
          </p>
        </div>

        <div className='flex gap-8  w-full'>
          <div className='flex gap-4 flex-wrap justify-evenly '>
            {features.map((feature) => (
              <FeatureCard {...feature} key={feature.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
