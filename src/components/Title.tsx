import styled from "@emotion/styled";

const Text = styled.h1`
  margin-bottom: 0.2em;
`;

type TitleProps = {
  text: string;
};

export function Title(props: TitleProps) {
  return <Text>{props.text}</Text>;
}
