"use client"

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Trash2, Pencil, LoaderCircle } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ColorFormDialog from '@/components/ColorFormDialog'
import { DialogTitle } from '@radix-ui/react-dialog';

import { getColors, deleteColor } from '@/utils/actions/colors.action'
import { addRack, getRacks, deleteRack } from '@/utils/actions/rack.actions'
import { Color, Rack } from '@/contexts/Customization';


const rackSchema = z.object({
    name: z.string().min(1, "Name is required"),
    length: z.number().min(1, "Length must be positive"),
    levels: z.number().min(1, "Levels must be positive"),
    price: z.object({
        rustic: z.number().min(1, "Rustic price must be positive"),
        painted: z.number().min(1, "Painted price must be positive"),
        combined: z.number().min(1, "Combined price must be positive"),
    }),
});


export default function ConfiguratorSettings() {
    const [shoeRacks, setShoeRacks] = useState<Rack[]>([]);
    const [editingRack, setEditingRack] = useState<Rack & { index: number } | null>(null);
    const [isPending, startTransition] = useTransition();
    const [pendingId, setPendingId] = useState<string>("");
    const [open, setOpen] = useState(false)
    const [colors, setColors] = useState<Color[]>([]);

    const form = useForm({
        resolver: zodResolver(rackSchema),
        defaultValues: {
            name: "12 Pair",
            length: 60,
            levels: 8,
            price: { rustic: 5000, painted: 4500, combined: 6000 },
        },
    });


    async function handleSubmit(values: {
        name: string;
        length: number;
        levels: number;
        price: {
            rustic: number;
            painted: number;
            combined: number;
        };
    }) {
        const res = await addRack(values)

        if (res?.success && res?.results) {
            setOpen(false);
            setShoeRacks([...shoeRacks, res?.results]);
        } else {
            alert("Adding rack failed, an error occured")
        }

    }


    function updateShoeRack(index: number, updatedRack: Rack) {
        const updatedRacks: Rack[] = [...shoeRacks];
        updatedRacks[index] = updatedRack;
        setShoeRacks(updatedRacks as Rack[]);
        setEditingRack(null);
    }




    useEffect(() => {
        async function fetchData() {
            try {
                // Wait for both promises to resolve
                const [colorsRes, racksRes] = await Promise.all([getColors(), getRacks()]);

                // Handle colors and racks results
                if (colorsRes?.success) {

                    setColors(colorsRes?.colors as Color[]);
                }
                if (racksRes?.success) {

                    setShoeRacks(racksRes?.racks as Rack[]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);



    const handleDelete = (id: string) => {
        setPendingId(id);
        startTransition(async () => {
            const res = await deleteColor(id);
            if (res?.success) {
                setColors(colors.filter((color) => color?.id !== id));
            }
            setPendingId("");
        });
    };

    const handleRackDelete = async (id: string) => {
        setPendingId(id);
        startTransition(async () => {
            const res = await deleteRack(id);
            if (res?.success) {
                setShoeRacks(shoeRacks.filter((rack) => rack?.id !== id));
            }
            setPendingId("");
        });
    }


    // function updateColor(index: number, updatedColor: Color) {
    //     console.log(updatedColor)
    //     const updatedColors = [...colors];
    //     updatedColors[index] = updatedColor;
    //     setColors(updatedColors);
    // }


    return (
        <>
            <div className="p-6 overflow-auto">
                <h2 className="text-lg font-semibold">Shoe Rack Management</h2>
                <p className='text-sm  text-gray-500'>Manage shoeracks and colors that appear on the configurator page.</p>
                <div className="mb-4 flex justify-end">
                    <Dialog open={open} onOpenChange={setOpen}>

                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2"><Plus size={16} /> Add New Rack</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[90%] max-w-md h-auto p-6 flex flex-col gap-4">
                            <DialogTitle> Add New Shoe Rack</DialogTitle>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
                                    <FormField name="name" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-sm">Name</FormLabel>
                                                <FormControl><Input className="w-2/3 text-sm p-1"  {...field} /></FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="length" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-sm">Length</FormLabel>
                                                <FormControl><Input className="w-2/3 text-sm p-1" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="levels" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-sm">Levels</FormLabel>
                                                <FormControl><Input className="w-2/3 text-sm p-1" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="price.rustic" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-sm">Rustic Price</FormLabel>
                                                <FormControl><Input className="w-2/3 text-sm p-1" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="price.painted" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-sm">Painted Price</FormLabel>
                                                <FormControl><Input className="w-2/3 text-sm p-1" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="price.combined" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-sm">Combined Price</FormLabel>
                                                <FormControl><Input className="w-2/3 text-sm p-1" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <Button type="submit" className="mt-2">Save</Button>

                                </form>
                            </Form>
                        </DialogContent>

                    </Dialog>
                </div>
                <Table className=''>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead>Name</TableHead>
                            <TableHead>Length (cm)</TableHead>
                            <TableHead>Levels</TableHead>
                            <TableHead>Rustic Price</TableHead>
                            <TableHead>Painted Price</TableHead>
                            <TableHead>Combined Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shoeRacks && shoeRacks?.map((rack, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                                <TableCell>{rack.name}</TableCell>
                                <TableCell>{rack.length}</TableCell>
                                <TableCell>{rack.levels}</TableCell>
                                <TableCell>{rack.price.rustic}</TableCell>
                                <TableCell>{rack.price.painted}</TableCell>
                                <TableCell>{rack.price.combined}</TableCell>
                                <TableCell className="flex gap-1">
                                    <Dialog>
                                        <DialogTrigger asChild className=' ' onClick={() => setEditingRack({ ...rack, index } as Rack & { index: number })}>
                                            <Pencil size={16} className='my-auto' />
                                        </DialogTrigger>
                                        <DialogContent>

                                            {editingRack && (

                                                <>
                                                    <DialogTitle> Edit Shoe Rack</DialogTitle>
                                                    <Input placeholder="Name" value={editingRack.name} onChange={(e) => setEditingRack({ ...editingRack, name: e.target.value })} />
                                                    <Input placeholder="Length" type="number" value={editingRack.length} onChange={(e) => setEditingRack({ ...editingRack, length: parseInt(e.target.value) })} />
                                                    <Input placeholder="Levels" type="number" value={editingRack.levels} onChange={(e) => setEditingRack({ ...editingRack, levels: parseInt(e.target.value) })} />
                                                    <Input placeholder="Rustic Price" type="number" value={editingRack.price.rustic} onChange={(e) => setEditingRack({ ...editingRack, price: { ...editingRack.price, rustic: parseInt(e.target.value) } })} />
                                                    <Input placeholder="Painted Price" type="number" value={editingRack.price.painted} onChange={(e) => setEditingRack({ ...editingRack, price: { ...editingRack.price, painted: parseInt(e.target.value) } })} />
                                                    <Input placeholder="Combined Price" type="number" value={editingRack.price.combined} onChange={(e) => setEditingRack({ ...editingRack, price: { ...editingRack.price, combined: parseInt(e.target.value) } })} />
                                                    <DialogClose asChild>
                                                        <Button onClick={() => updateShoeRack(editingRack.index, editingRack)} className="mt-2">Save</Button>
                                                    </DialogClose>
                                                </>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="destructive" disabled={isPending && pendingId === rack.id}>
                                                {isPending && pendingId === rack.id ? <span className="animate-spin" ><LoaderCircle /></span> : <Trash2 size={16} />}
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogTitle className=" font-semibold mb-2">Confirm Deletion</AlertDialogTitle>
                                            <p>Are you sure you want to delete {rack.name} rack?</p>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleRackDelete(rack.id)} >Delete</AlertDialogAction>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="p-6 space-y-4  overflow-auto">
                <h2 className="text-lg font-bold">Manage Colors</h2>
                <div className='flex justify-end'>
                    <ColorFormDialog
                        color={null}
                        setColors={setColors}
                        existingColors={colors}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 ">
                    {colors.map((color, index) => (
                        <div key={index} className="p-4 rounded-lg flex items-center justify-between border border-cyan-700 border-2" style={{ backgroundColor: color.hex }}>
                            <span className="text-white shadow-md font-medium">{color.name}</span>
                            <span className="text-white shadow-md font-medium">{color.hex}</span>
                            <div className="flex gap-2">
                                <ColorFormDialog
                                    key={index}
                                    color={color}
                                    setColors={setColors}
                                    existingColors={colors}
                                />
                                <Button size="icon" variant="destructive" onClick={() => handleDelete(color.id)}
                                    disabled={isPending && pendingId === color.id}>  {isPending && pendingId === color.id ? <span className="animate-spin" ><LoaderCircle /></span> : < Trash2 />}</Button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </>


    );
}


