import * as Sentry from '@sentry/react';

function init() {
  Sentry.init({
    dsn: 'https://36f85c18d396a04a506ca74e09bd3a9f@o4506778815430656.ingest.us.sentry.io/4509682071961600',
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = { init, log };
export default logger;
