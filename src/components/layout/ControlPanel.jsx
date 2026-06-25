import React from 'react';
import { Button } from '../ui/Button';

/**
 * 하단 고정 컨트롤 패널 컴포넌트
 * 아빠가 한 손으로 폰을 잡고 조작하기 편하도록(Thumb Zone) 화면 하단에 고정됩니다.
 */
export const ControlPanel = ({
  userInput,
  setUserInput,
  onSubmit,
  onForcePass,
  onGiveUp,
  onNextHint,
  isAllRevealed
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 z-20 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      
      {/* 다음 힌트 보기 버튼 (가장 누르기 편한 위치, 모든 힌트가 나오면 숨김) */}
      {!isAllRevealed && (
        <div className="mb-3">
          <Button variant="secondary" fullWidth onClick={onNextHint} className="shadow-md h-12 text-base">
            다음 힌트 보기 👆
          </Button>
        </div>
      )}

      {/* 정답 입력 영역 */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="동물 이름을 적어주세요"
          className="flex-1 min-w-0 h-14 px-4 rounded-full bg-gray-100 border-2 border-transparent focus:border-[#FFB020] focus:bg-white outline-none text-lg font-bold transition-colors"
        />
        <Button variant="primary" onClick={onSubmit} className="shrink-0 w-24">
          확인
        </Button>
      </div>

      {/* 보조 버튼 영역 (아빠 재량 통과, 모르겠어요) */}
      <div className="flex gap-2 h-14">
        <Button variant="ghost" fullWidth onClick={onGiveUp} className="text-[#FF6B6B]">
          모르겠어요
        </Button>
        <Button 
          variant="ghost" 
          fullWidth 
          onClick={onForcePass} 
          className="text-[#2EC4B6] flex flex-col justify-center items-center h-full py-1 leading-tight text-sm md:text-base whitespace-nowrap"
        >
          <span>우리아이</span>
          <span>정답 인정!</span>
        </Button>
      </div>
    </div>
  );
};
