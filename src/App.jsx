import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { Header } from './components/layout/Header';
import { HintBoard } from './components/game/HintBoard';
import { ControlPanel } from './components/layout/ControlPanel';
import { ResultModal } from './components/ui/ResultModal';
import { Home } from './components/ui/Home';

function App() {
  const {
    currentAnimal,
    revealedHintsCount,
    userInput,
    setUserInput,
    gameState,
    showNextHint,
    submitAnswer,
    forcePass,
    giveUp,
    nextProblem,
    continuePlaying,
    startNewGame,
    startGame,
    totalCount,
    currentIndex
  } = useGameLogic();

  return (
    <div className="w-full max-w-[480px] mx-auto h-[100dvh] bg-[#F8FAFA] shadow-2xl relative flex flex-col overflow-hidden">
      {gameState === 'home' ? (
        <Home onStart={startGame} />
      ) : (
        <>
          {/* 1. 상단 헤더 영역 */}
          <Header currentIndex={currentIndex} totalCount={totalCount} />

          {/* 2. 메인 게임 보드 (스크롤 영역) */}
          <HintBoard 
            currentAnimal={currentAnimal}
            revealedHintsCount={revealedHintsCount}
          />

          {/* 3. 하단 컨트롤 패널 (Thumb Zone) */}
          <ControlPanel 
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={submitAnswer}
            onForcePass={forcePass}
            onGiveUp={giveUp}
            onNextHint={showNextHint}
            isAllRevealed={currentAnimal ? revealedHintsCount >= currentAnimal.hints.length : true}
          />

          {/* 4. 결과 알림 모달 */}
          <ResultModal 
            gameState={gameState}
            animal={currentAnimal}
            onNext={nextProblem}
            onContinue={continuePlaying}
            onRestart={startNewGame}
          />
        </>
      )}
    </div>
  );
}

export default App;
