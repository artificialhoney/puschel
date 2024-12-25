export const pinoOptions = (name: string) => {
  return {
    name,
    level: process.env['NODE_ENV'] !== 'production' ? 'debug' : 'info',
    transport:
      process.env['NODE_ENV'] !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l',
              ignore: 'context,pid,hostname,req,res,responseTime',
            },
          }
        : undefined,
  };
};
