import React from 'react';
import { motion } from 'framer-motion';

/**
 * 개별 힌트를 표시하는 카드 컴포넌트
 * @param {string} text - 힌트 텍스트
 * @param {boolean} acting - 아빠 연기 가이드 여부
 * @param {number} index - 힌트 번호 (애니메이션 딜레이 등에 활용 가능)
 */
export const HintCard = ({ text, acting, index }) => {
  // acting이 true일 경우, 텍스트에서 괄호 안의 연기 가이드를 분리하기 위한 간단한 파싱
  const parts = text.split(/(?=\()/g); // '(' 앞에서 문자열 분리

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 25 
      }}
      className="bg-white/80 backdrop-blur-sm p-5 rounded-[24px] shadow-sm border border-gray-100 mb-3"
    >
      <div className="flex gap-3">
        {/* 힌트 번호 표시 */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFF9E6] flex items-center justify-center text-[#FFB020] font-bold">
          {index + 1}
        </div>
        
        {/* 힌트 내용 렌더링 */}
        <div className="flex-1 pt-1">
          {parts.map((part, i) => {
            if (part.startsWith('(')) {
              return (
                <span key={i} className="block text-[#636E72] text-sm mt-1">
                  {part}
                </span>
              );
            }
            return (
              <span key={i} className="font-bold text-gray-800 text-xl md:text-2xl leading-snug">
                {part}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
