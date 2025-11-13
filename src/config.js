onst DEFAULT_LIMIT = 10;

const config = {
  defaultLimit: Number.parseInt(process.env.XING_DEFAULT_LIMIT, 10) || DEFAULT_LIMIT,
  baseUrl: process.env.XING_BASE_URL || 'https://api.example-xing.com',
  apiKey: process.env.XING_API_KEY || null
};

module.exports = { config };