export const EnvConfiguration = () => ({
  env: process.env.NODE_ENV,

  name: process.env.NAME,

  log: {
    level: process.env.LOG_LEVEL,
  },

  http: {
    port: parseInt(process.env.HTTP_PORT as string, 10),
  },

  mongodb: {
    uri: process.env.MONGODB_URI,
  },
});
