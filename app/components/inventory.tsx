import { ActionType, Item } from "../types";
import type { Inventory } from "../types";
import BaseModal from "./modal";
import { Status } from "./status";

export default function Inventory({
    items,
    open,
    handleClose,
    handleAction
}: {
    items: Inventory,
    open: boolean,
    handleClose: () => void,
    handleAction: (action: ActionType, item: Item) => void
}) {
    return (
        <BaseModal
            open={open}
            handleClose={handleClose}
            className="gap-5 flex-col flex"
        >
            <h1 className="
            text-3xl text-center px-5 py-2 border w-max mx-auto rounded-md bg-orange-300 border-orange-200
            ">
                Inventory
            </h1>
            <div className="grid grid-cols-6 gap-2 rounded-md">
                {
                    items.map((
                        v: {
                            item: Item,
                            amount: number
                        }
                    ) => {
                        return (
                            <button
                                key={v.item.id}
                                className='flex justify-between items-center border flex-col border-orange-300 bg-orange-100 rounded-lg'
                                onClick={() => {
                                    if (v.item.isConsumable) {
                                        handleAction(ActionType.CONSUME, v.item)
                                    }
                                }}
                            >
                                <h1 className="text-base text-center justify-center items-center flex p-2 h-1/3 border-b border-orange-300 w-full bg-blue-100 rounded-r-lg">
                                    {v.item.name}
                                </h1>
                                <div className="py-3 flex flex-col justify-center w-full items-center">
                                    <img
                                        src={v.item.icon} alt={v.item.name}
                                        className="w-20 h-20"
                                    />
                                    {
                                        v.item.isConsumable && (
                                            <div className="flex gap-2">
                                                {
                                                    v.item.effects.hunger && (
                                                        <Status
                                                            statusType="hunger"
                                                            value={v.item.effects.hunger}
                                                        />
                                                    )
                                                }
                                                {
                                                    v.item.effects.thirst && (
                                                        <Status
                                                            statusType="thirst"
                                                            value={v.item.effects.thirst}
                                                        />
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="border-t border-orange-400 w-full justify-center items-center flex bg-orange-300 p-1">
                                    <p>
                                        {v.amount}x
                                    </p>
                                </div>
                            </button>
                        )
                    })
                }
            </div>
        </BaseModal>
    )
}