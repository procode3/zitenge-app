"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { verifyAction } from '@/utils/actions/token.actions';

const PaymentPage: React.FC = () => {
    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(100); // Example amount
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null); // For storing the token
    const searchParams = useSearchParams()
    const [data, setData] = useState<{ orderId: string; paymentMethod: string; amount: number } | null>(null);

    // Fetch the token from the URL when the page loads
    useEffect(() => {
        setLoading(true);
        const token = searchParams.get('token');
        if (!token) return;

        setToken(token);

        const decodeToken = async () => {
            try {
                const { orderId, paymentMethod, amount } = await verifyAction(token);
                console.log('Decoded token:', { orderId, paymentMethod, amount });
                if (orderId && paymentMethod && amount) {
                    setData({
                        orderId,
                        paymentMethod,
                        amount
                    });
                    setSelectedGateway(paymentMethod);
                    setAmount(amount);
                } else {
                    console.error('Incomplete token payload');
                }
            } catch (err) {
                console.error('Token verification failed:', err);
            }
        };

        decodeToken();
        setLoading(false);
    }, [searchParams]);


    const handlePayment = async () => {
        if (!selectedGateway || !token) {
            alert('Please select a payment method and ensure the token is present!');
            return;
        }

        setLoading(true);

        try {
            if (selectedGateway === 'mpesa') {
                // Handle MPESA payment
                await handleMpesaPayment(amount);
            } else if (selectedGateway === 'card') {
                // Handle card payment
                await handleCardPayment(amount);
            }
            alert('Payment successful!');
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed, please try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleMpesaPayment = async (amount: number) => {
        console.log('Processing MPESA payment of', amount);
        return new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    };

    const handleCardPayment = async (amount: number) => {
        console.log('Processing Card payment of', amount);
        return new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    };

    return (
        <div className="max-w-lg mx-auto p-6 my-8 bg-muted rounded-lg shadow-md ">
            <h2 className="text-xl font-bold text-center mb-2">Complete Your Payment</h2>

            {data ? (
                <div className="flex justify-center items-center p-4 bg-muted">
                    <Card className="w-full max-w-md shadow-md">
                        <CardHeader>
                            <CardTitle>Secure Payment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Order ID</Label>
                                <Input value={data.orderId} disabled />
                            </div>
                            <div>
                                <Label>Payment Method</Label>
                                <Input value={data?.paymentMethod.toUpperCase()} disabled />
                            </div>
                            <div>
                                <Label>Amount</Label>
                                <Input value={`KES ${data?.amount.toFixed(2)}`} disabled />
                            </div>
                            <Button onClick={handlePayment} className="w-full">
                                {loading ? `Processing ... ` : `Pay Now`}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading payment details...</p>
            )}
        </div>
    );
};

export default PaymentPage;
