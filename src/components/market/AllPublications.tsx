"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { IPublicacion } from "@/interfaces";
import { Image, Input, Link } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import { getActivePublications } from "@/actions";
import { Disponibilidad } from "@prisma/client";

interface Props {
  initialPublications: IPublicacion[];
}

const NUMBER_OF_ITEMS_TO_FETCH = 10;

export const AllPublications = ({ initialPublications }: Props) => {
  const searchParams = useSearchParams();

  const [publications, setPublications] =
    useState<IPublicacion[]>(initialPublications);
  const [message, setMessage] = useState<string>("");
  const [offset, setOffset] = useState(NUMBER_OF_ITEMS_TO_FETCH);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const { ref, inView } = useInView();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    if (search === "") return;
    window.history.pushState({}, "", `/market?q=${search.replace(/ /g, "+")}`);
    window.location.reload();
  };

  const loadMorePublications = useCallback(async () => {
    const newPublications = await getActivePublications(
      offset,
      NUMBER_OF_ITEMS_TO_FETCH,
      search
    );
    if (!newPublications) return setMessage("No hay más publicaciones");
    setPublications((prev) => [...prev, ...newPublications]);
    setOffset((prev) => prev + NUMBER_OF_ITEMS_TO_FETCH);
  }, [offset, search]);

  // const loadMorePublications = async () => {
  //   const newPublications = await getActivePublications(
  //     offset,
  //     NUMBER_OF_ITEMS_TO_FETCH,
  //     search
  //   );
  //   if (!newPublications) return setMessage("No hay más publicaciones");
  //   setPublications((prev) => [...prev, ...newPublications]);
  //   setOffset((prev) => prev + NUMBER_OF_ITEMS_TO_FETCH);
  // };

  useEffect(() => {
    if (inView) {
      loadMorePublications();
    }
  }, [inView, loadMorePublications]);

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
        Publicaciones
      </h1>
      <div className="flex mt-4">
        <Input
          placeholder="Buscar publicaciones"
          startContent={<FaSearch size={21} />}
          className="w-full"
          onChange={handleSearch}
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {publications.map((publication) => (
          <Link
            href={`/market/item/${publication.id_publicacion}`}
            key={publication.id_publicacion}
            color="foreground"
            underline="hover"
            disableAnimation
          >
            <div className="max-w-[15.313rem]">
              <Image
                src={publication.images_publicacion[0]}
                alt={publication.titulo_publicacion}
                className="max-w-[15.313rem] max-h-[15.313rem] w-full h-[15.313rem] object-cover"
              />
              {publication.disponibilidad === Disponibilidad.EN_VENTA ? (
                <div className="flex mt-2">
                  <p className="text-lg font-semibold">
                    MX${publication.precio_publicacion}
                  </p>
                </div>
              ) : (
                <div className="flex mt-2">
                  <p className="text-lg font-semibold">
                    {publication.disponibilidad === Disponibilidad.DONACION
                      ? "Donacion"
                      : ""}
                  </p>
                </div>
              )}
              <p className="text-md font-light">
                {publication.titulo_publicacion}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div ref={ref} className="mt-10">
        {message}
      </div>
    </div>
  );
};
