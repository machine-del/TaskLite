import { useState } from "react";
import { MainButton } from "./main-button";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContainerAction = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;

const StyledInput = styled.input`
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 8px;
  flex: 1;
`;

type TaskInputProps = {
  onAdd: (task: string) => void;
  setQuery: (query: string) => void;
  query: string;
};

export function TaskInput(props: TaskInputProps) {
  const [task, setTask] = useState("");
  return (
    <Wrapper>
      <ContainerAction>
        <StyledInput
          type="text"
          value={task}
          placeholder="Введите задачу"
          onChange={(event) => setTask(event.target.value)}
        />
        <MainButton onClick={() => props.onAdd(task)} text="Добавить" />
      </ContainerAction>
      <StyledInput
        onChange={(e) => props.setQuery(e.target.value)}
        value={props.query}
        type="text"
        placeholder="Поиск задач..."
      />
    </Wrapper>
  );
}
