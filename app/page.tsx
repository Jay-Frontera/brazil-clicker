'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import ms from 'pretty-ms'
import { TbPigMoney } from "react-icons/tb";
import { millify } from 'millify'
import { IoIosWater } from "react-icons/io";
import { GiHammerSickle } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";
import StatusCard from "./components/status";
import ClickAbleCard from "./components/card";
import { BsFillBackpack3Fill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import { basePlayerMock } from "./mock/player";
import Inventory from "./components/inventory";
import { ActionType, ConsumableItem, Item } from "./types";

export default function Home() {
  const [money, setMoney] = useState(basePlayerMock.money)
  const [cicles, setCicles] = useState(basePlayerMock.cicles)
  const [water, setWater] = useState(basePlayerMock.hunger)
  const [food, setFood] = useState(basePlayerMock.thirst)
  const [totalIncomeMade, setTotalIncomeMade] = useState(basePlayerMock.totalIncomeMade)
  const [inventory, setInventory] = useState(basePlayerMock.inventory)

  const [isInventoryOpen, setInventoryOpen] = useState(false)
  const [isShopOpen, setShopOpen] = useState(false)

  const [count, setCount] = useState(0)
  const [paymentSeconds, setPaymentSeconds] = useState(60)
  const [loaded, setLoaded] = useState(false)

  const handleClick = () => {
    setCount(prevCount => prevCount + 1)
  }

  useEffect(() => {
    if (paymentSeconds <= 0) {
      setCount(0)
      setMoney(prevPoints => prevPoints + count)
      setCicles(prevCicles => prevCicles + 1)
      setTotalIncomeMade(prevTotalIncomeMade => prevTotalIncomeMade + count)
    }

  }, [paymentSeconds])

  function handleAction(actionType: ActionType, item: Item) {
    switch (actionType) {
      case ActionType.CONSUME:
        const consumable = item as ConsumableItem

        const index = inventory.findIndex(v => v.item.id === consumable.id)

        const ExecutedItem = inventory.find(v => v.item.id === consumable.id)

        if (ExecutedItem?.amount <= 0) {
          toast.error('You dont have this item in your inventory');
          inventory.splice(index, 1)
          return;
        }

        if (ExecutedItem.item.isConsumable === false) {
          toast.error('This item is not consumable');
          return;
        }

        console.log(item)

        setWater(prevWater => prevWater + (consumable.effects?.thirst || 0))
        setFood(prevFood => prevFood + (consumable.effects?.hunger || 0))

        inventory[index].amount -= 1

        if (inventory[index].amount <= 0) {
          inventory.splice(index, 1)
        }

        toast.success(`You consumed 1x ${consumable.name}`)

        setInventory([...inventory])

        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (loaded) return;
    setLoaded(true)

    const checkerInterval = setInterval(() => {
      setPaymentSeconds(v => {
        if (v <= 0) {
          return 60
        }
        return v - 1
      })
    }, 1000)

    return () => {
      clearInterval(checkerInterval)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <Toaster />
      <Inventory
        open={isInventoryOpen}
        handleClose={() => setInventoryOpen(false)}
        items={inventory}
        handleAction={handleAction}
      />
      <div className="flex gap-2 justify-center items-center bg-orange-300">
        <div className="border-r border-black h-full" />
        <h1 className="text-2xl font-bold p-2">
          Day {cicles}
        </h1>
        <div className="border-r border-black h-full" />
        <h1 className="text-2xl font-bold">
          Total Income: {millify(totalIncomeMade, { precision: 2 })}
        </h1>
        <div className="border-r border-black h-full" />

      </div>
      <div
        className="flex h-full p-10 gap-5"
      >
        <div className="w-1/2 flex flex-col gap-5">
          <div className="w-max flex gap-2 px-5 py-2 mx-auto rounded-md items-center justify-center text-3xl border bg-green-300 border-black">
            <TbPigMoney
              className="text-green-900"
            />
            {millify(money, { precision: 2 })}
          </div>
          <div className="flex flex-col items-center h-full bg-orange-200 rounded-md p-5 gap-5 border border-orange-300">
            <div className="text-center p-2 bg-orange-300 h-max rounded-md font-bold text-lg text-black w-2/3">
              Next payment in: {paymentSeconds}s
            </div>
            <div className="border w-full border-orange-300 rounded-md" />
            <div className="w-full h-max flex gap-2 justify-center">
              <StatusCard>
                <IoIosWater
                  className="text-2xl text-blue-700"
                />

                <h1 className="text-2xl font-bold text-center text-brown-500">
                  {millify(water, { precision: 2 })}
                </h1>
              </StatusCard>
              <StatusCard>
                <GiMeal
                  className="text-2xl text-orange-500"
                />
                <h1 className="text-2xl font-bold text-center text-brown-500">
                  {millify(food, { precision: 2 })}
                </h1>
              </StatusCard>
            </div>
            <div className="grid grid-cols-2 h-max w-fit gap-5">
              <ClickAbleCard
                className="bg-blue-200"
              >
                <MdWork />
                Jobs
              </ClickAbleCard>
              <ClickAbleCard
                className="bg-green-300"
                onClick={() => setInventoryOpen(true)}
              >
                <BsFillBackpack3Fill />
                Inventory
              </ClickAbleCard>
              {/* <ClickAbleCard>
                Shops
              </ClickAbleCard>
              <ClickAbleCard>
                Profile
              </ClickAbleCard> */}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <div className="w-max flex gap-2 px-5 py-2 mx-auto rounded-md items-center justify-center text-3xl border bg-green-300 border-black">
            <h1 className="text-3xl font-bold text-center text-brown-500">
              Upcoming: {count}
            </h1>
          </div>
          <div className="flex flex-col items-center gap-5 w-full h-full p-5 justify-center">
            <button
              onClick={handleClick}
              className="w-1/2 h-1/3 rounded-full bg-gradient-to-br from-orange-400 to-brown-500 shadow-lg transform transition-transform active:scale-95 focus:outline-none"
              aria-label="Increment counter"
            >
              <h1 className="font-bold text-6xl text-red-700 flex gap-2 justify-center items-center">
                <GiHammerSickle />
                Work
              </h1>
            </button>

          </div>
        </div>
      </div >
    </div >
  );
}
