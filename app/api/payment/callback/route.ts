import { NextResponse } from 'next/server';
// import { getPrisma } from '@/utils/prisma';
// import { darajaClient } from '@/utils/daraja';

export const runtime = 'edge';

interface responseProps {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}
export async function POST(request: Request) {
  const body: responseProps = await request.json();

  console.log('callback response', body);

  return NextResponse.json({
    status: 'success',
    response: body,
  });
}
