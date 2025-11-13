type TitleProps = {
  title: string;
  text: string;
  completed?: boolean;
};

export function Title(props: TitleProps) {
  return <h1>{props.text}</h1>;
}
