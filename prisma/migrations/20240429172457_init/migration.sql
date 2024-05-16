/*
  Warnings:

  - You are about to drop the column `id_user` on the `c_historial` table. All the data in the column will be lost.
  - The primary key for the `d_mensajes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_mensajes` on the `d_mensajes` table. All the data in the column will be lost.
  - The primary key for the `d_orden` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `monto_subtotal` on the `d_orden` table. All the data in the column will be lost.
  - The `estado_orden` column on the `d_orden` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `m_chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_negocio` on the `m_prodcutoOrden` table. All the data in the column will be lost.
  - You are about to drop the column `monto_subtotal` on the `m_prodcutoOrden` table. All the data in the column will be lost.
  - You are about to drop the column `monto_total` on the `m_prodcutoOrden` table. All the data in the column will be lost.
  - The `images` column on the `m_ticketSoporte` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado_ticket` column on the `m_ticketSoporte` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id_cliente]` on the table `c_historial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_negocio]` on the table `c_historial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `d_cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `d_duenonegocio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailVerificationToken]` on the table `m_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetPasswordToken]` on the table `m_user` will be added. If there are existing duplicate values, this will fail.
  - The required column `id_mensaje` was added to the `d_mensajes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `d_orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `m_negocio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_lote` to the `m_prodcutoOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monto` to the `m_prodcutoOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `m_prodcutoOrden` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoLote" AS ENUM ('ACTIVO', 'VENDIDO', 'VENCIDO', 'TERMINADO');

-- CreateEnum
CREATE TYPE "Disponibilidad" AS ENUM ('EN_VENTA', 'DONACION', 'VENDIDO', 'DONADO');

-- CreateEnum
CREATE TYPE "TipoAlmacenaje" AS ENUM ('HUACAL', 'BOLSA', 'CAJA', 'CANASTA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoOrden" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EstadoTicket" AS ENUM ('PENDIENTE', 'ACTIVO', 'CERRADO');

-- CreateEnum
CREATE TYPE "TipoPregunta" AS ENUM ('GENERAL', 'CUENTA', 'NEGOCIO', 'CLIENTE', 'DUENONEGOCIO', 'ORDEN', 'PRODUCTOS', 'INVENTARIO', 'CHAT');

-- AlterEnum
ALTER TYPE "Estado" ADD VALUE 'PENDIENTE';

-- DropIndex
DROP INDEX "c_historial_id_user_idx";

-- DropIndex
DROP INDEX "m_prodcutoOrden_id_negocio_idx";

-- AlterTable
ALTER TABLE "c_historial" DROP COLUMN "id_user",
ADD COLUMN     "id_cliente" INTEGER,
ADD COLUMN     "id_negocio" INTEGER;

-- AlterTable
ALTER TABLE "c_preguntasFrecuentes" ADD COLUMN     "tipo" "TipoPregunta" NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE "d_mensajes" DROP CONSTRAINT "d_mensajes_pkey",
DROP COLUMN "id_mensajes",
ADD COLUMN     "id_mensaje" TEXT NOT NULL,
ALTER COLUMN "id_chat" SET DATA TYPE TEXT,
ADD CONSTRAINT "d_mensajes_pkey" PRIMARY KEY ("id_mensaje");

-- AlterTable
ALTER TABLE "d_orden" DROP CONSTRAINT "d_orden_pkey",
DROP COLUMN "monto_subtotal",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id_orden" DROP DEFAULT,
ALTER COLUMN "id_orden" SET DATA TYPE TEXT,
DROP COLUMN "estado_orden",
ADD COLUMN     "estado_orden" "EstadoOrden" NOT NULL DEFAULT 'PENDIENTE',
ALTER COLUMN "id_historial" DROP NOT NULL,
ADD CONSTRAINT "d_orden_pkey" PRIMARY KEY ("id_orden");
DROP SEQUENCE "d_orden_id_orden_seq";

-- AlterTable
ALTER TABLE "d_participantes" ALTER COLUMN "id_chat" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "m_chat" DROP CONSTRAINT "m_chat_pkey",
ALTER COLUMN "id_chat" DROP DEFAULT,
ALTER COLUMN "id_chat" SET DATA TYPE TEXT,
ADD CONSTRAINT "m_chat_pkey" PRIMARY KEY ("id_chat");
DROP SEQUENCE "m_chat_id_chat_seq";

-- AlterTable
ALTER TABLE "m_lote" ADD COLUMN     "disponibilidad" "Disponibilidad" NOT NULL DEFAULT 'EN_VENTA',
ADD COLUMN     "estado_lote" "EstadoLote" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "id_publicacion" INTEGER,
ADD COLUMN     "last_cantidad" INTEGER DEFAULT 0,
ADD COLUMN     "last_monto_total" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "last_precio_kg" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "tipo_almacenaje" "TipoAlmacenaje" NOT NULL DEFAULT 'OTRO';

-- AlterTable
ALTER TABLE "m_negocio" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "descripcion_negocio" TEXT,
ADD COLUMN     "estado_negocio" "Estado" NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "images_negocio" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "m_prodcutoOrden" DROP COLUMN "id_negocio",
DROP COLUMN "monto_subtotal",
DROP COLUMN "monto_total",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "id_lote" INTEGER NOT NULL,
ADD COLUMN     "monto" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id_orden" DROP NOT NULL,
ALTER COLUMN "id_orden" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "m_ticketSoporte" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[],
DROP COLUMN "estado_ticket",
ADD COLUMN     "estado_ticket" "EstadoTicket" NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "m_user" ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oAuthId" TEXT,
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;

-- CreateTable
CREATE TABLE "m_publicaciones" (
    "id_publicacion" SERIAL NOT NULL,
    "id_negocio" INTEGER NOT NULL,
    "titulo_publicacion" TEXT NOT NULL,
    "descripcion_publicacion" VARCHAR(400) NOT NULL,
    "images_publicacion" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "disponibilidad" "Disponibilidad" NOT NULL DEFAULT 'EN_VENTA',
    "estado_publicacion" "Estado" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "m_publicaciones_pkey" PRIMARY KEY ("id_publicacion")
);

-- CreateIndex
CREATE INDEX "m_publicaciones_id_negocio_idx" ON "m_publicaciones"("id_negocio");

-- CreateIndex
CREATE UNIQUE INDEX "c_historial_id_cliente_key" ON "c_historial"("id_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "c_historial_id_negocio_key" ON "c_historial"("id_negocio");

-- CreateIndex
CREATE UNIQUE INDEX "d_cliente_id_user_key" ON "d_cliente"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "d_duenonegocio_id_user_key" ON "d_duenonegocio"("id_user");

-- CreateIndex
CREATE INDEX "m_lote_id_publicacion_idx" ON "m_lote"("id_publicacion");

-- CreateIndex
CREATE INDEX "m_prodcutoOrden_id_lote_idx" ON "m_prodcutoOrden"("id_lote");

-- CreateIndex
CREATE UNIQUE INDEX "m_user_emailVerificationToken_key" ON "m_user"("emailVerificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "m_user_resetPasswordToken_key" ON "m_user"("resetPasswordToken");
