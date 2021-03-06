module.exports = {
  serverHost: process.env.SERVER_HOST || "0.0.0.0",
  serverPort: process.env.SERVER_PORT || 5000,
  twistedConfig: {
    /**
     * If api response is 429 (rate limits) try reattempt after needed time (default true)
     */
    rateLimitRetry: true,
    /**
     * Number of time to retry after rate limit response (default 1)
     */
    rateLimitRetryAttempts: 1,
    /**
     * Concurrency calls to riot (default infinity)
     * Concurrency per method (example: summoner api, match api, etc)
     */
    //concurrency: undefined,
    /**
     * Riot games api key
     */
    key: process.env.RIOT_API_KEY,
    /**
     * Debug methods
     */
    debug: {
      /**
       * Log methods execution time (default false)
       */
      logTime: true,
      /**
       * Log urls (default false)
       */
      logUrls: true,
      /**
       * Log when is waiting for rate limits (default false)
       */
      logRatelimit: true,
    },
  },
};
