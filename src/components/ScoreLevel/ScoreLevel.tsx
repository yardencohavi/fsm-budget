import React, { useEffect, useState } from "react";
import {
  SvgWrapper,
  SvgElement,
  PathBase,
  PathScore,
  ScoreText,
  Title,
  Highlight,
  Container,
} from "./styles";

interface ScoreLevelProps {
  limit: number;
  color: string;
}

const ScoreLevel: React.FC<ScoreLevelProps> = ({ limit, color }) => {
  const dasharray = 293;
  const [dashoffset, setDashoffset] = useState(dasharray);
  const [score, setScore] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState(0);

  useEffect(() => {
    let count = 0;
    const maxLimit = Math.min(limit, 100); // Ensure limit doesn't exceed 100

    const interval = setInterval(() => {
      if (count >= maxLimit) {
        clearInterval(interval);
      } else {
        count += 1;
        setScore(count);
      }
    }, 20);

    setTimeout(() => setTitleOpacity(1), 500);

    return () => clearInterval(interval);
  }, [limit]);

  useEffect(() => {
    setDashoffset(dasharray * ((100 - score) / 100));
  }, [score, dasharray]);

  return (
    <Container>
      <SvgWrapper>
        <SvgElement>
          <PathBase d="M12,105 A40,40 0 1,1 198,105" />
          <PathScore
            $dasharray={dasharray}
            $dashoffset={dashoffset}
            $color={color}
            d="M12,105 A40,40 0 1,1 198,105"
          />
        </SvgElement>
        <ScoreText>{score}%</ScoreText>
      </SvgWrapper>
      <Title opacity={titleOpacity}>
        Your score is
        <Highlight $color={color}>
          {score >= 75 ? " high" : score >= 50 ? " medium" : " low"}
        </Highlight>
      </Title>
    </Container>
  );
};

export default ScoreLevel;
