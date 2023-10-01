export const getRandomCardNormalPack = () => {
  const randomValue = Math.random();

  if (randomValue < 0.05) {
    return 'epic';
  } else if (randomValue < 0.2) {
    return 'rare';
  } else {
    return 'normal';
  }
};

export const getRandomCardUniquePack = () => {
  const randomValue = Math.random();
  if (randomValue < 0.25) {
    return 'epic';
  } else if (randomValue < 0.3) {
    return 'rare';
  } else {
    return 'normal';
  }
};

export const getRandomCardEpicPack = () => {
  const randomValue = Math.random();
  if (randomValue < 0.1) {
    return 'epic';
  } else if (randomValue < 0.4) {
    return 'rare';
  } else {
    return 'normal';
  }
};

export const getCardTier = (label: string) => {
  let result;
  switch (label) {
    case 'epic':
      result = getRandomCardEpicPack();
      break;
    case 'unique':
      result = getRandomCardUniquePack();
      break;
    default:
      result = getRandomCardNormalPack();
      break;
  }
  return result;
};
