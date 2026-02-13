// Affiliate Link Tracker & Redirect
// Endpoint: /api/go?broker=mrg|exness|valetax|fundingpips|the5ers|didimax|hfm|fbs

import { AFFILIATE_LINKS } from '../constants';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const broker = url.searchParams.get('broker');
  
  const links: Record<string, string> = {
    mrg: AFFILIATE_LINKS.mrg,
    exness: AFFILIATE_LINKS.exness,
    valetax: AFFILIATE_LINKS.valetax,
    fundingpips: AFFILIATE_LINKS.fundingPips,
    the5ers: AFFILIATE_LINKS.the5ers,
    didimax: AFFILIATE_LINKS.didimax,
    hfm: AFFILIATE_LINKS.hfm,
    fbs: AFFILIATE_LINKS.fbs,
  };

  // Track click (would integrate with KV in production)
  const timestamp = new Date().toISOString();
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  
  // Log click (in production, save to Vercel KV)
  console.log(`[TRACK] ${timestamp} | ${broker} | ${ip} | ${userAgent}`);

  // Redirect to affiliate link
  const targetUrl = links[broker || ''];
  
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Invalid broker' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return Response.redirect(targetUrl, 302);
}
