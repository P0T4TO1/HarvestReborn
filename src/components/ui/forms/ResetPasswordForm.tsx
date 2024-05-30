'use client';

import React, { useState } from 'react';
import { hrApi } from '@/api';
import { resetPassword } from '@/actions';
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Link,
} from '@nextui-org/react';
import { FaChevronLeft } from 'react-icons/fa';

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>(
    'Restablecer contraseña'
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email) {
      setError('El correo electrónico es requerido');
      setLoading(false);
      return;
    } else {
      setError('');
    }
    setLoading(true);
    setMessage('Enviando correo electrónico..');
    const response = await resetPassword(email);
    if (response?.message === 'No se pudo enviar el correo electrónico - intente de nuevo') {
      setError('No se pudo enviar el correo electrónico - intente de nuevo mas tarde');
      setLoading(false);
      return;
    } else {
      setError('');
      setMessage('Correo electrónico enviado con éxito');
      setButtonText('Volver a enviar correo');
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 shadow-xl">
        <Card className="p-6 mx-auto w-[386px]">
          <CardHeader className="flex flex-col">
            <h3 className="font-semibold text-2xl dark:text-gray-200 text-gray-800">
              Restablecer contraseña{' '}
            </h3>
            <p className="text-gray-500 text-sm mt-4">
              Ingrese su dirección de correo electrónico y le enviaremos un
              enlace para restablecer su contraseña.
            </p>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                color="secondary"
                variant="bordered"
                onClick={handleSubmit}
                isLoading={loading}
              >
                {buttonText}
              </Button>
              <p>{message}</p>
              <p className="text-gray-500 text-sm mt-4">
                Si no encuentra el correo es posible que este en la sección de
                spam(correo no deseado)
              </p>
            </div>
          </CardBody>
          <CardFooter>
            <Link href={'/auth/login'}>
              <Button
                startContent={<FaChevronLeft size={20} />}
                color="primary"
              >
                Regresar
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
