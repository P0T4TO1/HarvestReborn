"use client";

import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineReport, MdBlock, MdDelete } from "react-icons/md";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";

export const DropdownChat: FC = () => {
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" isIconOnly color="default">
            <BsThreeDotsVertical size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownSection>
            <DropdownItem
              key="report"
              color="danger"
              className="h-10 gap-2"
              startContent={<MdOutlineReport size={20} />}
            >
              <p className="font-semibold">Reportar</p>
            </DropdownItem>
            <DropdownItem
              key="block"
              color="danger"
              className="h-10 gap-2"
              startContent={<MdBlock size={20} />}
            >
              <p className="font-semibold">Bloquear</p>
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              className="h-10 gap-2"
              startContent={<MdDelete size={20} />}
            >
              <p className="font-semibold">Eliminar</p>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
