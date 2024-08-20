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
  Subtitle,
} from "./styles";
import { HighlightText } from "../../types";

interface ScoreLevelProps {
  limit: number;
  color: string;
  message: string;
  highlightText: HighlightText;
}

const ScoreLevel: React.FC<ScoreLevelProps> = ({
  limit,
  color,
  message,
  highlightText,
}) => {
  const dasharray = 293;
  const [dashoffset, setDashoffset] = useState(dasharray);
  const [score, setScore] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState(0);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (count === limit) {
        clearInterval(interval);
      } else {
        count += 1;
        setScore(count);
      }
    }, 20);

    setTimeout(() => setTitleOpacity(1), 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (score > 100) {
      setDashoffset(0); // Full fill when score exceeds 100
    } else {
      setDashoffset(dasharray * ((100 - score) / 100)); // Regular calculation for score 100 or below
    }
  }, [score, dasharray]);
  return (
    <Container>
      <SvgWrapper>
        <SvgElement>
          <PathBase d="M12,105 A40,40 0 1,1 198,105" />
          <PathScore
            data-testid="path-score"
            $dasharray={dasharray}
            $dashoffset={dashoffset}
            $color={color}
            d="M12,105 A40,40 0 1,1 198,105"
          />
        </SvgElement>
        <ScoreText>{score}%</ScoreText>
      </SvgWrapper>

      <Title opacity={titleOpacity}>
        {score > 0 && <span>You are wasting</span>}
        <Highlight $color={color}>{highlightText.withColor}</Highlight>
        <span>{highlightText.title}</span>
      </Title>
      <Subtitle>{message}</Subtitle>
    </Container>
  );
};

export default ScoreLevel;
