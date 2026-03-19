// api/items.js — Vercel Serverless Function
// Beží na Vercel serveroch → žiadny CORS problém z prehliadača

export default async function handler(req, res) {
  const { slot_type, required_class, page } = req.query;

  try {
    const apiUrl = `https://api.darkerdb.com/v1/items?slot_type=${slot_type}&usable_by=${required_class}&page=${page || 1}`;
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error(`DarkerDB error: ${response.status}`);

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.status(200).json(data);

  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Failed to fetch', details: error.message });
  }
}
