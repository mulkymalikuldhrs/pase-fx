// Signal API - Get latest signals
// Endpoint: /api/signals

import { SIGNALS_DATA } from '../constants';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'public, max-age=60' // Cache for 1 minute
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    // Get query params
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const status = url.searchParams.get('status');
    
    let signals = [...SIGNALS_DATA];
    
    // Filter by status if provided
    if (status) {
      signals = signals.filter(s => s.status === status);
    }
    
    // Limit results
    signals = signals.slice(0, limit);
    
    // Calculate stats
    const stats = {
      total: SIGNALS_DATA.length,
      active: SIGNALS_DATA.filter(s => s.status === 'ACTIVE').length,
      hitTP: SIGNALS_DATA.filter(s => s.status === 'HIT_TP').length,
      hitSL: SIGNALS_DATA.filter(s => s.status === 'HIT_SL').length,
      winRate: Math.round(
        (SIGNALS_DATA.filter(s => s.status === 'HIT_TP').length / 
         SIGNALS_DATA.filter(s => ['HIT_TP', 'HIT_SL'].includes(s.status)).length) * 100
      ) || 0
    };

    return new Response(JSON.stringify({
      success: true,
      data: signals,
      stats,
      timestamp: new Date().toISOString()
    }), { headers });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch signals'
    }), { headers, status: 500 });
  }
}
