import React from "react";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { CountUp } from "./CountUp";

/**
 * Root.tsx: 모든 동영상 컴포지션을 등록하는 곳
 *
 * <Composition> 주요 props:
 *   id         - 컴포지션 식별자 (렌더링 시 사용)
 *   component  - 실제 React 컴포넌트
 *   durationInFrames - 총 프레임 수 (fps × 초)
 *   fps        - 초당 프레임 수 (보통 30 또는 60)
 *   width      - 영상 가로 픽셀
 *   height     - 영상 세로 픽셀
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 예제 1: 텍스트 페이드인 + 슬라이드 애니메이션 (3초) */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={90} // 30fps × 3초
        fps={30}
        width={1280}
        height={720}
      />

      {/* 예제 2: 숫자 카운트업 애니메이션 (5초) */}
      <Composition
        id="CountUp"
        component={CountUp}
        durationInFrames={150} // 30fps × 5초
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
