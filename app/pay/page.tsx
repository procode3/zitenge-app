"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

const PaymentPage: React.FC = () => {
    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(100); // Example amount
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null); // For storing the token
    const searchParams = useSearchParams()

    // Fetch the token from the URL when the page loads
    useEffect(() => {
        const token = searchParams.get('token'); // Extract token from URL query params
        if (token) {
            setToken(token as string); // Set token in state if available
        }
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
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>

            {token ? (
                <div>
                    <p className="mb-4 text-gray-600">Payment Token: {token}</p>

                    <div className="mb-6">
                        <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">
                            Select Payment Method:
                        </label>
                        <select
                            id="payment-method"
                            value={selectedGateway || ''}
                            onChange={(e) => setSelectedGateway(e.target.value)}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">-- Select Payment Method --</option>
                            <option value="mpesa">MPESA</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount:
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            disabled={loading}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading || !selectedGateway}
                        className={`w-full py-2 px-4 rounded-md text-white ${loading || !selectedGateway
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                            } transition-colors`}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading payment details...</p>
            )}
        </div>
    );
};

export default PaymentPage;
