import React, { RefObject } from "react";

interface TooltipProps {
    show: boolean | null;
    tooltipRef: RefObject<HTMLDivElement>;
    release: {
        lastModifierEmail: string;
        lastModifiedTime: string;
    } | null;
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

const Tooltip: React.FC<TooltipProps> = ({ show, tooltipRef, release }) => {
    if (show && release && tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();

        return (
            <div
                style={{
                    position: "absolute",
                    top: `${rect.top - 65}px`,
                    left: `${rect.left - 175}px`,
                    backgroundColor: "white",
                    border: "1px solid black",
                    padding: "4px",
                    borderRadius: "4px",
                    zIndex: 1000,
                }}
            >
                <div>Email: {release.lastModifierEmail}</div>
                <div>Date: {formatDate(release.lastModifiedTime)}</div>
            </div>
        );
    } else {
        return null;
    }
};

export default Tooltip;
