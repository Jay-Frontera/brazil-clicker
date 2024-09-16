import React from "react";

export default function StatusCard({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-center items-center h-max gap-1">
            {children}
        </div>
    )
}