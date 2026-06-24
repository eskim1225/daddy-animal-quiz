import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

/**
 * 정답 / 오답 / 포기 결과 화면을 보여주는 모달 컴포넌트
 * @param {string} gameState - 게임 상태 ('playing', 'correct', 'wrong', 'giveup', 'finished')
 * @param {object} animal - 현재 동물 데이터
 * @param {function} onNext - 다음 문제로 넘어가기 핸들러
 * @param {function} onContinue - 오답 시 계속하기 핸들러
 * @param {function} onRestart - 모든 문제가 끝난 후 다시 시작하기 핸들러
 */
export const ResultModal = ({
  gameState,
  animal,
  onNext,
  onContinue,
  onRestart
}) => {
  if (gameState === 'playing') return null;

  const isFinished = gameState === 'finished';
  const isCorrect = gameState === 'correct';
  const isGiveup = gameState === 'giveup';
  
  // 모달에 표시될 제목과 메시지 결정
  let title = '';
  let message = '';
  let actionBtn = null;

  if (isFinished) {
    title = '🎉 모든 동물을 만났어요! 🎉';
    message = '정말 잘했어요! 아빠와 또 다른 동물들을 만나볼까요?';
    actionBtn = <Button variant="primary" fullWidth onClick={onRestart}>처음부터 다시하기</Button>;
  } else if (isCorrect) {
    title = '정답입니다! 👏';
    message = `정답은 "${animal?.name}" 였어요!`;
    actionBtn = <Button variant="secondary" fullWidth onClick={onNext}>다음 동물 만나러 가기</Button>;
  } else if (isGiveup) {
    title = '아쉽지만 괜찮아요! 😊';
    message = `정답은 "${animal?.name}" 였어요! 다음에 꼭 맞출 수 있을 거예요.`;
    actionBtn = <Button variant="secondary" fullWidth onClick={onNext}>다음 동물 만나러 가기</Button>;
  } else {
    // wrong (오답)
    title = '앗, 아쉽게도 틀렸어요 😢';
    message = '다른 동물을 생각해볼까요? 힌트를 더 확인해 보세요!';
    actionBtn = <Button variant="accent" fullWidth onClick={onContinue}>다시 풀어보기</Button>;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-sm rounded-[24px] shadow-xl overflow-hidden flex flex-col"
        >
          {/* 동물 이미지 영역 (정답이거나 포기한 경우에만 표시) */}
          {(isCorrect || isGiveup) && animal?.imageUrl && (
            <div className="w-full h-48 bg-gray-100 relative">
              <img 
                src={animal.imageUrl} 
                alt={animal.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 text-center space-y-4">
            <h2 className="text-2xl font-[Jua] text-gray-800">{title}</h2>
            <p className="text-gray-600 text-lg">{message}</p>
            
            <div className="pt-4">
              {actionBtn}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
