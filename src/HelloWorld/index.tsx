import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";

/**
 * HelloWorld 컴포지션
 *
 * <AbsoluteFill>
 *   - position: absolute; inset: 0 와 동일
 *   - 영상 전체를 채우는 컨테이너
 *
 * <Sequence from={N}>
 *   - N 프레임부터 자식 컴포넌트를 보여줌
 *   - 자식 내부에서 useCurrentFrame()은 Sequence 시작점부터 0으로 리셋됨
 *   - durationInFrames를 주면 해당 구간에만 렌더링됨
 */
export const HelloWorld: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* 0프레임부터 Title 표시 */}
      <Sequence from={0}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Title />
          <Subtitle />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
