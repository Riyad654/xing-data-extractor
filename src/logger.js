function formatTimestamp(date = new Date()) {
  return date.toISOString();
}

function log(level, message) {
  const ts = formatTimestamp();
  const line = `[${ts}] [${level.toUpperCase()}] ${message}`;
  if (level === 'error' || level === 'warn') {
    console.error(line);
  } else {
    console.log(line);
  }
}

const logger = {
  info(msg) {
    log('info', msg);
  },
  warn(msg) {
    log('warn', msg);
  },
  error(msg) {
    log('error', msg);
  },
  debug(msg) {
    if (process.env.DEBUG === '1' || process.env.DEBUG === 'true') {
      log('debug', msg);
    }
  }
};

module.exports = { logger };