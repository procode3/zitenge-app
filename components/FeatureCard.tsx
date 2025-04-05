import { Truck, DraftingCompass, Award, ChevronsDownUp } from 'lucide-react';

const icons = {
  Truck: Truck,
  DraftingCompass: DraftingCompass,
  Award: Award,
  ChevronsDownUp: ChevronsDownUp,
};

function FeatureCard(props) {
  const { icon, title, description } = props;
  const IconComponent = icons[icon];
  return (
    <div className='flex flex-col gap-5 w-full border shadow-md border-slate-900/40  rounded p-5 md:p-10 items-center text-center'>
      <div className='w-20 h-20 relative rounded-full bg-slate-400/60 my-4'>
        <IconComponent
          strokeWidth={1.2}
          className={`w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
        />
      </div>
      <h3 className='text-[1rem] font-semibold'>{title}</h3>
      <p className='text-black/65 text-md'>{description}</p>
    </div>
  );
}

export default FeatureCard;
