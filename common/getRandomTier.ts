export const getRandomTier = () => {
  const randomValue = Math.random();

  if (randomValue < 0.1) {
    return 'epic';
  } else if (randomValue < 0.4) {
    return 'rare';
  } else {
    return 'normal';
  }
};
