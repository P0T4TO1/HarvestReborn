'use client';

import React, { ChangeEvent, useState, DragEvent, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { INegocio } from '@/interfaces';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  CircularProgress,
} from '@nextui-org/react';
import { FaX } from 'react-icons/fa6';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { IFormDataStoreSettings } from '@/components/stores';

interface ImagesDataProps {
  negocio: INegocio;
}

export const ImagesForm = ({ negocio }: ImagesDataProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<IFormDataStoreSettings>();

  const toDataURL = (url: string) =>
    fetch(url).then(async (response) => {
      const contentType = response.headers.get('content-type');
      const blob = await response.blob();
      const file = new File([blob], 'image.png', {
        type: contentType?.toString(),
      });
      return file;
    });

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      const imagesPromises = negocio.images_negocio.map((url) =>
        toDataURL(url)
      );
      const imagesFiles = await Promise.all(imagesPromises);
      setImages([...imagesFiles, ...(getValues('images_files') || [])]);
      setIsLoading(false);
    };
    fetchImages();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setImages((prevFiles: File[]) => [...prevFiles, ...newFiles]);
      setValue('images_files', [...newFiles, ...images]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setImages((prevFiles: File[]) => [...prevFiles, ...newFiles]);
      setValue('images_files', [...newFiles, ...images]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setValue(
      'images_files',
      watch('images_files')?.filter((_, i) => i !== index)
    );
  };

  return (
    <div id={'imagenes'}>
      <Card className="p-6">
        <CardHeader className="flex justify-between">
          <h4 className="text-lg font-semibold">Imágenes de tu negocio</h4>
        </CardHeader>
        <CardBody>
          <>
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-48">
                <CircularProgress size="lg" />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-600">
                  Agrega las imágenes de tu negocio
                </p>
                <h4 className="text-sm dark:text-gray-300">
                  Imágenes - {images.length}
                  /10 - (Máximo 10 imágenes)
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
                        aria-disabled="true"
                      >
                        <IoCloudUploadOutline className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                          <span className="font-semibold">
                            Agrega imágenes haciendo clic
                          </span>{' '}
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
                        disabled={!watch('isEditing')}
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
                          <span className="font-semibold">
                            Agregar más imágenes
                          </span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={!watch('isEditing')}
                      />
                    </label>
                  </div>
                )}
                {errors.images_files && (
                  <span className="text-red-500 text-sm">
                    {errors.images_files.message}
                  </span>
                )}
              </div>
            )}
          </>
        </CardBody>
      </Card>
    </div>
  );
};
