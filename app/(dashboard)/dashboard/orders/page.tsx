import {
    ListFilter,
    Plus,
    SearchIcon,
} from "lucide-react"

import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 14400,
            status: "pending",
            email: "am@example.com",
        },
        {
            id: "728ed52f",
            amount: 12200,
            status: "pending",
            email: "bm@example.com",
        },
    ]
}

async function Orders() {
    const data = await getData()
    return (
        <>
            <div>
                <h2 className='text-xl font-semibold'>Manage Orders</h2>
                <p className='text-sm  text-gray-500'>Manage your active and pending orders.</p>
            </div>

            <div className='flex items-center justify-between py-4 space-between'>
                <h2 className='font-semibold'>All Orders &#40;{2}&#41;</h2>
                <div className='w-1/2 flex items-center justify-evenly space-between'>
                    <Label className='flex relative items-center space-x-2'>
                        <SearchIcon className="" />
                        <Input placeholder='Search orders ...' className='w-52' />
                    </Label>

                    <Button variant="outline" size={'default'} >
                        <ListFilter /> Filters
                    </Button>
                    <Button variant="outline" size={'default'} >
                        <Plus /> Add Order
                    </Button>
                </div>
            </div>
            <div className="container mx-auto">
                <DataTable columns={columns} data={data} />
            </div>
        </>

    )
}

export default Orders