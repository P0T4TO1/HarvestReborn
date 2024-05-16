"use client";

import { Image, Link, Button } from "@nextui-org/react";

export const EmptyBag = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="/images/empty-bag.png"
        width={200}
        height={200}
        alt="Empty bag"
      />
      <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-4">
        No hay productos en la bolsa
      </p>
      <Link href={"/stores"} className="mt-4">
        <Button variant="ghost" size="lg" color="primary">
          Ir a comprar
        </Button>
      </Link>
    </div>
  );
};
