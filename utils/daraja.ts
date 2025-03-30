const { CONSUMER_KEY, CONSUMER_SECRET } = process?.env;

class DarajaClient {
  private token: string | null;
  private expiresAt: number | null;
  private encodedCredentials: string;

  constructor() {
    this.token = null;
    this.expiresAt = null;
    this.encodedCredentials = this.getEncodedCredentials();
  }

  private getEncodedCredentials(): string {
    const consumerKey = CONSUMER_KEY;
    const clientSecret = CONSUMER_SECRET;
    const encodedCredentials = Buffer.from(
      `${consumerKey}:${clientSecret}`
    ).toString('base64');
    return encodedCredentials;
  }

  async getAuthToken(): Promise<string> {
    if (this.token && this.expiresAt && Date.now() < this.expiresAt) {
      return this.token;
    }
    return await this.requestNewToken();
  }

  private async requestNewToken(): Promise<string> {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${this.encodedCredentials}`);

    try {
      const response = await fetch(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          method: 'GET',
          headers,
        }
      );
      if (!response.ok) throw new Error('Failed to fetch auth token');
      const data: { access_token: string; expires_in: string } =
        await response.json();
      this.token = data.access_token;
      this.expiresAt = Date.now() + parseInt(data.expires_in) * 1000;

      return this.token;
    } catch (error) {
      console.error('Error fetching auth token:', error);
      throw error;
    }
  }

  async sendPaymentRequest(data): Promise<unknown> {
    const {amonunt, }
    const token = await this.getAuthToken();
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');

    const date = new Date();

    const timestamp =
      date.getFullYear().toString() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2);

    const body = JSON.stringify({
      BusinessShortCode: 174379,
      Password:
        'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3',
      Timestamp: '20160216165627',
      TransactionType: 'CustomerPayBillOnline',
      Amount: 1,
      PartyA: 254708374149,
      PartyB: 174379,
      PhoneNumber: 254707819550,
      CallBackURL:
        'https://f750-41-90-186-144.ngrok-free.app/api/payment/callback',
      AccountReference: 'Zitenge',
      TransactionDesc: '70 Pair Rack',
    });

    try {
      const response = await fetch(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          method: 'POST',
          headers,
          body,
        }
      );
      if (!response.ok) throw new Error('Failed to send payment request');
      return await response.json();
    } catch (error) {
      console.error('Error sending payment request:', error);
      throw error;
    }
  }
}

export const darajaClient = new DarajaClient();
