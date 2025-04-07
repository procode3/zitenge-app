"use client"

import { useState } from 'react';

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HexColorPicker } from "react-colorful";
import { createColor } from '@/utils/actions/colors.action';
import { Plus } from "lucide-react";
const colorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    hex: z.string().regex(/^#([0-9A-F]{6})$/i, "Invalid hex code"),
});

export default function ColorFormDialog({ color, setColors, existingColors }) {
    const [open, setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(colorSchema),
        defaultValues: color || { name: "", hex: "#ffffff" },
    });

    async function handleSubmit(values) {
        if (existingColors.some(c => c.hex.toUpperCase() === values.hex.toUpperCase())) {
            form.setError("hex", { type: "manual", message: "Hex code must be unique" });
            return;
        }

        const res = await createColor(values);
        if (res?.success) {
            setOpen(false);
            setColors([
                ...existingColors,
                ...res?.results
            ]);

        } else {
            form.setError("hex", { type: "manual", message: res?.message || "Failed to add color" });
        }


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">{!color && <Plus size={16} />} {color ? "Edit" : "Add New Color"}</Button>
            </DialogTrigger>
            <DialogContent className="p-4">
                <DialogTitle>Add New Color</DialogTitle>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => {
                        handleSubmit(values);
                        if (form.formState.isValid) {
                            document.getElementById("close-dialog")?.click();
                        }
                    })} className="flex flex-col gap-3">
                        <FormField name="name" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Name</FormLabel>
                                <FormControl><Input className="w-full text-sm p-1" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name="hex" control={form.control} render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="text-sm">Pick Color</FormLabel>
                                <FormControl className='flex mx-auto'>
                                    <HexColorPicker color={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="text-sm">Hex Color Code</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full text-sm p-1 mt-2"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        maxLength={7}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
