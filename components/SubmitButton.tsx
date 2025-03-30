import { forwardRef, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const SubmitButton = forwardRef(({ paymentMethod }, ref) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useFormContext();

    const onConfirm = (data) => {
        console.log("Payment Data:", data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button ref={ref} className="bg-blue-500 text-white" disabled={!paymentMethod}>
                    Pay Now
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{paymentMethod} Payment</DialogTitle>
                    <DialogDescription>Fill in the details to complete your payment.</DialogDescription>
                </DialogHeader>

                {/* Different Forms Based on Payment Method */}
                <form onSubmit={handleSubmit(onConfirm)} className="space-y-4">
                    {paymentMethod === "MPESA" && (
                        <div>
                            <label className="block font-medium">Confirm Phone Number</label>
                            <Input {...register("mpesaPhone")} placeholder="+254712345678" />
                        </div>
                    )}
                    {paymentMethod === "Card" && (
                        <div>
                            <label className="block font-medium">Card Number</label>
                            <Input {...register("cardNumber")} placeholder="1234 5678 9012 3456" />
                            <label className="block font-medium mt-2">CVV</label>
                            <Input {...register("cvv")} placeholder="123" type="password" />
                        </div>
                    )}
                    {paymentMethod === "Google Pay" && (
                        <div>
                            <label className="block font-medium">Google Pay Email</label>
                            <Input {...register("gpayEmail")} placeholder="elon@x.com" />
                        </div>
                    )}

                    <div className="flex justify-end gap-4 mt-4">
                        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Confirm Payment</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
});

SubmitButton.displayName = 'confirmButton'

export default SubmitButton;
