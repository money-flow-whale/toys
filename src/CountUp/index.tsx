import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * CountUp 컴포지션 - 숫자 카운트업 애니메이션
 *
 * 핵심 개념:
 *   interpolate + Easing
 *     - Easing 함수로 애니메이션 속도 곡선을 제어
 *     - Easing.out(Easing.cubic) → 처음엔 빠르고 끝에서 느려짐
 *     - Easing.bezier(x1, y1, x2, y2) → CSS cubic-bezier와 동일
 *
 *   Math.round()로 소수점 없는 정수 표시
 */
export const CountUp: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const TARGET = 1000;

  // 0 → durationInFrames-30 프레임 구간에서 0 → 1000으로 카운트업
  // Easing.out(Easing.expo): 빠르게 시작해서 끝에서 천천히 멈춤
  const count = interpolate(
    frame,
    [0, durationInFrames - 30],
    [0, TARGET],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.expo),
    }
  );

  // 배경색도 프레임에 따라 변화 (hue 회전)
  const hue = interpolate(frame, [0, durationInFrames], [220, 280]);

  // 텍스트 스케일: 숫자가 커질수록 살짝 확대
  const scale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)), // 약간 튀는 효과
  });

  return (
    <AbsoluteFill
      style={{
        background: `hsl(${hue}, 60%, 10%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 160,
          fontWeight: "bold",
          color: `hsl(${hue + 40}, 90%, 70%)`,
          transform: `scale(${scale})`,
          lineHeight: 1,
        }}
      >
        {Math.round(count).toLocaleString()}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: 32,
          color: "rgba(255,255,255,0.6)",
          marginTop: 24,
        }}
      >
        목표까지 달성!
      </div>
    </AbsoluteFill>
  );
};
