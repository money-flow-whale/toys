import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/**
 * Subtitle 컴포넌트
 *
 * interpolate 예제:
 *   - 10~40 프레임 구간에서 왼쪽(-200px)에서 제자리(0)로 슬라이드인
 *   - extrapolateLeft: "clamp" → 10프레임 이전에는 -200 고정
 */
export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();

  const translateX = interpolate(frame, [10, 40], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <p
      style={{
        fontFamily: "sans-serif",
        fontSize: 36,
        color: "#aad4f5",
        textAlign: "center",
        opacity,
        transform: `translateX(${translateX}px)`,
        margin: "16px 0 0",
      }}
    >
      React로 동영상을 코드로 만들어보세요
    </p>
  );
};
