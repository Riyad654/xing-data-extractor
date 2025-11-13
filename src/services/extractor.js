onst {
searchProfiles,
searchJobs,
searchCompanies,
searchCommunities
} = require('./xingApiClient');
const { logger } = require('../logger');

/**
* High-level extraction orchestrator.
* Decides which entity type to fetch and normalizes the results.
*/

async function extract({ type, query, limit }) {
const normalizedType = String(type || '').toLowerCase();

logger.info(
`Extractor invoked | type=${normalizedType} query="${query}" limit=${limit}`
);

switch (normalizedType) {
case 'profiles':
case 'profile':
return searchProfiles(query, limit);
case 'jobs':
case 'job':
return searchJobs(query, limit);
case 'companies':
case 'company':
return searchCompanies(query, limit);
case 'communities':
case 'community':
return searchCommunities(query, limit);
default: {
const msg = `Unsupported type "${type}". Valid types: profiles, jobs, companies, communities.`;
logger.error(msg);
throw new Error(msg);
}
}
}

module.exports = { extract };