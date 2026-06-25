import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HintCard } from './HintCard';

// 대체용 기본 이미지 (오류 발생 시 물음표 아이콘 표시)
const FALLBACK_IMAGE = 'https://placehold.co/400x400/eeeeee/999999?text=?';

/**
 * 힌트 목록이 표시되는 스크롤 영역 컴포넌트
 */
export const HintBoard = ({ currentAnimal, revealedHintsCount }) => {
  const scrollRef = useRef(null);

  // 힌트가 역순(새 힌트가 위로)으로 쌓이므로, 가장 상단으로 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [revealedHintsCount, currentAnimal]);

  if (!currentAnimal) return null;

  // 드러난 힌트만 추출하고, 가장 최신 힌트가 위에 오도록 역순(reverse) 정렬
  const revealedHints = currentAnimal.hints.slice(0, revealedHintsCount).map((hint, idx) => ({
    ...hint,
    originalIndex: idx
  })).reverse();

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 pb-4 relative flex flex-col" 
      ref={scrollRef}
    >
      <AnimatePresence mode="popLayout">
        {revealedHints.map((hint) => (
          <motion.div
            key={`${currentAnimal.id}-hint-${hint.originalIndex}`}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-3 shrink-0"
          >
            <HintCard 
              text={hint.text} 
              acting={hint.acting} 
              index={hint.originalIndex} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
