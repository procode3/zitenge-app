
// import DashCard from '@/components/DashCard';
import { SectionCards } from '@/components/section-cards';

// const dashSummary = [
//   {
//     title: 'Total Revenue',
//     summary: '$11,234',
//     icon: '💰',
//   },
//   {
//     title: 'Pending Orders',
//     summary: '567',
//     icon: '📦',
//   },
//   {
//     title: 'Total Expenses',
//     summary: '$12,345',
//     icon: '💰',
//   },
// ];

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

        <SectionCards />
        {/* <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" /> */}
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>

    </div>


  )
}
