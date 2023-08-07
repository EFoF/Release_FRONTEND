import React, {RefObject, useState} from "react";
import styled from "styled-components";

interface TooltipProps {
    show: boolean;
    tooltipRef: RefObject<HTMLDivElement>;
    release: {
        lastModifierEmail: string;
        lastModifiedTime: string;
    } | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const Tooltip: React.FC<TooltipProps> = ({ show, tooltipRef, release, onMouseEnter, onMouseLeave }) => {
    const [localHovered, setLocalHovered] = useState(false);

    if (show && release && tooltipRef.current && !localHovered) {
        const rect = tooltipRef.current.getBoundingClientRect();

        return (
            <div
                ref={tooltipRef}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                    position: "absolute",
                    top: `${rect.top - 65}px`,
                    left: `${rect.left - 160}px`,
                    backgroundColor: "white",
                    border: "1px solid black",
                    padding: "4px",
                    borderRadius: "4px",
                    zIndex: 1000,
                }}
            >
                <div>{formatDate(release.lastModifiedTime)}</div>
                <div>
                    <EmailLink email={release.lastModifierEmail}>{release.lastModifierEmail}</EmailLink>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export const EmailLink = styled.a.attrs<{ email: string }>(props => ({
    href: `mailto:${props.email}`,
}))`
  cursor: pointer;
`;


export default Tooltip;
