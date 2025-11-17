import styled from "@emotion/styled";
import { SelectFilter } from "./select-filter";

const FilterMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1em;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const ButtonFilter = styled.button<ButtonFilterProps>`
  padding: ${(p) => p.theme.spacing(1.2)};
  background-color: ${(p) => (p.active ? "#9b79cf" : "white")};
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: ${(p) => (p.active ? "#fff" : "#000")};
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #7c58b1ff;
    color: #fff;
  }
`;

interface ButtonFilterProps {
  active: boolean;
}

interface FiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  sortByDate: "new" | "old";
  onSortChange: (sort: "new" | "old") => void;
}

export function Filters({
  filter,
  onFilterChange,
  sortByDate,
  onSortChange,
}: FiltersProps) {
  return (
    <FilterMain>
      <FilterContainer>
        <ButtonFilter
          active={filter === "all"}
          onClick={() => onFilterChange("all")}
        >
          Все
        </ButtonFilter>
        <ButtonFilter
          active={filter === "active"}
          onClick={() => onFilterChange("active")}
        >
          Активные
        </ButtonFilter>
        <ButtonFilter
          active={filter === "completed"}
          onClick={() => onFilterChange("completed")}
        >
          Завершенные
        </ButtonFilter>
      </FilterContainer>
      <SelectFilter sortByDate={sortByDate} onSortChange={onSortChange} />
    </FilterMain>
  );
}
