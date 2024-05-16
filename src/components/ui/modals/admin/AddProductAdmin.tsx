"use client";

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { adminAddProductValidation } from "@/validations/admin.validation";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { useRouter } from "next/navigation";
import { searchProductByName } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa";

interface IFormData {
  nombre_producto: string;
  imagen_producto: File;
  file: string;
  descripcion: string;
  enTemporada: boolean;
  categoria: string;
}

export const AddProductAdminModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IFormData>({
    resolver: zodResolver(adminAddProductValidation),
    defaultValues: {
      nombre_producto: "",
      imagen_producto: undefined,
      file: "",
      descripcion: "",
      enTemporada: false,
      categoria: "",
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setIsLoading(true);
    try {
      const productExists = await searchProductByName(data.nombre_producto);
      if (productExists.message === "Este producto ya esta registrado") {
        setError("nombre_producto", {
          message: "Este producto ya esta registrado",
        });
        setIsLoading(false);
        return null;
      }

      const dataImage = new FormData();
      dataImage.set("file", file as File);

      await hrApi
        .post("/admin/product/upload", dataImage)
        .then((res) => {
          if (res.status === 200) {
            console.log("File uploaded successfully");
            data.file = res.data.secure_url;
          }
        })
        .catch((err) => {
          console.log("Error uploading file", err);
        });

      const res = await hrApi
        .post("/admin/product", data)
        .then(() => {
          toast("Producto agregado con éxito", SUCCESS_TOAST);
          onClose();
          window.location.reload();
          router.refresh();
          return true;
        })
        .catch((err) => {
          toast("Hubo un error al agregar el producto", DANGER_TOAST);
          setIsLoading(false);
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (error) {
      console.log(error);
      console.log("Hubo un error");
    }
  };

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          color="primary"
          variant="faded"
          startContent={<FaPlus size={20} />}
        >
          Agregar producto
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          placement="top-center"
          closeButton={isLoading ? false : true}
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar producto
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      {...register("nombre_producto")}
                      label="Nombre del producto"
                    />
                    {errors?.nombre_producto && (
                      <p className="text-red-500 dark:text-red-400 text-sm">
                        {errors?.nombre_producto.message}
                      </p>
                    )}
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Imagen del producto
                      </label>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        className="bg-gray-200 dark:bg-[#202022] text-gray-800 p-2 rounded-lg block mb-2 w-full"
                        onChange={handleFileChange}
                      />
                      {errors?.imagen_producto && (
                        <p className="text-red-500 dark:text-red-400 text-sm">
                          {errors?.imagen_producto.message}
                        </p>
                      )}
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        PNG, JPG.
                      </p>
                    </div>
                    <Input
                      type="text"
                      {...register("descripcion")}
                      label="Descripción"
                    />
                    {errors?.descripcion && (
                      <p className="text-red-500 dark:text-red-400 text-sm">
                        {errors?.descripcion.message}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      <p className="text-default-500">En temporada</p>
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={setIsSelected}
                      >
                        {isSelected ? "Si" : "No"}
                      </Checkbox>
                      {errors?.enTemporada && (
                        <p className="text-red-500 dark:text-red-400 text-sm">
                          {errors?.enTemporada.message}
                        </p>
                      )}
                    </div>
                    <Select {...register("categoria")} label="Categoria">
                      <SelectItem key="VERDURA" value="VERDURA">
                        Verdura
                      </SelectItem>
                      <SelectItem key="FRUTA" value="FRUTA">
                        Fruta
                      </SelectItem>
                    </Select>
                    {errors?.categoria && (
                      <p className="text-red-500 dark:text-red-400 text-sm">
                        {errors?.categoria.message}
                      </p>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={onClose}
                    isDisabled={isLoading}
                  >
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    onClick={() => {
                      setValue("imagen_producto", file as File);
                      setValue("enTemporada", isSelected);
                    }}
                  >
                    Agregar
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
