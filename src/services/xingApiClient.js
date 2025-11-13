onst { logger } = require('../logger');
const { config } = require('../config');

/**
* Simulated XING-like API client.
* In a real implementation this would perform network requests against an API
* or scrape HTML pages. Here we return realistic sample data asynchronously.
*/

function simulateDelay(ms = 150) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchProfiles(query, limit) {
logger.debug(
`Simulated request: GET ${config.baseUrl}/profiles?query=${encodeURIComponent(
query
)}&limit=${limit}`
);
await simulateDelay();

const sample = [
{
id: 'prof_1',
name: 'Anna Schmidt',
title: 'Senior Software Engineer',
location: 'Berlin, Germany',
industry: 'Information Technology',
headline: 'Building scalable web platforms'
},
{
id: 'prof_2',
name: 'Lukas Weber',
title: 'Data Scientist',
location: 'Munich, Germany',
industry: 'Financial Services',
headline: 'Turning data into business value'
},
{
id: 'prof_3',
name: 'Maria Keller',
title: 'Product Manager',
location: 'Hamburg, Germany',
industry: 'E-commerce',
headline: 'Driving growth with customer insight'
}
];

return filterByQuery(sample, query, limit);
}

async function searchJobs(query, limit) {
logger.debug(
`Simulated request: GET ${config.baseUrl}/jobs?query=${encodeURIComponent(
query
)}&limit=${limit}`
);
await simulateDelay();

const sample = [
{
id: 'job_1',
title: 'Full-Stack Engineer (Node.js/React)',
company: 'TechBridge GmbH',
location: 'Berlin, Germany',
employmentType: 'Full-time',
link: 'https://example.com/jobs/1'
},
{
id: 'job_2',
title: 'Data Analyst',
company: 'FinData AG',
location: 'Frankfurt, Germany',
employmentType: 'Full-time',
link: 'https://example.com/jobs/2'
},
{
id: 'job_3',
title: 'DevOps Engineer',
company: 'Cloudify AG',
location: 'Remote',
employmentType: 'Contract',
link: 'https://example.com/jobs/3'
}
];

return filterByQuery(sample, query, limit);
}

async function searchCompanies(query, limit) {
logger.debug(
`Simulated request: GET ${config.baseUrl}/companies?query=${encodeURIComponent(
query
)}&limit=${limit}`
);
await simulateDelay();

const sample = [
{
id: 'comp_1',
name: 'TechBridge GmbH',
industry: 'Software',
size: '51-200 employees',
location: 'Berlin, Germany'
},
{
id: 'comp_2',
name: 'FinData AG',
industry: 'Financial Services',
size: '201-500 employees',
location: 'Frankfurt, Germany'
},
{
id: 'comp_3',
name: 'Cloudify AG',
industry: 'Cloud Computing',
size: '11-50 employees',
location: 'Remote'
}
];

return filterByQuery(sample, query, limit);
}

async function searchCommunities(query, limit) {
logger.debug(
`Simulated request: GET ${config.baseUrl}/communities?query=${encodeURIComponent(
query
)}&limit=${limit}`
);
await simulateDelay();

const sample = [
{
id: 'com_1',
name: 'JavaScript Professionals DACH',
members: 8532,
topic: 'JavaScript, Node.js, front-end, back-end'
},
{
id: 'com_2',
name: 'Data & AI Germany',
members: 12987,
topic: 'Data science, machine learning, analytics'
},
{
id: 'com_3',
name: 'Product Management Europe',
members: 6421,
topic: 'Product strategy, roadmaps, UX'
}
];

return filterByQuery(sample, query, limit);
}

function filterByQuery(items, query, limit) {
const q = (query || '').toLowerCase();
const filtered = items.filter((item) =>
Object.values(item).some((val) =>
String(val).toLowerCase().includes(q)
)
);
return filtered.slice(0, limit);
}

module.exports = {
searchProfiles,
searchJobs,
searchCompanies,
searchCommunities
};