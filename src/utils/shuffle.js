/**
 * Fisher-Yates 셔플 알고리즘을 사용하여 배열을 무작위로 섞습니다.
 * 원본 배열을 수정하지 않고 새로운 배열을 반환합니다.
 * @param {Array} array 섞을 원본 배열
 * @returns {Array} 무작위로 섞인 새로운 배열
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
