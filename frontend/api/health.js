export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'UP',
    service: 'Aitharaju Sri Charan Portfolio Backend API (Production Edge)',
    version: '1.0.0',
    activeProfile: 'prod',
    timestamp: new Date().toISOString()
  });
}
