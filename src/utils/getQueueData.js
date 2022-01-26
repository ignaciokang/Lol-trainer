const cache = require("memory-cache");
const { getQueuesJson } = require("../services");
const { isInCache } = require("../services");
const { TIME_IN_MILISECONDS } = require("../constants");

const getQueueData = async (queueId) => {
  try {
    if (isInCache(`queueId-${queueId}`)) {
      return cache.get(`queueId-${queueId}`);
    }

    const { queuesJson } = await getQueuesJson();
    for (let queue in queuesJson) {
      if (queuesJson[queue].queueId == queueId) {
        cache.put(
          `queueId-${queueId}`,
          queuesJson[queue],
          TIME_IN_MILISECONDS.SIX_WEEK
        );
        return queuesJson[queue];
      }
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getQueueData };
