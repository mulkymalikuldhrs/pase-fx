// Click Tracking API
// Endpoint: /api/track

export const config = {
  runtime: 'edge',
};

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
    const { event, broker, page, metadata = {} } = body;
    
    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const referer = req.headers.get('referer') || 'direct';

    // Log tracking data
    const trackData = {
      timestamp,
      event,
      broker,
      page,
      ip,
      userAgent,
      referer,
      metadata
    };

    console.log('[TRACK]', JSON.stringify(trackData));

    // In production, save to Vercel KV
    // await kv.set(`track:${timestamp}`, JSON.stringify(trackData));

    return new Response(JSON.stringify({
      success: true,
      message: 'Tracked successfully'
    }), { headers });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to track'
    }), { headers, status: 500 });
  }
}
