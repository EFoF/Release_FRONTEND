import React from 'react';
import styled from 'styled-components';

interface Member {
    name: string;
    email: string;
}

interface MemberTableProps {
    members: Member[];
}

const MemberTable: React.FC<MemberTableProps> = ({ members }) => {
    return (
        <Table>
            <thead>
            <tr>
                <HeaderCell width="30%">이름</HeaderCell>
                <HeaderCell width="60%">이메일</HeaderCell>
                <HeaderCell width="10%">-</HeaderCell>
            </tr>
            </thead>
            <tbody>
            {members.map((member, index) => (
                <TableRow key={index}>
                    <TableCellBold width="30%">{member.name}</TableCellBold>
                    <TableCell width="60%">{member.email}</TableCell>
                    <TableCell width="10%">-</TableCell>
                </TableRow>
            ))}
            </tbody>
        </Table>
    );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.3rem;
`;

interface CellProps {
    width?: string;
}

const HeaderCell = styled.th<CellProps>`
  padding: 10px;
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
  padding: 10px;
  text-align: center;
  font-size: 11px;
  width: ${(props) => props.width || 'auto'};
`;

const TableCellBold = styled(TableCell)<CellProps>`
  font-weight: bold;
  font-size: 11px;
  width: ${(props) => props.width || 'auto'};
`;

export default MemberTable;
