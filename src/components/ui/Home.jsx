import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { PawPrint } from 'lucide-react';

/**
 * 앱 시작 시 보이는 메인 홈페이지 컴포넌트
 * @param {function} onStart - 게임 시작 핸들러
 */
export const Home = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="mb-8 flex flex-col items-center"
      >
        <div className="bg-[#FFF9E6] p-6 rounded-full mb-6 text-[#FFB020] shadow-sm">
          <PawPrint size={64} />
        </div>
        <h1 className="text-4xl md:text-5xl font-[Jua] text-gray-800 mb-4 leading-tight">
          아빠와 함께하는<br/>동물 10고개
        </h1>
        <p className="text-gray-500 text-lg md:text-xl">
          아빠가 들려주는 힌트를 듣고<br/>어떤 동물인지 맞혀보세요!
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xs"
      >
        <Button variant="primary" fullWidth onClick={onStart} className="h-16 text-xl shadow-lg">
          게임 시작하기 🚀
        </Button>
      </motion.div>
    </div>
  );
};
