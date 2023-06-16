import redis from '@/config/redis';

export const useCache = async (key: string, cb: () => Promise<unknown>) => {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);
  const newData = await cb();
  await redis.set(key, JSON.stringify(newData), {
    EX: 300,
  });
  return newData;
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};
