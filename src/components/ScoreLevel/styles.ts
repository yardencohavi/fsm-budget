import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  /* width: 100%; */
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 0;
`;

export const SvgWrapper = styled.div`
  position: relative;
`;

export const SvgElement = styled.svg`
  width: 211px;
  height: 115px;
  viewbox: 0 0 211 115;
`;

export const PathBase = styled.path`
  fill: none;
  stroke: #d0d9ea;
  stroke-width: 17px;
  stroke-linecap: round;
`;

export const PathScore = styled.path<{
  $dasharray: number;
  $dashoffset: number;
  $color: string;
}>`
  fill: none;
  stroke: ${({ $color }) => $color};
  stroke-width: 17px;
  stroke-linecap: round;
  stroke-dasharray: ${({ $dasharray }) => $dasharray};
  stroke-dashoffset: ${({ $dashoffset }) => $dashoffset};
  transition: stroke-dashoffset 0.5s ease;
`;

export const Subtitle = styled.p`
  margin-top: 0;
`;
export const ScoreText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 3.5rem !important;
  font-weight: bold;
  font-size: 2.5rem;
`;

export const Title = styled.h1<{ opacity: number }>`
  font-size: 1.25rem; /* equivalent to text-xl */
  font-weight: bold;
  transition: opacity 0.5s ease;
  margin-top: 12px;
  opacity: ${({ opacity }) => opacity};
  @media (min-width: 768px) {
    font-size: 2.25rem; /* equivalent to md:text-4xl */
  }
`;

export const Highlight = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`;
