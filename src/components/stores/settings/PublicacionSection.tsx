"use client";

import React, {
  useState,
  DragEvent,
  ChangeEvent,
  useContext,
  useMemo,
  useCallback,
} from "react";

import {
  Card,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
  CardBody,
  Divider,
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { toast } from "sonner";
import { FaX } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import Carousel from "react-material-ui-carousel";
import { SUCCESS_TOAST, DANGER_TOAST } from "@/components/ui";

import { IoCloudUploadOutline } from "react-icons/io5";

import { hrApi } from "@/api";
import { ILote } from "@/interfaces";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { postValidationSchema } from "@/validations/negocio.validation";

interface IFormData {
  images_publicacion: File[];
  titulo_publicacion: string;
  descripcion_publicacion: string;
  price?: number;
  disponibilidad: string;
  lotes: number[];
}

type Props = {
  lotes: {
    todos: ILote[];
    buenEstado: ILote[];
    apuntoVencer: ILote[];
  };
};

export const PublicacionSection = ({ lotes }: Props) => {
  const { user } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IFormData>({
    resolver: zodResolver(postValidationSchema),
  });
  const [images, setImages] = useState<File[]>([]);
  const [asideProducts, setAsideProducts] = useState(false);
  const [lotesSelected, setLotesSelected] = useState<number[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const hasSearchFilter = Boolean(searchValue);
  const [isLoading, setIsLoading] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const router = useRouter();

  const filteredItems = useMemo(() => {
    let filteredLotes = [...lotes.todos];

    if (hasSearchFilter) {
      filteredLotes = filteredLotes.filter((lote) =>
        lote.producto.nombre_producto
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    } else if (filterValue === "") {
      filteredLotes = lotes.apuntoVencer;
    } else if (filterValue === "all") {
      filteredLotes = lotes.todos;
    } else if (filterValue === "relevant") {
      filteredLotes = lotes.apuntoVencer;
    } else if (filterValue === "goodState") {
      filteredLotes = lotes.buenEstado;
    }

    return filteredLotes;
  }, [filterValue, lotes, hasSearchFilter, searchValue]);

  const itemsToDisplay = useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchValue(value);
    } else {
      setSearchValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearchValue("");
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setImages((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setImages((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveLote = (id: number) => {
    setLotesSelected((prev) => prev.filter((lote) => lote !== id));
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    console.log(data);
    setIsLoading(true);
    const imagesURLs: string[] = [];
    try {
      const formData = new FormData();
      data.images_publicacion.forEach((file) => {
        formData.append("files", file);
      });

      await hrApi
        .post("/store/publication/upload", formData)
        .then((response) => {
          console.log("File uploaded successfully");
          imagesURLs.push(...response.data.secure_urls);
        })
        .catch((error) => {
          console.error(error, "Error al subir las imágenes a la API");
          toast("Ocurrió un error al crear la publicación", DANGER_TOAST);
        });

      if (!user?.duenonegocio?.negocio.id_negocio) {
        toast("No se encontró el negocio del usuario", DANGER_TOAST);
        return;
      }
      await hrApi
        .post("/store/publication", {
          ...data,
          images_urls: imagesURLs,
          id_negocio: user.duenonegocio.negocio.id_negocio,
        })
        .then((response) => {
          toast("Publicación creada con éxito", SUCCESS_TOAST);
          router.push("/store/publications");
        })
        .catch((error) => {
          console.error(error, "Error al crear la publicación en la API");
          toast("Ocurrió un error al crear la publicación", DANGER_TOAST);
        });
    } catch (error) {
      console.error(error);
      toast("Ocurrió un error al crear la publicación", DANGER_TOAST);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <aside className="pt-16 w-full md:w-1/3 lg:w-1/4 md:block md:min-w-[380px] border-r-1 border-default-500">
        <div className="flex flex-col gap-2 p-4 text-sm top-12">
          <h4 className="text-md dark:text-gray-300">Harvest Reborn</h4>
          <h2 className="mb-4 text-2xl font-semibold dark:text-gray-300">
            Crear publicación
          </h2>
        </div>
        <div className="p-4">
          <h4 className="text-sm dark:text-gray-300">
            Imágenes - {images.length}/10 - (Máximo 10 imágenes)
          </h4>

          {images.length < 1 ? (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div
                  className="flex flex-col items-center justify-center w-full h-full"
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <IoCloudUploadOutline className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">
                      Agrega imágenes haciendo clic
                    </span>{" "}
                    o arrastrando y soltando
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative max-w-[6.875rem] max-h-[6.875rem] bg-gray-300 dark:bg-gray-700 rounded-lg"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Imagen de la publicación"
                    className="object-cover w-[6.875rem] h-[6.875rem] rounded-lg"
                  />
                  <Button
                    onClick={() => handleRemoveFile(index)}
                    isIconOnly
                    size="sm"
                    radius="full"
                    className="absolute top-0 right-0 p-1 bg-red-500 z-10"
                  >
                    <FaX />
                  </Button>
                </div>
              ))}
              <label
                htmlFor="dropzone-file"
                className="w-[6.875rem] h-[6.875rem] flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div
                  className="flex flex-col items-center justify-center w-full h-full"
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <IoCloudUploadOutline className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">Agregar más imágenes</span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
          {errors.images_publicacion && (
            <p className="text-xs text-red-500 dark:text-red-400 text-sm">
              {errors.images_publicacion.message}
            </p>
          )}
        </div>
        <form
          className="flex flex-col gap-2 p-4 text-sm top-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-lg dark:text-gray-300">
            Información de la publicación
          </h4>
          <div className="flex flex-col gap-2">
            <Input
              label="Título"
              type="text"
              id="title"
              className="input"
              {...register("titulo_publicacion")}
            />
            {errors.titulo_publicacion && (
              <p className="text-xs text-red-500 dark:text-red-400 text-sm">
                {errors.titulo_publicacion.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Textarea
              label="Descripción"
              id="description"
              className="input"
              {...register("descripcion_publicacion")}
            />
            {errors.descripcion_publicacion && (
              <p className="text-xs text-red-500 dark:text-red-400 text-sm">
                {errors.descripcion_publicacion.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Select
              label="Disponible para"
              id="unit"
              {...register("disponibilidad")}
            >
              <SelectItem key="EN_VENTA" value="EN_VENTA">
                Venta
              </SelectItem>
              <SelectItem key="DONACION" value="DONACION">
                Donación
              </SelectItem>
            </Select>
            {errors.disponibilidad && (
              <p className="text-xs text-red-500 dark:text-red-400 text-sm">
                {errors.disponibilidad.message}
              </p>
            )}
          </div>
          {watch("disponibilidad") === "EN_VENTA" && (
            <div className="flex flex-col gap-2">
              <Input
                label="Precio"
                type="number"
                id="price"
                className="input"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-red-500 dark:text-red-400 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>
          )}
          <div>
            <Button
              color="default"
              size="md"
              className="w-full"
              onPress={() => setAsideProducts(true)}
            >
              Seleccionar productos
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              onPress={() => {
                setValue("images_publicacion", images);
                setValue("lotes", lotesSelected);
              }}
            >
              Publicar
            </Button>
          </div>
        </form>
      </aside>
      <div className="w-full min-h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <Card className="p-4 h-[700px] w-[800px]">
            <CardHeader>
              <h2 className="text-md">Vista previa</h2>
            </CardHeader>
            <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                {images.length > 1 ? (
                  <Carousel
                    className="w-full h-full max-w-[490px] max-h-[596px] bg-gray-300 dark:bg-gray-700 rounded-lg"
                    autoPlay={false}
                    indicators={false}
                    navButtonsAlwaysVisible={true}
                    animation="fade"
                    duration={100}
                    height={596}
                  >
                    {images.map((image, index) => (
                      <div
                        className="w-full h-full max-w-[490px] max-h-[596px] bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                        key={index}
                      >
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Imagen de la publicación"
                          className="max-w-[490px] max-h-[596px]"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : images.length === 1 ? (
                  <div className="w-full h-full max-w-[490px] max-h-[596px] bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Image
                      src={URL.createObjectURL(images[0])}
                      alt="Imagen de la publicación"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Vista previa de la publicación
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-lg">
                    {watch("titulo_publicacion")
                      ? watch("titulo_publicacion")
                      : "Título de la publicación"}
                  </h2>
                  <p className="text-md font-semibold text-default-600">
                    {watch("disponibilidad") === "EN_VENTA" && watch("price")
                      ? `$${watch("price")}`
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Publicado hace unos segundos
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-md">Descripción</p>
                  <p className="text-sm text-default-700">
                    {watch("descripcion_publicacion")
                      ? watch("descripcion_publicacion")
                      : "Aqui va la descripción de la publicación"}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Disponible para:{" "}
                  {watch("disponibilidad") === "EN_VENTA"
                    ? "Venta"
                    : watch("disponibilidad") === "DONACION"
                      ? "Donación"
                      : "Venta/Donación"}
                </p>
                <div>
                  <Accordion>
                    <AccordionItem title="Productos">
                      {lotesSelected.map((id) => {
                        const lote = lotes.todos.find((l) => l.id_lote === id);
                        if (!lote)
                          return (
                            <AccordionItem key={id}>
                              Producto no encontrado
                            </AccordionItem>
                          );
                        return (
                          <div
                            key={lote.id_lote}
                            className="flex justify-between mt-2"
                          >
                            <p>{lote.producto.nombre_producto}</p>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  {lote.last_cantidad !== 0
                                    ? lote.last_cantidad
                                    : lote.cantidad_producto}{" "}
                                  kg
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </AccordionItem>
                  </Accordion>
                  {errors.lotes && (
                    <p className="text-red-500 dark:text-red-400 text-md">
                      {errors.lotes.message}
                    </p>
                  )}
                </div>
                <Divider className="my-4" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg">Información del vendedor</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.duenonegocio?.negocio?.nombre_negocio ??
                      "Nombre del negocio"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.duenonegocio?.negocio?.direccion_negocio ??
                      "Dirección"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.duenonegocio?.negocio?.telefono_negocio ??
                      "Teléfono"}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      {asideProducts && (
        <aside className="pt-16 w-full md:w-1/3 lg:w-1/4 md:block md:min-w-[380px] border-l-1 border-default-500">
          <div>
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg text-default-800">Seleccionar lotes</h2>
              <Button
                color="default"
                size="sm"
                onClick={() => setAsideProducts(false)}
              >
                Cerrar
              </Button>
            </div>
            <div className="pb-4 px-4 flex justify-between">
              <Select
                label="Filtrar"
                size="sm"
                className="w-full sm:max-w-[44%]"
                selectedKeys={[filterValue]}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <SelectItem key="all" value="1">
                  Todos
                </SelectItem>
                <SelectItem key="relevant" value="2">
                  Relevancia
                </SelectItem>
                <SelectItem key="goodState" value="4">
                  En buen estado
                </SelectItem>
              </Select>
              <Button
                isIconOnly
                size="md"
                variant="light"
                onPress={() => setInfoVisible(!infoVisible)}
              >
                <IoMdHelp size={24} />
              </Button>
            </div>
            {infoVisible && (
              <>
                <Divider />
                <div
                  className="p-4 bg-gray-100 dark:bg-gray-800"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  <h3 className="text-lg text-default-800">Ayuda</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aquí puedes seleccionar los lotes que deseas publicar. Si no
                    se muestran productos pero tienes lotes en tu inventario, es
                    posible que los lotes hayan vencido o no estén en buen
                    estado.
                  </p>
                </div>
              </>
            )}
          </div>
          <Divider />
          <div className="p-4">
            <h3 className="text-lg text-default-800">Productos recomendados</h3>
            <Input
              isClearable
              area-label="Buscar productos"
              className="w-full"
              placeholder="Buscar por nombre..."
              startContent={<FaSearch size={20} />}
              value={searchValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="grid grid-cols-1 gap-4 mt-4">
              {itemsToDisplay.length < 1 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No se encontraron productos
                </p>
              )}
              {itemsToDisplay.map((lote) => (
                <Card key={lote.id_lote} className="w-full">
                  <CardHeader>
                    <h2 className="text-md">{lote.producto.nombre_producto}</h2>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        <Image
                          src={lote.producto.imagen_producto}
                          alt="Imagen del producto"
                          className="object-cover w-16 h-16 rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Quedan:{" "}
                          <span className="font-semibold">
                            {lote.last_cantidad !== 0
                              ? lote.last_cantidad
                              : lote.cantidad_producto}{" "}
                            kg
                          </span>
                        </p>
                        <div className="flex gap-2">
                          <Button
                            color="default"
                            size="sm"
                            className="w-1/2"
                            isDisabled={lotesSelected.includes(lote.id_lote)}
                            onPress={() =>
                              setLotesSelected((prev) => [
                                ...prev,
                                lote.id_lote,
                              ])
                            }
                          >
                            Seleccionar
                          </Button>
                          {lotesSelected.includes(lote.id_lote) && (
                            <Button
                              color="danger"
                              onClick={() => handleRemoveLote(lote.id_lote)}
                              size="sm"
                              className="w-1/2"
                            >
                              Quitar lote
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
