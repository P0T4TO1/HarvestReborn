'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Image,
  Textarea,
} from '@nextui-org/react';

import { toast } from 'sonner';
import { DANGER_TOAST } from '@/components';

import { hrApi } from '@/api';
import { IPublicacion } from '@/interfaces';
import { chatHrefConstructor } from '@/utils/cn';

interface Props {
  publication: IPublicacion;
  useDisclosure: { isOpen: boolean; onClose: () => void };
  id_user: string;
}

export const SendMessageModal = ({
  publication,
  useDisclosure: { isOpen, onClose },
  id_user,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onContact = async (id_user: string, id_dueneg: string) => {
    if (!message) {
      return setErrorMessage('Debes escribir un mensaje');
    }

    setIsLoading(true);
    await hrApi
      .post(`/chat`, {
        userId: id_user,
        userId2: id_dueneg,
        chatName: `Chat entre ${id_user} y ${id_dueneg}`,
        chatId: chatHrefConstructor(id_user, id_dueneg),
      })
      .then(async ({ data }) => {
        if (data.message === 'Chat ya existe') {
          await hrApi
            .post(`/chat/message/send`, {
              text: message,
              chatId: data.id_chat,
              isLinkedPublication: true,
              publicationId: publication.id_publicacion,
            })
            .then(() => {
              setIsLoading(false);
              onClose();
              return router.push(
                `/chats/chat/${chatHrefConstructor(id_user, id_dueneg)}`
              );
            })
            .catch(() => {
              setIsLoading(false);
              return toast(
                'Ocurrió un error al intentar enviar el mensaje',
                DANGER_TOAST
              );
            });
        }
        await hrApi
          .post(`/chat/message/send`, {
            text: message,
            chatId: data.id_chat,
            isLinkedPublication: true,
            publicationId: publication.id_publicacion,
          })
          .then(() => {
            setIsLoading(false);
            onClose();
            return router.push(
              `/chats/chat/${chatHrefConstructor(id_user, id_dueneg)}`
            );
          })
          .catch(() => {
            setIsLoading(false);
            return toast(
              'Ocurrió un error al intentar enviar el mensaje',
              DANGER_TOAST
            );
          });
      })
      .catch(() => {
        return toast(
          'Ocurrió un error al intentar enviar el mensaje',
          DANGER_TOAST
        );
      });
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>
          <h2 className="text-lg font-semibold">
            Enviar mensaje a {publication.negocio.nombre_negocio}
          </h2>
        </ModalHeader>
        <Divider />
        <ModalBody className="mt-2">
          <div>
            <div className="flex items-center">
              <Image
                src={publication.images_publicacion[0]}
                alt={publication.titulo_publicacion}
                width={100}
                height={100}
                radius="md"
              />
              <div className="flex flex-col">
                <h3 className="ml-2 text-lg font-semibold">
                  {publication.titulo_publicacion}
                </h3>
                <p className="ml-2 text-sm text-default-700">
                  ${publication.precio_publicacion}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                radius="full"
                className="m-2 ml-0"
                onPress={() => setMessage('Me interesa este producto')}
              >
                Me interesa este producto
              </Button>
              <Button
                radius="full"
                className="m-2 ml-0"
                onPress={() => setMessage('¿Sigue estando disponible?')}
              >
                ¿Sigue estando disponible?
              </Button>
              <Button
                radius="full"
                className="m-2 ml-0"
                onPress={() => setMessage('¿Cómo seria la entrega?')}
              >
                ¿Cómo seria la entrega?
              </Button>
            </div>
            <div className="flex flex-col mt-4">
              <Textarea
                label="Escribe tu mensaje"
                className="mt-4"
                rows={8}
                value={message}
                onValueChange={setMessage}
              />
              {errorMessage && (
                <p className="text-sm text-danger-500 mt-2">{errorMessage}</p>
              )}
              <p className="text-sm text-default-500 mt-2">
                No compartas tu correo electrónico, número de teléfono ni
                información financiera.
              </p>
            </div>
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button
            onPress={() => onClose()}
            isDisabled={isLoading}
            variant="flat"
            color="danger"
          >
            Cerrar
          </Button>
          <Button
            onClick={() =>
              onContact(id_user, publication.negocio.dueneg.id_user)
            }
            isLoading={isLoading}
          >
            Enviar mensaje
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
