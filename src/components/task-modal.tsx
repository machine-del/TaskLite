import { useEffect, useState } from "react";
import type { Task } from "../entities/task";
import styled from "@emotion/styled";
import { normalizeTitle } from "../utils/utils";

const Overlay = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.div`
  background: #fff;
  box-shadow: 0px 0px 10px #00000069;
  height: 100%;
  width: 100%;
  height: auto;
  max-width: 450px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
`;

const StyledInput = styled.input`
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 8px;
`;

const StyledTextArea = styled.textarea`
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  height: 30px;
  padding: 8px 8px 0px;
  resize: vertical;
  min-height: 75px;
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: right;
  gap: 8px;
`;

const CancelButton = styled.button`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #ff0000ff;
    color: #fff;
  }
`;
const SaveButton = styled.button`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #9b79cf;
  color: #fff;
  padding: 8px;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #7c58b1ff;
  }
`;

type TaskModalProps = {
  task: Task;
  onSave: (
    id: string,
    title: string,
    description: string,
    deadline: Date | null
  ) => void;
  onClose: () => void;
};

export function TaskModal(props: TaskModalProps) {
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description ?? "");
  const [deadline, setDeadline] = useState<string>(() => {
    try {
      if (props.task.deadline instanceof Date) {
        return props.task.deadline.toISOString().split("T")[0];
      } else if (typeof props.task.deadline === "string") {
        const date = new Date(props.task.deadline);
        return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") props.onClose();
    });

    return () =>
      window.removeEventListener("keydown", (e) => {
        if (e.code === "Escape") props.onClose();
      });
  }, [props]);

  return (
    <Overlay>
      <ModalContainer>
        <h2>Редактирование задачи</h2>
        <StyledInput
          placeholder="Введите название задачи..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
        />
        <StyledTextArea
          placeholder="Введите описание..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></StyledTextArea>

        <div>
          Дедлайн:{" "}
          <input
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
        </div>

        <ContainerButton>
          <CancelButton onClick={props.onClose}>Отмена</CancelButton>
          <SaveButton
            onClick={() => {
              if (title.trim() !== "") {
                props.onSave(
                  props.task.id,
                  normalizeTitle(title),
                  description,
                  deadline ? new Date(deadline) : null
                );
                props.onClose();
              }
            }}
          >
            Сохранить
          </SaveButton>
        </ContainerButton>
      </ModalContainer>
    </Overlay>
  );
}
