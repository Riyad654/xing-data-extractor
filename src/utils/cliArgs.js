js/**
 * Very small CLI argument parser tailored to this tool.
 *
 * Supports:
 *   --type <value>
 *   --query "<value>"
 *   --limit <number>
 *   --format <json|table>
 *   --help
 */

function parseCliArgs(argv) {
  const result = {
    type: null,
    query: null,
    limit: null,
    format: null,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      result.help = true;
      continue;
    }

    if (!arg.startsWith('--')) {
      // Ignore unknown positional arguments
      continue;
    }

    const key = arg.slice(2);
    const next = argv[i + 1];

    switch (key) {
      case 'type':
        if (next && !next.startsWith('--')) {
          result.type = next;
          i += 1;
        }
        break;
      case 'query':
        if (next && !next.startsWith('--')) {
          result.query = next;
          i += 1;
        }
        break;
      case 'limit':
        if (next && !next.startsWith('--')) {
          const n = Number.parseInt(next, 10);
          if (!Number.isNaN(n) && n > 0) {
            result.limit = n;
          }
          i += 1;
        }
        break;
      case 'format':
        if (next && !next.startsWith('--')) {
          result.format = next;
          i += 1;
        }
        break;
      default:
        // Unknown flag; ignore silently to keep UX simple.
        break;
    }
  }

  return result;
}

module.exports = { parseCliArgs };