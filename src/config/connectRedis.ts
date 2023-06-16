import redis from './redis';

const connectRedis = async () => {
  redis.on('error', error => console.log('Redis Client Error', error));
  await redis.connect();
};

export default connectRedis;
