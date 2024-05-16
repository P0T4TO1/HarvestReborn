"use client";

import { useContext, useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  DatePicker,
} from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter, I18nProvider } from "@react-aria/i18n";

import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema } from "@/validations/products.validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { hrApi } from "@/api";

import { toast } from "sonner";
import { SUCCESS_TOAST, DANGER_TOAST } from "@/components";
import { IoMdHelp } from "react-icons/io";

import { AuthContext } from "@/context/auth";
import { IProduct, TipoAlmacenaje } from "@/interfaces";

interface IFormData {
  cantidad_producto: number | null;
  fecha_entrada: Date;
  fecha_vencimiento: Date;
  dias_aviso: number | null;
  precio_kg: number | null;
  tipo_almacenaje: TipoAlmacenaje;
}

interface Props {
  id: number;
  product: IProduct | undefined;
  useDisclosure: { isOpen: boolean; onClose: () => void };
}

export const AddLoteToInventory = ({
  id,
  product,
  useDisclosure: { isOpen, onClose },
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(productSchema),
  });
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [valueFechaEntrada, setValueFechaEntrada] = useState(
    today(getLocalTimeZone())
  );
  const [valueFechaVencimiento, setValueFechaVencimiento] = useState(
    today(getLocalTimeZone())
  );
  const [infoVisible, setInfoVisible] = useState(false);

  let formatter = useDateFormatter({ dateStyle: "full" });

  const clearInputs = () => {
    setValue("cantidad_producto", null);
    setValue("precio_kg", null);
    setValue("dias_aviso", null);
  };

  const handleClose = () => {
    reset();
    onClose();
    clearInputs();
    setInfoVisible(false);
  };

  const addProduct: SubmitHandler<IFormData> = async (data) => {
    setIsLoading(true);
    try {
      if (!user?.duenonegocio?.negocio.inventario?.id_inventario) {
        setIsLoading(false);
        toast("No tienes un inventario", DANGER_TOAST);
        handleClose();
        return;
      }
      const res = await hrApi
        .post(`/store/inventory/${id}`, {
          id: id,
          inventory_id: user?.duenonegocio?.negocio.inventario?.id_inventario,
          ...data,
        })
        .then(() => {
          toast("Producto agregado a tu inventario", SUCCESS_TOAST);
          handleClose();
          setIsLoading(false);
          return true;
        })
        .catch((err) => {
          setIsLoading(false);
          handleClose();
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(addProduct)}>
            <ModalHeader className="flex gap-1 mt-4 justify-between items-center">
              <p>Añadir {product?.nombre_producto} a tu inventario</p>
              <div className="items-center justify-center">
                <Button
                  variant="light"
                  onPress={() => setInfoVisible(!infoVisible)}
                  isIconOnly
                >
                  <IoMdHelp className="text-xl text-green-600" />
                </Button>
              </div>
            </ModalHeader>
            <ModalBody>
              {infoVisible ? (
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <p className="text-green-600">
                    Añade un lote de productos a tu inventario, recuerda que
                    estos productos se venderán en tu negocio.
                  </p>
                  <p className="text-green-600 mt-2">
                    Los días de aviso son los días previos a la fecha de
                    vencimiento en los que se te notificará que el producto está
                    por vencer.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <Input
                      label="Cantidad en kg"
                      type="number"
                      defaultValue=""
                      {...register("cantidad_producto", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors?.cantidad_producto && (
                      <span className="text-red-500 text-sm">
                        {errors?.cantidad_producto?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Precio por kg"
                      type="number"
                      defaultValue=""
                      {...register("precio_kg", { valueAsNumber: true })}
                    />
                    {errors?.precio_kg && (
                      <span className="text-red-500 text-sm">
                        {errors?.precio_kg?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <I18nProvider locale="es-MX">
                      <DatePicker
                        label="Fecha de llegada"
                        showMonthAndYearPickers
                        minValue={today(getLocalTimeZone())}
                        defaultValue={today(getLocalTimeZone())}
                        value={valueFechaEntrada}
                        onChange={(date) => {
                          setValueFechaEntrada(date);
                          setValue(
                            "fecha_entrada",
                            date.toDate(getLocalTimeZone())
                          );
                        }}
                      />
                    </I18nProvider>
                    {errors?.fecha_entrada && (
                      <span className="text-red-500 text-sm">
                        {errors?.fecha_entrada?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <I18nProvider locale="es-MX">
                      <DatePicker
                        label="Fecha de duración aproximada en estado fresco"
                        showMonthAndYearPickers
                        minValue={
                          valueFechaEntrada || today(getLocalTimeZone())
                        }
                        value={valueFechaVencimiento}
                        onChange={(date) => {
                          setValueFechaVencimiento(date);
                          setValue(
                            "fecha_vencimiento",
                            date.toDate(getLocalTimeZone())
                          );
                        }}
                      />
                    </I18nProvider>
                    {errors?.fecha_vencimiento && (
                      <span className="text-red-500 text-sm">
                        {errors?.fecha_vencimiento?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Dias de aviso antes de vencimiento"
                      type="number"
                      defaultValue=""
                      {...register("dias_aviso", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors?.dias_aviso && (
                      <span className="text-red-500 text-sm">
                        {errors?.dias_aviso?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Select
                      label="Tipo de almacenaje"
                      {...register("tipo_almacenaje")}
                    >
                      {Object.values(TipoAlmacenaje).map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </Select>
                    {errors?.tipo_almacenaje && (
                      <span className="text-red-500 text-sm">
                        {errors?.tipo_almacenaje?.message}
                      </span>
                    )}
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleClose}
                isDisabled={isLoading}
              >
                Cerrar
              </Button>
              <Button
                type="submit"
                onPress={() => {
                  setValue(
                    "fecha_entrada",
                    new Date(
                      formatter.format(
                        valueFechaEntrada.toDate(getLocalTimeZone())
                      )
                    )
                  );
                  setValue(
                    "fecha_vencimiento",
                    new Date(
                      formatter.format(
                        valueFechaVencimiento.toDate(getLocalTimeZone())
                      )
                    )
                  );
                }}
                className="bg-green-600"
                isLoading={isLoading}
              >
                Agregar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
