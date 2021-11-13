const Queue = require("bull");
const debug = require("./debug")("Redis");
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_RECEIVER_DB,
  REDIS_RECEIVER_DEPLOYED_QUEUE,
  REDIS_RECEIVER_DEPLOY_QUEUE,
} = require("./config");

const queues = {
  Deploy: new Queue(REDIS_RECEIVER_DEPLOY_QUEUE, {
    redis: { host: REDIS_HOST, port: REDIS_PORT, db: REDIS_RECEIVER_DB },
  }),
  Deployed: new Queue(REDIS_RECEIVER_DEPLOYED_QUEUE, {
    redis: { host: REDIS_HOST, port: REDIS_PORT, db: REDIS_RECEIVER_DB },
  }),
};

async function connect() {
  debug(`Connecting to: ${REDIS_HOST}:${REDIS_PORT}`);

  await queues.Deploy.isReady();
  await queues.Deployed.isReady();

  debug("Connected");
}

module.exports = {
  connect,
  queues,
};
