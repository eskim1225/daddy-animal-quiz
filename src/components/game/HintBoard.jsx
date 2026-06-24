import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HintCard } from './HintCard';
import { Button } from '../ui/Button';

/**
 * 힌트 목록이 표시되는 스크롤 영역 컴포넌트
 */
export const HintBoard = ({ currentAnimal, revealedHintsCount, onNextHint }) => {
  const scrollRef = useRef(null);

  // 새로운 힌트가 나타나면 가장 아래로 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [revealedHintsCount, currentAnimal]);

  if (!currentAnimal) return null;

  const revealedHints = currentAnimal.hints.slice(0, revealedHintsCount);
  const showVisualHint = revealedHintsCount >= 5 && currentAnimal.visualHintUrl;
  const isAllRevealed = revealedHintsCount >= currentAnimal.hints.length;

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-4 pb-10 relative" 
      ref={scrollRef}
    >
      <AnimatePresence>
        {revealedHints.map((hint, idx) => (
          <HintCard 
            key={`${currentAnimal.id}-hint-${idx}`} 
            text={hint.text} 
            acting={hint.acting} 
            index={idx} 
          />
        ))}

        {/* 5번째 힌트 이후 시각적 힌트(실루엣) 표시 */}
        {showVisualHint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[200px] mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border-4 border-white"
          >
            <img 
              src={currentAnimal.visualHintUrl} 
              alt="시각적 힌트" 
              className="w-full h-auto opacity-70 sepia-[.3] hue-rotate-15"
            />
            <div className="text-center bg-white p-2 text-sm text-gray-500 font-bold">
              살짝 보여줄게요!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 다음 힌트 보기 버튼 (아직 다 안 열렸을 때만) */}
      {!isAllRevealed && (
        <div className="pt-4 pb-8 flex justify-center">
          <Button variant="secondary" onClick={onNextHint} className="shadow-md">
            다음 힌트 보기 👆
          </Button>
        </div>
      )}
    </div>
  );
};
