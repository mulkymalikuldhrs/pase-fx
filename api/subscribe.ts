// Newsletter Subscription API
// Endpoint: /api/subscribe
// Integrates with Buttondown or other newsletter service

export const config = {
  runtime: 'edge',
};

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

export default async function handler(req: Request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers,
      status: 405
    });
  }

  try {
    const body = await req.json();
    const { email, name, source = 'website' } = body;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Valid email required'
      }), { headers, status: 400 });
    }

    // Log subscription
    console.log(`[SUBSCRIBE] ${email} | ${name} | ${source} | ${new Date().toISOString()}`);

    // In production with Buttondown:
    if (BUTTONDOWN_API_KEY) {
      const response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          notes: `Name: ${name}, Source: ${source}`,
          tags: ['pase-fx', source]
        })
      });

      if (!response.ok) {
        throw new Error('Buttondown API error');
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Subscribed successfully'
    }), { headers });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to subscribe'
    }), { headers, status: 500 });
  }
}
