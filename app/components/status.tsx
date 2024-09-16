import React from "react";
import { IoIosWater } from "react-icons/io";
import { millify } from 'millify'
import { GiMeal } from "react-icons/gi";

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

export function Status({
    value,
    statusType
}: {
    value: number;
    statusType: 'thirst' | 'hunger';
}) {
    return (
        <StatusCard>
            {
                statusType == 'thirst' && (
                    <IoIosWater
                        className="text-2xl text-blue-700"
                    />
                )
            }
            {
                statusType == 'hunger' && (
                    <GiMeal
                        className="text-2xl text-orange-500"
                    />
                )
            }

            <h1 className="text-2xl font-bold text-center text-brown-500">
                {millify(value, { precision: 2 })}
            </h1>

        </StatusCard>
    )
}