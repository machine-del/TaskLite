import styled from "@emotion/styled";

const StyledSelect = styled.select`
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #000;
  cursor: pointer;
  outline: none;
`;

interface SelectFilterProps {
  sortByDate: "new" | "old";
  onSortChange: (sort: "new" | "old") => void;
}

export function SelectFilter({ sortByDate, onSortChange }: SelectFilterProps) {
  return (
    <StyledSelect
      value={sortByDate}
      onChange={(e) => onSortChange(e.target.value as "new" | "old")}
    >
      <option value="new">Сначала новые</option>
      <option value="old">Сначала старые</option>
    </StyledSelect>
  );
}
