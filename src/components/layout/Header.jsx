import React from 'react';
import { PawPrint } from 'lucide-react';

/**
 * 상단 헤더 컴포넌트
 * 타이틀과 현재 진행 중인 문제의 진척도(프로그레스 바)를 보여줍니다.
 * @param {number} currentIndex - 현재 문제 번호 (0부터 시작)
 * @param {number} totalCount - 전체 문제 개수
 */
export const Header = ({ currentIndex, totalCount }) => {
  // 진척도 퍼센트 계산
  const progressPercent = totalCount > 0 ? ((currentIndex + 1) / totalCount) * 100 : 0;

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[#FFB020]">
          <PawPrint size={28} />
          <h1 className="text-xl font-[Jua] text-gray-800 m-0 leading-none pt-1">
            아빠와 동물 10고개
          </h1>
        </div>
        <div className="font-bold text-[#2EC4B6]">
          {currentIndex + 1} / {totalCount}
        </div>
      </div>
      
      {/* 프로그레스 바 영역 */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#2EC4B6] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
