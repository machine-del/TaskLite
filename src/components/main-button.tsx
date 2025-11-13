import styled from "@emotion/styled";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const StyledButton = styled.button`
  border: none;
  width: 120px;
  height: 40px;
  color: white;
  background: #967fc4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: ${(p) => p.theme.radius.md};

  &:hover {
    background: #77659cff;
  }
`;

export function MainButton(props: ButtonProps) {
  return (
    <>
      <StyledButton onClick={props.onClick}>{props.text}</StyledButton>
    </>
  );
}
