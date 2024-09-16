import React, { HTMLAttributes } from "react";

export default function ClickAbleCard({
    children,
    className,
    onClick
}: {
    children: React.ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={
                `w-52 flex justify-center items-center h-max gap-1 px-5 py-3 text-2xl font-bold border rounded-md text-center  border-black
                hover:bg-blue-300 hover:text-blue-900
                ${className}`
            }
        >
            {children}
        </button>
    )
}