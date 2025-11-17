import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { useState } from "react";

const Title = styled.span<TitleProps>`
  color: ${(p) => {
    if (p.complete) return p.theme.colors.textMuted;
    if (p.isLatest) return "#000";
    return p.theme.colors.text;
  }};
  text-decoration: ${(p) => (p.complete ? "line-through" : "none")};
  font-weight: ${(p) => (p.isLatest ? "bold" : "normal")};
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

const DeadlineText = styled.span<DeadlineTextProps>`
  color: ${(p) => {
    if (p.complete) return p.theme.colors.textMuted;
    if (p.isOverdue) return "#ff4444";
    if (p.isToday) return "#ff8800";
    if (p.isTomorrow) return "#ffaa00";
    if (p.isThisWeek) return "#2196f3";
  }};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => (p.isOverdue || p.isToday ? "bold" : "normal")};
`;

const DateContainer = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  align-items: center;
`;

const TextDate = styled.span`
  color: ${(p) => p.theme.colors.textMuted};
  font-size: ${(p) => p.theme.font.size.sm};
`;

const Item = styled.li`
  overflow: hidden;
  margin-top: ${(p) => p.theme.spacing(2)};
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

const Arrow = styled.span`
  color: ${(p) => p.theme.colors.textMuted};
  font-size: ${(p) => p.theme.font.size.sm};
`;

const ItemEdit = styled.div`
  display: flex;
  padding: ${(p) => p.theme.spacing(1)};
`;

const GroupTitle = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
`;

const DescriptionText = styled.div<DescriptionTextProps>`
  color: ${(p) => p.theme.colors.textMuted};
  font-size: ${(p) => p.theme.font.size.sm};
`;

interface DeadlineTextProps {
  complete: boolean;
  isOverdue: boolean;
  isToday: boolean;
  isTomorrow: boolean;
  isThisWeek: boolean;
}

export type TaskItemProps = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
  isLatest?: boolean;
};

interface DescriptionTextProps {
  complete: boolean;
}

interface TitleProps {
  complete: boolean;
  isLatest: boolean;
}

export function TaskItem(props: TaskItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  const createdDate = props.task.created.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const deadlineDate = props.task.deadline
    ? new Date(props.task.deadline).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const getDeadlineStatus = () => {
    if (!props.task.deadline) return null;

    const now = new Date();
    const deadline = new Date(props.task.deadline);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const deadlineDate = new Date(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate()
    );

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      isOverdue: diffDays < 0,
      isToday: diffDays === 0,
      isTomorrow: diffDays === 1,
      isThisWeek: diffDays > 1 && diffDays <= 7,
    };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <Item>
      <ContainerView>
        <GroupTitle>
          <Title
            complete={props.task.complete}
            isLatest={props.isLatest || false}
            onClick={() => props.onToggle(props.task.id)}
          >
            {props.task.title}
          </Title>
          {props.task.description !== "" && (
            <StyledButton onClick={toggleDescription}>...</StyledButton>
          )}
        </GroupTitle>
        {isOpen == true && (
          <DescriptionText complete={props.task.complete}>
            {props.task.description}
          </DescriptionText>
        )}
        <DateContainer>
          <TextDate>{createdDate}</TextDate>
          {deadlineDate && (
            <>
              <Arrow>→</Arrow>
              <DeadlineText
                complete={props.task.complete}
                isOverdue={deadlineStatus?.isOverdue || false}
                isToday={deadlineStatus?.isToday || false}
                isTomorrow={deadlineStatus?.isTomorrow || false}
                isThisWeek={deadlineStatus?.isThisWeek || false}
              >
                {deadlineDate}
              </DeadlineText>
            </>
          )}
        </DateContainer>
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
