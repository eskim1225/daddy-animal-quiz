import React from 'react';
import { motion } from 'framer-motion';

/**
 * 범용 둥근 버튼 컴포넌트
 * @param {string} variant - 색상 테마 ('primary', 'secondary', 'accent', 'ghost')
 * @param {boolean} fullWidth - 가로 길이 100% 채울지 여부
 * @param {React.ReactNode} children - 버튼 내용
 * @param {function} onClick - 클릭 핸들러
 * @param {string} className - 추가 클래스명
 */
export const Button = ({
  variant = 'primary',
  fullWidth = false,
  children,
  onClick,
  className = '',
  ...props
}) => {
  // 테마에 따른 배경색과 텍스트색 매핑
  const variantStyles = {
    primary: 'bg-[#FFB020] text-gray-900', // 노란색 메인 버튼
    secondary: 'bg-[#2EC4B6] text-white', // 민트색 보조 버튼
    accent: 'bg-[#FF6B6B] text-white', // 산호색 강조/오답 버튼
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 border border-gray-200'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex items-center justify-center
        h-14 px-6 rounded-full font-bold text-lg
        transition-colors duration-200 shadow-sm
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};
