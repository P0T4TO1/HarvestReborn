import Image from "next/image";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex flex-col lg:flex-row lg:space-x-16 lg:space-x-reverse">
          <div className="order-1 max-w-md px-2 text-sm md:text-base lg:px-0">
            <header className="mb-6">
              <h2 className="text-4xl font-bold leading-none text-gray-400 select-none lg:text-6xl">
                404.
              </h2>
              <h3 className="text-xl font-light leading-normal lg:text-3xl md:text-3xl">
                Lo sentimos, no pudimos encontrar la página que buscas.
              </h3>
            </header>

            <p className="max-w-sm mb-5 leading-5 md:leading-7">
              Es posible que la página haya sido eliminada o que hayas ingresado
              una URL incorrecta. Puedes volver a la página de inicio o
              informarnos sobre el problema.
            </p>
            <NextLink href="/home">
              <button className="inline px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700">
                Ir a la página de inicio
              </button>
            </NextLink>
          </div>

          <div className="max-w-lg">
            <Image
              src={"/images/404-error-cat.png"}
              alt={"cat-404"}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
}
