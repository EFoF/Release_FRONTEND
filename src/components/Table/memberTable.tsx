import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HeaderCell, TableCell, TableRow } from "./index";
import minus from "../../img/minus.png";
import ConfirmationModal from "../Modal";

interface Member {
    name: string;
    email: string;
}

interface MemberTableProps {
    members: Member[];
}

const MemberTable: React.FC<MemberTableProps> = ({ members }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(members);

    // data가 변경될 때마다 members도 업데이트
    useEffect(() => {
        setData(members);
    }, [members]);

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleModalConfirm = () => {
        const updatedData = data.slice();
        const indexToDelete = 0;

        if (indexToDelete >= 0 && indexToDelete < updatedData.length) {
            updatedData.splice(indexToDelete, 1);
            setData(updatedData);
        }

        setIsModalOpen(false);
    };

    const deleteMember = () => {
        setIsModalOpen(true);
    };

    return (
        <Table>
        <TableWrapper>
            <thead>
            <tr>
                <HeaderCell1 width="30%">이름</HeaderCell1>
                <HeaderCell1 width="60%">이메일</HeaderCell1>
                <HeaderCell1 width="10%" />
            </tr>
            </thead>
            <tbody>
            {data.map((member, index) => (
                <TableRow key={index}>
                    <TableCell1 width="30%">{member.name}</TableCell1>
                    <TableCell2 width="60%">{member.email}</TableCell2>
                    <TableCell2 onClick={deleteMember} width="10%">
                        <DeleteImg src={minus} />
                    </TableCell2>

                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onCancel={handleModalCancel}
                        onConfirm={handleModalConfirm}
                        message={"해당 멤버를 삭제하시겠습니까?"}
                    />
                </TableRow>
            ))}
            </tbody>
        </TableWrapper>
        </Table>
    );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-height: 200px; 
`;

export const HeaderCell1 = styled(HeaderCell)`
  padding: 10px;
`;

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
