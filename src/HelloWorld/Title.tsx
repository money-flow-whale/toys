import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * Title 컴포넌트
 *
 * 핵심 훅:
 *   useCurrentFrame()  - 현재 프레임 번호 (0부터 시작)
 *   useVideoConfig()   - fps, width, height, durationInFrames 접근
 *
 * 핵심 함수:
 *   interpolate(frame, [inputRange], [outputRange])
 *     - 프레임 값을 다른 범위의 값으로 매핑 (CSS transition과 유사)
 *
 *   spring({ frame, fps, config })
 *     - 스프링 물리 기반 애니메이션 (튀어오르는 느낌)
 */
export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0~20 프레임: 투명 → 불투명 (페이드인)
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp", // 범위 벗어나면 고정
  });

  // 스프링 애니메이션: 아래에서 위로 튀어오르기
  const translateY = spring({
    frame,
    fps,
    from: 60,   // 시작 위치 (픽셀)
    to: 0,      // 끝 위치 (픽셀)
    config: {
      damping: 12,   // 감쇠 (높을수록 덜 튐)
      stiffness: 100, // 강성 (높을수록 빠름)
    },
  });

  return (
    <h1
      style={{
        fontFamily: "sans-serif",
        fontSize: 80,
        color: "white",
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
        margin: 0,
      }}
    >
      Hello, Remotion!
    </h1>
  );
};
