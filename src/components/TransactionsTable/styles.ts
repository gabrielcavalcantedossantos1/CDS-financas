import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${(props) => props.theme.COLORS.tableHeaderBorderColor};
  border-radius: 8px;
`;

export const TableHeader = styled.thead`
  background-color: ${(props) => props.theme.COLORS.tableHeaderBackground};
  color: ${(props) => props.theme.COLORS.textColor500};
`;

export const TableBody = styled.tbody``;

export const TableHeadCell = styled.th`
  padding: 14px 20px;
  text-align: left;
  border-right: 1px solid
    ${(props) => props.theme.COLORS.tableHeaderBorderColor};
  border-bottom: 1px solid
    ${(props) => props.theme.COLORS.tableHeaderBorderColor};

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.COLORS.tableRowHover};
  }
`;

export const TableCell = styled.td`
  padding: 10px 20px;
  color: ${(props) => props.theme.COLORS.textColor500};

  &:not(:first-child) {
    border-right: 1px solid
      ${(props) => props.theme.COLORS.tableHeaderBorderColor};
  }
`;
