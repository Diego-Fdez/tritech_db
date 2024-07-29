export const filterRecentTemperatures = (temperaturesData: any) => {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

  return temperaturesData.filter((obj: any) => {
    const createdAt = new Date(obj.createdAt);
    return createdAt >= thirtyMinutesAgo && createdAt <= now;
  });
};
