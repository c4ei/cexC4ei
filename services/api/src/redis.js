const Queue = require("bull");
const debug = require("./debug")("Redis");
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_RECEIVER_DEPLOY_QUEUE,
  REDIS_RECEIVER_DB,
  REDIS_WITHDRAWER_QUEUE,
  REDIS_WITHDRAWER_DB,
} = require("./config");

const queues = {
  Forwarder: new Queue(REDIS_RECEIVER_DEPLOY_QUEUE, {
    redis: { host: REDIS_HOST, port: REDIS_PORT, db: REDIS_RECEIVER_DB },
  }),
  Withdrawer: new Queue(REDIS_WITHDRAWER_QUEUE, {
    redis: { host: REDIS_HOST, port: REDIS_PORT, db: REDIS_WITHDRAWER_DB },
  }),
};

async function connect() {
  debug(`Connecting to: ${REDIS_HOST}:${REDIS_PORT}`);

  await queues.Forwarder.isReady();
  await queues.Withdrawer.isReady();

  debug("Connected");
}

module.exports = {
  connect,
  queues,
};
