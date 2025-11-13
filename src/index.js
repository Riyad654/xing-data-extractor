onst { parseCliArgs } = require('./utils/cliArgs');
const { logger } = require('./logger');
const { extract } = require('./services/extractor');
const { config } = require('./config');

async function main() {
try {
const args = parseCliArgs(process.argv.slice(2));

if (args.help) {
printHelp();
process.exit(0);
}

if (!args.type || !args.query) {
logger.error('Both --type and --query are required. Use --help for usage.');
process.exitCode = 1;
return;
}

const limit = Number.isFinite(args.limit) ? args.limit : config.defaultLimit;
const format = args.format || 'json';

logger.info(
`Starting extraction | type=${args.type} query="${args.query}" limit=${limit} format=${format}`
);

const data = await extract({
type: args.type,
query: args.query,
limit
});

if (format === 'json') {
// Pretty-print JSON result
process.stdout.write(JSON.stringify(data, null, 2) + '\n');
} else if (format === 'table') {
printTable(data);
} else {
logger.warn(`Unknown format "${format}", falling back to JSON.`);
process.stdout.write(JSON.stringify(data, null, 2) + '\n');
}

logger.info('Extraction completed successfully.');
} catch (err) {
logger.error(`Extraction failed: ${err.message}`);
logger.debug(err.stack || 'No stack trace available.');
process.exitCode = 1;
}
}

function printHelp() {
const helpText = `
XING Data Extractor (demo)

Usage:
node src/index.js --type <profiles|jobs|companies|communities> --query "<search term>" [--limit N] [--format json|table]

Options:
--type      The entity type to extract.
--query     Search term or filter keyword.
--limit     Maximum number of items to return (default: ${config.defaultLimit}).
--format    Output format: "json" (default) or "table".
--help      Show this help message.

Examples:
node src/index.js --type profiles --query "software engineer" --limit 5
node src/index.js --type jobs --query "data analytics" --format table
`;
process.stdout.write(helpText.trim() + '\n');
}

function printTable(items) {
if (!Array.isArray(items) || items.length === 0) {
process.stdout.write('No results.\n');
return;
}

const headers = Object.keys(items[0]);
const rows = items.map((item) => headers.map((h) => String(item[h] ?? '')));

const colWidths = headers.map((h, i) =>
Math.max(h.length, ...rows.map((r) => r[i].length))
);

const renderRow = (cols) =>
cols
.map((c, i) => c.padEnd(colWidths[i], ' '))
.join(' | ')
.trimEnd();

process.stdout.write(renderRow(headers) + '\n');
process.stdout.write(
colWidths.map((w) => '-'.repeat(w)).join('-+-') + '\n'
);

for (const row of rows) {
process.stdout.write(renderRow(row) + '\n');
}
}

// Run only if this file is executed directly
if (require.main === module) {
main();
}