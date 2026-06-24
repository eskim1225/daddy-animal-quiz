import confetti from 'canvas-confetti';

/**
 * 정답을 맞췄을 때 화면 전체에 화려한 꽃가루(Confetti) 효과를 발생시킵니다.
 */
export const triggerSuccessConfetti = () => {
  const duration = 3000; // 3초간 지속
  const end = Date.now() + duration;

  const frame = () => {
    // 화면 양쪽에서 쏘아 올리기
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFB020', '#2EC4B6', '#FF6B6B']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFB020', '#2EC4B6', '#FF6B6B']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
