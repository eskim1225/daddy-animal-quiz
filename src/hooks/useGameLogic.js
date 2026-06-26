import { useState, useEffect, useCallback } from 'react';
import { animalData } from '../data/animals';
import { shuffleArray } from '../utils/shuffle';
import { triggerSuccessConfetti } from '../utils/confetti';

export const useGameLogic = () => {
  // 전체 동물을 섞어둔 대기열
  const [animalQueue, setAnimalQueue] = useState([]);
  // 현재 출제 중인 동물 인덱스 (대기열에서의 위치)
  const [currentIndex, setCurrentIndex] = useState(0);
  // 현재 문제에서 노출된 힌트 개수 (1개부터 시작)
  const [revealedHintsCount, setRevealedHintsCount] = useState(1);
  // 사용자가 입력한 정답
  const [userInput, setUserInput] = useState('');
  
  // 모달/진행 상태: 'home', 'playing', 'correct', 'wrong', 'giveup', 'finished'
  const [gameState, setGameState] = useState('home');

  // 앱이 처음 로드될 때 동물을 섞어서 대기열에 넣되, 시작은 하지 않음
  useEffect(() => {
    initQueue();
  }, []);

  // 단순 큐 초기화 (Home 화면용)
  const initQueue = useCallback(() => {
    // 1. 미사용 동물(isActive: false) 필터링
    const activeAnimals = animalData.filter(animal => animal.isActive !== false);
    
    // 2. 각 동물의 힌트들을 개별 객체의 hintOrder 속성에 맞게 오름차순 정렬 (Sort)
    const processedAnimals = activeAnimals.map(animal => {
      // 원본 데이터를 손상시키지 않기 위해 얕은 복사 후 정렬
      const reorderedHints = [...animal.hints].sort((a, b) => {
        // 방어 코드: hintOrder가 없을 경우 맨 뒤로 가도록 큰 숫자(99) 할당
        const orderA = a.hintOrder ?? 99;
        const orderB = b.hintOrder ?? 99;
        return orderA - orderB;
      });

      return {
        ...animal,
        hints: reorderedHints
      };
    });

    // 3. 전처리된 데이터를 섞어줍니다.
    const shuffled = shuffleArray(processedAnimals);
    setAnimalQueue(shuffled);
    setCurrentIndex(0);
    setRevealedHintsCount(1);
    setUserInput('');
  }, []);

  // 게임 진짜 시작 (Home 화면에서 호출)
  const startGame = useCallback(() => {
    setGameState('playing');
  }, []);

  // 다시 시작하기 (결과 화면에서 호출)
  const startNewGame = useCallback(() => {
    initQueue();
    setGameState('playing');
  }, [initQueue]);

  const currentAnimal = animalQueue[currentIndex] || null;
  const isLastAnimal = currentIndex === animalQueue.length - 1;

  // 다음 문제로 넘어가는 함수
  const nextProblem = useCallback(() => {
    if (isLastAnimal) {
      setGameState('finished');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setRevealedHintsCount(1);
    setUserInput('');
    setGameState('playing');
  }, [isLastAnimal]);

  // 다음 힌트 보기
  const showNextHint = useCallback(() => {
    if (currentAnimal && revealedHintsCount < currentAnimal.hints.length) {
      setRevealedHintsCount((prev) => prev + 1);
    }
  }, [currentAnimal, revealedHintsCount]);

  // 정답 제출 처리
  const submitAnswer = useCallback(() => {
    if (!currentAnimal || !userInput.trim()) return;

    const answerStr = userInput.trim().toLowerCase();
    const isCorrect = 
      answerStr === currentAnimal.name.toLowerCase() || 
      currentAnimal.synonyms.some(syn => syn.toLowerCase() === answerStr);

    if (isCorrect) {
      triggerSuccessConfetti();
      setGameState('correct');
    } else {
      setGameState('wrong');
    }
  }, [currentAnimal, userInput]);

  // 우리아이 정답 인정 (강제 통과)
  const forcePass = useCallback(() => {
    triggerSuccessConfetti();
    setGameState('correct');
  }, []);

  // 모르겠어요 (포기)
  const giveUp = useCallback(() => {
    setGameState('giveup');
  }, []);

  // 오답 시 계속하기
  const continuePlaying = useCallback(() => {
    setGameState('playing');
    setUserInput(''); // 입력창 초기화
  }, []);

  return {
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
    totalCount: animalQueue.length,
    currentIndex
  };
};
