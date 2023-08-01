import React from 'react';
import styled from 'styled-components';
import {HeaderCell, TableCell, TableRow} from "./index";
import minus from "../../img/minus.png";

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
                <HeaderCell1 width="30%">이름</HeaderCell1>
                <HeaderCell1 width="60%">이메일</HeaderCell1>
                <HeaderCell1 width="10%" />
            </tr>
            </thead>
            <tbody>
            {members.map((member, index) => (
                <TableRow key={index}>
                    <TableCell1 width="30%">{member.name}</TableCell1>
                    <TableCell2 width="60%">{member.email}</TableCell2>
                    <TableCell2 width="10%">
                        <DeleteImg src={minus} />
                    </TableCell2>
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

export const HeaderCell1 = styled(HeaderCell)`
  padding: 10px;
`

const TableCell1 = styled(TableCell)`
  padding: 10px;
  font-weight: bold;
`;

const TableCell2 = styled(TableCell)`
  padding: 10px;
`;

const DeleteImg = styled.img`
  width: 1.5rem;
`;

export default MemberTable;
