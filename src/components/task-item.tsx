import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { useState } from "react";

const Title = styled.span<TitleProps>`
  color: ${(p) =>
    p.complete ? p.theme.colors.textMuted : p.theme.colors.text};
  text-decoration: ${(p) => (p.complete ? "line-through" : "none")};
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const ContainerView = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(0.5)};
`;

const TextDate = styled.span`
  color: ${(p) => p.theme.colors.textMuted};
  font-size: ${(p) => p.theme.font.size.sm};
`;

const Item = styled.li`
  overflow: hidden;
  margin-top: ${(p) => p.theme.spacing(2)};
  max-width: 550px;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: ${(p) => p.theme.spacing(1)};
  color: ${(p) => p.theme.colors.text};
  border: 1px solid ${(p) => p.theme.colors.border};
  background: #fff;
  border-radius: ${(p) => p.theme.radius.md};
`;

const Container = styled.div`
  display: flex;
`;

const ItemEdit = styled.div`
  display: flex;
  padding: ${(p) => p.theme.spacing(1)};
`;

const GroupTitle = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
`;

export type TaskItemProps = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
};

interface TitleProps {
  complete: boolean;
}

export function TaskItem(props: TaskItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Item>
      <ContainerView>
        <GroupTitle>
          <Title
            complete={props.task.complete}
            onClick={() => props.onToggle(props.task.id)}
          >
            {props.task.title}
          </Title>
          {props.task.description !== "" && (
            <StyledButton onClick={() => setIsOpen(true)}>...</StyledButton>
          )}
        </GroupTitle>
        {isOpen == true && (
          <Title complete={props.task.complete}>{props.task.description}</Title>
        )}
        <TextDate>
          {props.task.created.toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TextDate>
      </ContainerView>

      <Container>
        <ItemEdit>
          <StyledButton onClick={() => props.onEdit(props.task)}>
            &#9998;
          </StyledButton>
        </ItemEdit>
        <StyledButton onClick={() => props.onRemove(props.task.id)}>
          &#10060;
        </StyledButton>
      </Container>
    </Item>
  );
}
