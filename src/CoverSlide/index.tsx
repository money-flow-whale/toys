import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const CoverSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── 배경 라인 애니메이션 (0~20프레임: 왼쪽에서 오른쪽으로)
  const lineWidth = interpolate(frame, [0, 20], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ── 메인 타이틀: 스프링으로 아래→위 슬라이드인 (10프레임 딜레이)
  const titleY = spring({
    frame: frame - 10,
    fps,
    from: 50,
    to: 0,
    config: { damping: 14, stiffness: 80 },
  });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── 서브 타이틀: 타이틀보다 15프레임 늦게 등장
  const subtitleY = spring({
    frame: frame - 25,
    fps,
    from: 30,
    to: 0,
    config: { damping: 14, stiffness: 80 },
  });
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── 하단 장식선: 35프레임부터 오른쪽으로 확장
  const decorLineWidth = interpolate(frame, [35, 55], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0D1B2A",         // 딥 네이비
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 120,
        flexDirection: "column",
      }}
    >
      {/* 상단 강조선 */}
      <div
        style={{
          width: `${lineWidth}%`,
          height: 4,
          background: "linear-gradient(90deg, #4F8EF7, #A78BFA)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* 연도 태그 */}
      <div
        style={{
          opacity: titleOpacity,
          fontFamily: "sans-serif",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 6,
          color: "#4F8EF7",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        FY 2026
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 64,
          fontWeight: 800,
          color: "#FFFFFF",
          margin: 0,
          lineHeight: 1.2,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        사업 전략 방향 공유
      </h1>

      {/* 서브 타이틀 */}
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 28,
          fontWeight: 400,
          color: "#A78BFA",
          margin: "20px 0 0",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: 1,
        }}
      >
        더 많이가 아니라, 더 잘 운영하는 성장
      </p>

      {/* 하단 장식선 */}
      <div
        style={{
          width: decorLineWidth,
          height: 2,
          background: "linear-gradient(90deg, #4F8EF7 0%, transparent 100%)",
          marginTop: 40,
        }}
      />

      {/* 우측 배경 도형 (정적) */}
      <div
        style={{
          position: "absolute",
          right: -80,
          top: "50%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
