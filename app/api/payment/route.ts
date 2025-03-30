import { NextResponse } from 'next/server';
// import { getPrisma } from '@/utils/prisma';
import { darajaClient } from '@/utils/daraja';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    const response = await darajaClient.sendPaymentRequest();

    return NextResponse.json({
      status: 'success',
      response: response,
    });
  } catch (error) {
    console.error('An error occured', error);
    return NextResponse.json({
      status: 'Fail',
      response: 'Server error occured',
    });
  }
}
