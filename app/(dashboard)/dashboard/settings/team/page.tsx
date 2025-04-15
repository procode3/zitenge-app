import {
    ListFilter,
    Plus,
    SearchIcon,
} from "lucide-react"

// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
//     CommandSeparator,
//     CommandShortcut,
// } from "@/components/ui/command"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Team() {
    return (
        <>
            <div>
                <h2 className='text-xl font-semibold'>User Management</h2>
                <p className='text-sm  text-gray-500'>Manage your team members and their account permission here.</p>
            </div>

            <div className='flex items-center justify-between py-4 space-between'>
                <h2 className='font-semibold'>All Users &#40;{12}&#41;</h2>
                <div className='w-1/2 flex items-center justify-evenly space-between'>
                    <label className='flex relative items-center space-x-2'>
                        <SearchIcon className="" />
                        <Input placeholder='Search users' className='w-52' />
                    </label>

                    <Button variant="outline" size={'default'} >
                        <ListFilter /> Filters
                    </Button>
                    <Button variant="outline" size={'default'} >
                        <Plus /> Add User
                    </Button>
                </div>
            </div>
        </>

    )
}

export default Team