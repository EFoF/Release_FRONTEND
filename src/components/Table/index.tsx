import styled from "styled-components";

const Table1 = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface CellProps {
    width?: string;
}

const HeaderCell = styled.th<CellProps>`
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  width: ${(props) => props.width || 'auto'};
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td<CellProps>`
  text-align: center;
  font-size: 11px;
  width: ${(props) => props.width || 'auto'};
`;

const TableCellBold = styled(TableCell)<CellProps>`
  font-weight: bold;
  font-size: 11px;
  width: ${(props) => props.width || 'auto'};
`;

export {Table1, HeaderCell, TableRow, TableCell, TableCellBold};