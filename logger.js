const {
    createLogger,
    format: { combine, printf },
    transports,
} = require('winston');

const loggerFormat = combine(
    printf(({ level, meta = {} }) => {  
      const { message, details, req = {} } = meta;
      const { headers = {}, path, hostname, user = {}, userAgent, accessPermissions } = req;
  
      return JSON.stringify({
        timestamp: Date.now(),
        correlationId: headers['x-coreplatform-correlationid'],
        log: {
          level,
          message,
          details,
        },
        requestContext: {
          tokenType: user.tokenType,
          userId: user.userid,
          host: hostname,
          accessPermissions: accessPermissions,
          userAgent,
          path,
        },
      });
    })
);
  
const logger = createLogger({
    format: loggerFormat,
    transports: [new transports.Console()],
});

module.exports = logger;