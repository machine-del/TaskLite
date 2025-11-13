import styled from "@emotion/styled";

type ProgressBarProps = {
  percent: number;
};

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(2)} 0;
`;

const BarBG = styled.div`
  width: 100%;
  height: 10px;
  background: rgb(229, 229, 229);
  border-radius: 9999px;
  overflow: hidden;
`;

const Progress = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(p) => p.percent}%;
  background: linear-gradient(90deg, rgb(155, 121, 207), rgb(103, 76, 140));
  transition: width 0.4s;
  border-radius: 9999px;
`;

const Completed = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: rgb(117, 117, 117);
  text-align: center;
`;

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <Wrapper>
      <BarBG>
        <Progress percent={props.percent}></Progress>
      </BarBG>
      <Completed>Завершено: {props.percent}%</Completed>
    </Wrapper>
  );
}
