"use client";

import { useState } from "react";
import {
  Button,
  CircularProgress,
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
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useDateFormatter, I18nProvider } from "@react-aria/i18n";

import { hrApi } from "@/api";

import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";

import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema } from "@/validations/products.validation";
import { ILote, TipoAlmacenaje } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

interface IFormData {
  cantidad_producto: number;
  fecha_entrada: Date;
  fecha_vencimiento: Date;
  dias_aviso: number;
  precio_kg: number;
  tipo_almacenaje: TipoAlmacenaje;
}

interface Props {
  lote: ILote;
  useDisclosure: { isOpen: boolean; onClose: () => void };
  loading: boolean;
}

export const EditLoteModal = ({
  lote,
  useDisclosure: { isOpen, onClose },
  loading,
}: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      cantidad_producto: lote.cantidad_producto ?? 0,
      precio_kg: lote.precio_kg ?? 0,
      fecha_entrada: new Date(lote.fecha_entrada) ?? new Date(),
      fecha_vencimiento: new Date(lote.fecha_vencimiento) ?? new Date(),
      dias_aviso: lote.dias_aviso ?? 0,
      tipo_almacenaje: lote.tipo_almacenaje ?? TipoAlmacenaje.Huacal ?? "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [valueFechaEntrada, setValueFechaEntrada] = useState(
    parseDate(lote.fecha_entrada.split("T")[0])
  );
  const [valueFechaVencimiento, setValueFechaVencimiento] = useState(
    parseDate(lote.fecha_vencimiento.split("T")[0])
  );
  let formatter = useDateFormatter({ dateStyle: "full" });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      await hrApi
        .put(`/store/inventory/batch/${lote?.id_lote}`, data)
        .then((res) => {
          if (res.status === 200) {
            toast("Producto actualizado", SUCCESS_TOAST);
            window.location.reload();
            router.refresh();
            onClose();
          }
        })
        .catch((error) => {
          console.log("Error al actualizar producto", error);
          toast("Hubo un error al actualizar el producto", DANGER_TOAST);
        });
    } catch (error) {
      console.log("Error al actualizar producto", error);
      toast("Hubo un error al actualizar el producto", DANGER_TOAST);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsEditing(false);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {loading ? (
              <ModalBody>
                <div className="flex justify-center items-center">
                  <CircularProgress />
                </div>
              </ModalBody>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col">
                  Editar {lote.producto.nombre_producto}
                  <Button
                    type="button"
                    className="mt-2"
                    onClick={() => setIsEditing(!isEditing)}
                    startContent={<FaEdit size={20} />}
                  >
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Cantidad en kg"
                      type="number"
                      {...register("cantidad_producto", {
                        valueAsNumber: true,
                      })}
                      defaultValue={lote.cantidad_producto.toString()}
                      isDisabled={!isEditing}
                    />
                    {errors?.cantidad_producto && (
                      <span className="text-red-500">
                        {errors?.cantidad_producto?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Precio por kg"
                      type="number"
                      {...register("precio_kg", { valueAsNumber: true })}
                      defaultValue={lote?.precio_kg?.toString()}
                      isDisabled={!isEditing}
                    />
                    {errors?.precio_kg && (
                      <span className="text-red-500">
                        {errors?.precio_kg?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <I18nProvider locale="es-MX">
                      <DatePicker
                        label="Fecha de llegada"
                        showMonthAndYearPickers
                        minValue={today(getLocalTimeZone())}
                        defaultValue={parseDate(
                          lote.fecha_entrada.split("T")[0]
                        )}
                        value={valueFechaEntrada}
                        onChange={(date) => {
                          setValueFechaEntrada(date);
                          setValue(
                            "fecha_entrada",
                            date.toDate(getLocalTimeZone())
                          );
                        }}
                        isDisabled={!isEditing}
                      />
                    </I18nProvider>
                    {errors?.fecha_entrada && (
                      <span className="text-red-500">
                        {errors?.fecha_entrada?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <I18nProvider locale="es-MX">
                      <DatePicker
                        label="Fecha de duración aproximada en estado fresco"
                        showMonthAndYearPickers
                        minValue={today(getLocalTimeZone())}
                        defaultValue={parseDate(
                          lote.fecha_vencimiento.split("T")[0]
                        )}
                        value={valueFechaVencimiento}
                        onChange={(date) => {
                          setValueFechaVencimiento(date);
                          setValue(
                            "fecha_vencimiento",
                            date.toDate(getLocalTimeZone())
                          );
                        }}
                        isDisabled={!isEditing}
                      />
                    </I18nProvider>
                    {errors?.fecha_vencimiento && (
                      <span className="text-red-500">
                        {errors?.fecha_vencimiento?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Dias de aviso antes de vencimiento"
                      type="number"
                      defaultValue={lote.dias_aviso.toString()}
                      isDisabled={!isEditing}
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
                  <div className="flex flex-col gap-2">
                    <Select
                      label="Tipo de almacenaje"
                      {...register("tipo_almacenaje")}
                      defaultSelectedKeys={[
                        lote?.tipo_almacenaje.toString() as string,
                      ]}
                      isDisabled={!isEditing}
                    >
                      {Object.values(TipoAlmacenaje).map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      setIsEditing(false);
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600"
                    isDisabled={!isEditing}
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </form>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
