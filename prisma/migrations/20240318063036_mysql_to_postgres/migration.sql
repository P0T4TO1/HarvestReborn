-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('FRUTA', 'VERDURA');

-- CreateEnum
CREATE TYPE "tipo_mensaje" AS ENUM ('TEXTO', 'IMAGEN', 'VIDEO', 'AUDIO', 'DOCUMENTO');

-- CreateTable
CREATE TABLE "m_user" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',
    "id_rol" INTEGER NOT NULL,

    CONSTRAINT "m_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre_rol" TEXT NOT NULL,

    CONSTRAINT "c_rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "d_cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nombre_cliente" TEXT NOT NULL,
    "apellidos_cliente" TEXT NOT NULL,
    "telefono_cliente" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "nombre_negocio" TEXT,
    "direccion_negocio" TEXT,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "d_cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "d_duenonegocio" (
    "id_dueneg" SERIAL NOT NULL,
    "nombre_dueneg" TEXT NOT NULL,
    "apellidos_dueneg" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "d_duenonegocio_pkey" PRIMARY KEY ("id_dueneg")
);

-- CreateTable
CREATE TABLE "m_negocio" (
    "id_negocio" SERIAL NOT NULL,
    "nombre_negocio" TEXT NOT NULL,
    "direccion_negocio" TEXT NOT NULL,
    "telefono_negocio" TEXT NOT NULL,
    "email_negocio" TEXT,
    "id_dueneg" INTEGER NOT NULL,

    CONSTRAINT "m_negocio_pkey" PRIMARY KEY ("id_negocio")
);

-- CreateTable
CREATE TABLE "c_inventario" (
    "id_inventario" SERIAL NOT NULL,
    "id_negocio" INTEGER NOT NULL,

    CONSTRAINT "c_inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "m_lote" (
    "id_lote" SERIAL NOT NULL,
    "cantidad_producto" INTEGER NOT NULL,
    "fecha_entrada" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "precio_kg" DOUBLE PRECISION NOT NULL,
    "monto_total" DOUBLE PRECISION NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_proveedor" INTEGER,

    CONSTRAINT "m_lote_pkey" PRIMARY KEY ("id_lote")
);

-- CreateTable
CREATE TABLE "m_producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre_producto" TEXT NOT NULL,
    "imagen_producto" TEXT NOT NULL,
    "descripcion" TEXT,
    "enTemporada" BOOLEAN NOT NULL,
    "categoria" "Categoria" NOT NULL DEFAULT 'VERDURA',

    CONSTRAINT "m_producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "c_proveedor" (
    "id_proveedor" SERIAL NOT NULL,
    "nombre_proveedor" TEXT NOT NULL,
    "telefono_proveedor" TEXT NOT NULL,
    "email_proveedor" TEXT NOT NULL,

    CONSTRAINT "c_proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "m_prodcutoOrden" (
    "id_productoOrden" SERIAL NOT NULL,
    "cantidad_orden" INTEGER NOT NULL,
    "monto_subtotal" DOUBLE PRECISION NOT NULL,
    "monto_total" DOUBLE PRECISION NOT NULL,
    "id_orden" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_negocio" INTEGER NOT NULL,

    CONSTRAINT "m_prodcutoOrden_pkey" PRIMARY KEY ("id_productoOrden")
);

-- CreateTable
CREATE TABLE "d_orden" (
    "id_orden" SERIAL NOT NULL,
    "fecha_orden" TIMESTAMP(3) NOT NULL,
    "hora_orden" TIMESTAMP(3) NOT NULL,
    "monto_subtotal" DOUBLE PRECISION NOT NULL,
    "monto_total" DOUBLE PRECISION NOT NULL,
    "estado_orden" "Estado" NOT NULL DEFAULT 'ACTIVO',
    "id_cliente" INTEGER NOT NULL,
    "id_historial" INTEGER NOT NULL,
    "id_negocio" INTEGER NOT NULL,

    CONSTRAINT "d_orden_pkey" PRIMARY KEY ("id_orden")
);

-- CreateTable
CREATE TABLE "c_historial" (
    "id_historial" SERIAL NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "c_historial_pkey" PRIMARY KEY ("id_historial")
);

-- CreateTable
CREATE TABLE "m_ticketSoporte" (
    "id_ticket" SERIAL NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,
    "fecha_cierre" TIMESTAMP(3) NOT NULL,
    "estado_ticket" "Estado" NOT NULL DEFAULT 'ACTIVO',
    "id_user" TEXT NOT NULL,

    CONSTRAINT "m_ticketSoporte_pkey" PRIMARY KEY ("id_ticket")
);

-- CreateTable
CREATE TABLE "d_faqRespuestas" (
    "id_faqRespuesta" SERIAL NOT NULL,
    "id_prefrec" INTEGER NOT NULL,
    "respuesta" TEXT NOT NULL,

    CONSTRAINT "d_faqRespuestas_pkey" PRIMARY KEY ("id_faqRespuesta")
);

-- CreateTable
CREATE TABLE "c_preguntasFrecuentes" (
    "id_prefrec" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,

    CONSTRAINT "c_preguntasFrecuentes_pkey" PRIMARY KEY ("id_prefrec")
);

-- CreateTable
CREATE TABLE "d_participantes" (
    "id_participantes" SERIAL NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_chat" INTEGER NOT NULL,

    CONSTRAINT "d_participantes_pkey" PRIMARY KEY ("id_participantes")
);

-- CreateTable
CREATE TABLE "m_chat" (
    "id_chat" SERIAL NOT NULL,
    "nombre_chat" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,
    "id_user_creator" TEXT NOT NULL,

    CONSTRAINT "m_chat_pkey" PRIMARY KEY ("id_chat")
);

-- CreateTable
CREATE TABLE "d_mensajes" (
    "id_mensajes" SERIAL NOT NULL,
    "cuerpo_mensaje" VARCHAR(400) NOT NULL,
    "tipo_mensaje" "tipo_mensaje" NOT NULL DEFAULT 'TEXTO',
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "id_chat" INTEGER NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "d_mensajes_pkey" PRIMARY KEY ("id_mensajes")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_user_email_key" ON "m_user"("email");

-- CreateIndex
CREATE INDEX "m_user_id_rol_idx" ON "m_user"("id_rol");

-- CreateIndex
CREATE INDEX "d_cliente_id_user_idx" ON "d_cliente"("id_user");

-- CreateIndex
CREATE INDEX "d_duenonegocio_id_user_idx" ON "d_duenonegocio"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "m_negocio_id_dueneg_key" ON "m_negocio"("id_dueneg");

-- CreateIndex
CREATE INDEX "m_negocio_id_dueneg_idx" ON "m_negocio"("id_dueneg");

-- CreateIndex
CREATE UNIQUE INDEX "c_inventario_id_negocio_key" ON "c_inventario"("id_negocio");

-- CreateIndex
CREATE INDEX "m_lote_id_inventario_idx" ON "m_lote"("id_inventario");

-- CreateIndex
CREATE INDEX "m_lote_id_producto_idx" ON "m_lote"("id_producto");

-- CreateIndex
CREATE INDEX "m_lote_id_proveedor_idx" ON "m_lote"("id_proveedor");

-- CreateIndex
CREATE INDEX "m_prodcutoOrden_id_orden_idx" ON "m_prodcutoOrden"("id_orden");

-- CreateIndex
CREATE INDEX "m_prodcutoOrden_id_producto_idx" ON "m_prodcutoOrden"("id_producto");

-- CreateIndex
CREATE INDEX "m_prodcutoOrden_id_negocio_idx" ON "m_prodcutoOrden"("id_negocio");

-- CreateIndex
CREATE INDEX "d_orden_id_cliente_idx" ON "d_orden"("id_cliente");

-- CreateIndex
CREATE INDEX "d_orden_id_historial_idx" ON "d_orden"("id_historial");

-- CreateIndex
CREATE INDEX "d_orden_id_negocio_idx" ON "d_orden"("id_negocio");

-- CreateIndex
CREATE INDEX "c_historial_id_user_idx" ON "c_historial"("id_user");

-- CreateIndex
CREATE INDEX "m_ticketSoporte_id_user_idx" ON "m_ticketSoporte"("id_user");

-- CreateIndex
CREATE INDEX "d_faqRespuestas_id_prefrec_idx" ON "d_faqRespuestas"("id_prefrec");

-- CreateIndex
CREATE INDEX "d_participantes_id_user_idx" ON "d_participantes"("id_user");

-- CreateIndex
CREATE INDEX "d_participantes_id_chat_idx" ON "d_participantes"("id_chat");

-- CreateIndex
CREATE INDEX "m_chat_id_user_creator_idx" ON "m_chat"("id_user_creator");

-- CreateIndex
CREATE INDEX "d_mensajes_id_chat_idx" ON "d_mensajes"("id_chat");

-- CreateIndex
CREATE INDEX "d_mensajes_id_user_idx" ON "d_mensajes"("id_user");
