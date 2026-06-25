# 아빠와 동물 10고개 서비스 작업 계획서

업데이트된 기획서(`docs/daddy-animal-quiz_기획서.md`) 내용을 반영하여 웹 서비스를 구현하기 위한 구체적인 작업 계획입니다.

## Implementation Notes

- **초기 데이터 구축 분량**: 원활한 테스트를 위해 약 10종의 동물 데이터를 우선 세팅하며, 향후 확장합니다.
- **디자인 테마**: 5~7세 유아 대상이므로 시각적으로 편안하고 부드러운 파스텔 톤과 둥근 모서리를 적용합니다.
- **[추가] UI 최적화**: 아빠가 한 손으로 조작하기 쉽도록 주요 버튼과 입력창을 화면 하단(Thumb Zone)에 고정 배치하고, 힌트 텍스트는 매우 크고 굵게 적용합니다.
- **[추가] 기획 요소 반영**: 아빠 연기 유도(Acting Guide) 힌트, 그리고 아빠 재량으로 통과시키는 '[우리아이 정답 인정!]' 기능이 로직에 포함됩니다. (난이도 조절을 위해 시각적 힌트인 실루엣은 완전 제외됨)

## Proposed Changes

### 1. 프로젝트 구조 및 UI 컴포넌트 설계 (React + Vite)
#### [NEW] `src/App.jsx` (최상위 컨테이너)
- 전체 상태(현재 동물 인덱스, 힌트 진행도, 모달 여부 등)를 관리하는 부모 컴포넌트
- **주요 영역 분리**:
  - `<Header />`: 타이틀 및 진척도(프로그레스 바) 표시 영역
  - `<HintBoard />`: 스크롤 가능한 상단 70% 영역. `Framer Motion`을 활용해 통통 튀며 등장하는 힌트 카드들을 **역순(최신순 최상단 배치)**으로 렌더링.
  - `<ControlPanel />`: 하단 30% 고정(Sticky) 패널. 입력창 및 버튼 모음(Thumb Zone). 버튼 텍스트 잘림 방지 스타일(`shrink-0`) 엄격히 적용.
  - `<ResultModal />`: 정답/오답 결과 화면을 덮는 모달 레이어

### 2. 스타일링 및 애니메이션 (Tailwind CSS + Framer Motion)
#### [MODIFY] `tailwind.config.js` 및 `src/index.css`
- **디자인 가이드 컬러 등록**: primary(Yellow), secondary(Mint), accent(Coral), bg(LightGray) 등 설정.
- **컴포넌트 스타일링**: CSS 파일 대신 Tailwind 유틸리티 클래스를 사용하여 둥근 버튼(`rounded-full`), 글래스모피즘 힌트 카드(`backdrop-blur`) 등을 빠르고 일관되게 구현.
- **인터랙션 및 특수 효과**: 
  - `Framer Motion`: 힌트 카드의 부드러운 등장(`initial/animate`) 효과.
  - `canvas-confetti`: 이벤트 핸들러에서 호출하여 정답 시 축하 파티클 효과 구현.

### 3. 데이터 관리
#### [NEW] `src/data/animals.js`
- 동물 데이터를 배열 형태로 분리하여 관리.
- 데이터 구조 예시:
  ```javascript
  export const animalData = [
    {
      id: 1,
      name: "사자",
      isActive: true, // [신규 요구사항] 문제가 있는 동물 제외용 토글 (false 시 미출제)
      hints: [
        { order: 1, text: "나는 동물의 왕이라고 불려요.", acting: false }, // order: 표시 순서 지정
        { order: 2, text: "크앙~!! (아빠가 무섭게 소리내주세요)", acting: true },
        // ... (총 10개)
      ],
      imageUrl: "https://cdn.pixabay.com/photo/.../lion.jpg" // 403 차단을 막기 위해 Pixabay 등 저작권 프리 CDN 혹은 Wikimedia 절대 주소 사용
    }
  ];
  ```

### 4. 게임 로직 (Hooks 및 상태 관리)
#### [NEW] `src/hooks/useGameLogic.js` (또는 `App.jsx` 내부 상태)
- **상태 관리 (`useState`)**: 
  - `animalQueue`: 중복 출제 방지를 위해 랜덤하게 섞인 전체 동물의 출제 대기열 배열
  - `currentAnimalIndex`: 현재 풀고 있는 문제 번호 (대기열의 현재 인덱스)
  - `revealedHintsCount`: 노출된 힌트 개수 (0~10)
  - `userInput`: 아빠가 입력하는 텍스트 상태
- **주요 이벤트 핸들러**:
  - `handleNextHint()`: 힌트 개수 증가 및 최상단 역순 배치 스크롤.
  - `handleAnswerSubmit()`: 사용자 입력과 정답 텍스트 매칭 확인 및 `canvas-confetti` 호출.
  - `handleForcePass()`: [우리아이 정답 인정!] 클릭 시 강제로 정답 성공 처리.
  - `handleGiveUp()`: [모르겠어요] 클릭 시 오답 모달 표시 후 다음 문제 세팅.
