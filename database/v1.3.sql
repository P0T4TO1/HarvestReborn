-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema harvest_reborn_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema harvest_reborn_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `harvest_reborn_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `harvest_reborn_db` ;

-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`c_historial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`c_historial` (
  `id_historial` INT NOT NULL AUTO_INCREMENT,
  `id_user` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_historial`),
  INDEX `c_historial_id_user_idx` (`id_user` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`c_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`c_inventario` (
  `id_inventario` INT NOT NULL AUTO_INCREMENT,
  `id_negocio` INT NOT NULL,
  PRIMARY KEY (`id_inventario`),
  UNIQUE INDEX `c_inventario_id_negocio_key` (`id_negocio` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`c_preguntasfrecuentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`c_preguntasfrecuentes` (
  `id_prefrec` INT NOT NULL AUTO_INCREMENT,
  `pregunta` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_prefrec`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`c_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`c_proveedor` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` VARCHAR(191) NOT NULL,
  `telefono_proveedor` VARCHAR(191) NOT NULL,
  `email_proveedor` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_proveedor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`c_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`c_rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`d_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`d_cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nombre_cliente` VARCHAR(191) NOT NULL,
  `apellidos_cliente` VARCHAR(191) NOT NULL,
  `telefono_cliente` VARCHAR(191) NOT NULL,
  `fecha_nacimiento` DATETIME(3) NOT NULL,
  `nombre_negocio` VARCHAR(191) NULL DEFAULT NULL,
  `direccion_negocio` VARCHAR(191) NULL DEFAULT NULL,
  `id_user` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  INDEX `d_cliente_id_user_idx` (`id_user` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`d_duenonegocio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`d_duenonegocio` (
  `id_dueneg` INT NOT NULL AUTO_INCREMENT,
  `nombre_dueneg` VARCHAR(191) NOT NULL,
  `apellidos_dueneg` VARCHAR(191) NOT NULL,
  `fecha_nacimiento` DATETIME(3) NOT NULL,
  `id_user` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_dueneg`),
  INDEX `d_duenonegocio_id_user_idx` (`id_user` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`d_faqrespuestas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`d_faqrespuestas` (
  `id_faqRespuesta` INT NOT NULL AUTO_INCREMENT,
  `id_prefrec` INT NOT NULL,
  `respuesta` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_faqRespuesta`),
  INDEX `d_faqRespuestas_id_prefrec_idx` (`id_prefrec` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`d_mensajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`d_mensajes` (
  `id_mensajes` INT NOT NULL AUTO_INCREMENT,
  `cuerpo_mensaje` VARCHAR(400) NOT NULL,
  `tipo_mensaje` ENUM('TEXTO', 'IMAGEN', 'VIDEO', 'AUDIO', 'DOCUMENTO') NOT NULL DEFAULT 'TEXTO',
  `leido` TINYINT(1) NOT NULL DEFAULT '0',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `deletedAt` DATETIME(3) NULL DEFAULT NULL,
  `id_chat` INT NOT NULL,
  `id_user` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_mensajes`),
  INDEX `d_mensajes_id_chat_idx` (`id_chat` ASC) VISIBLE,
  INDEX `d_mensajes_id_user_idx` (`id_user` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`d_orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`d_orden` (
  `id_orden` INT NOT NULL AUTO_INCREMENT,
  `fecha_orden` DATETIME(3) NOT NULL,
  `hora_orden` DATETIME(3) NOT NULL,
  `monto_subtotal` DOUBLE NOT NULL,
  `monto_total` DOUBLE NOT NULL,
  `estado_orden` ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
  `id_cliente` INT NOT NULL,
  `id_historial` INT NOT NULL,
  `id_negocio` INT NOT NULL,
  PRIMARY KEY (`id_orden`),
  INDEX `d_orden_id_cliente_idx` (`id_cliente` ASC) VISIBLE,
  INDEX `d_orden_id_historial_idx` (`id_historial` ASC) VISIBLE,
  INDEX `d_orden_id_negocio_idx` (`id_negocio` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`d_participantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`d_participantes` (
  `id_participantes` INT NOT NULL AUTO_INCREMENT,
  `id_user` VARCHAR(191) NOT NULL,
  `id_chat` INT NOT NULL,
  PRIMARY KEY (`id_participantes`),
  INDEX `d_participantes_id_user_idx` (`id_user` ASC) VISIBLE,
  INDEX `d_participantes_id_chat_idx` (`id_chat` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_chat` (
  `id_chat` INT NOT NULL AUTO_INCREMENT,
  `nombre_chat` VARCHAR(191) NOT NULL,
  `fecha_creacion` DATETIME(3) NOT NULL,
  `id_user_creator` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_chat`),
  INDEX `m_chat_id_user_creator_idx` (`id_user_creator` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_lote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_lote` (
  `id_lote` INT NOT NULL AUTO_INCREMENT,
  `cantidad_producto` INT NOT NULL,
  `fecha_entrada` DATETIME(3) NOT NULL,
  `fecha_vencimiento` DATETIME(3) NOT NULL,
  `precio_kg` DOUBLE NOT NULL,
  `monto_total` DOUBLE NOT NULL,
  `id_inventario` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `id_proveedor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_lote`),
  INDEX `m_lote_id_inventario_idx` (`id_inventario` ASC) VISIBLE,
  INDEX `m_lote_id_producto_idx` (`id_producto` ASC) VISIBLE,
  INDEX `m_lote_id_proveedor_idx` (`id_proveedor` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_negocio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_negocio` (
  `id_negocio` INT NOT NULL AUTO_INCREMENT,
  `nombre_negocio` VARCHAR(191) NOT NULL,
  `direccion_negocio` VARCHAR(191) NOT NULL,
  `telefono_negocio` VARCHAR(191) NOT NULL,
  `email_negocio` VARCHAR(191) NULL DEFAULT NULL,
  `id_dueneg` INT NOT NULL,
  PRIMARY KEY (`id_negocio`),
  UNIQUE INDEX `m_negocio_id_dueneg_key` (`id_dueneg` ASC) VISIBLE,
  INDEX `m_negocio_id_dueneg_idx` (`id_dueneg` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_prodcutoorden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_prodcutoorden` (
  `id_productoOrden` INT NOT NULL AUTO_INCREMENT,
  `cantidad_orden` INT NOT NULL,
  `monto_subtotal` DOUBLE NOT NULL,
  `monto_total` DOUBLE NOT NULL,
  `id_orden` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `id_negocio` INT NOT NULL,
  PRIMARY KEY (`id_productoOrden`),
  INDEX `m_prodcutoOrden_id_orden_idx` (`id_orden` ASC) VISIBLE,
  INDEX `m_prodcutoOrden_id_producto_idx` (`id_producto` ASC) VISIBLE,
  INDEX `m_prodcutoOrden_id_negocio_idx` (`id_negocio` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(191) NOT NULL,
  `imagen_producto` VARCHAR(191) NOT NULL,
  `descripcion` VARCHAR(191) NULL DEFAULT NULL,
  `enTemporada` TINYINT(1) NOT NULL,
  `categoria` ENUM('FRUTA', 'VERDURA') NOT NULL DEFAULT 'VERDURA',
  PRIMARY KEY (`id_producto`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_ticketsoporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_ticketsoporte` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(191) NOT NULL,
  `descripcion` VARCHAR(191) NOT NULL,
  `images` VARCHAR(191) NOT NULL,
  `fecha_creacion` DATETIME(3) NOT NULL,
  `fecha_cierre` DATETIME(3) NOT NULL,
  `estado_ticket` ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
  `id_user` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_ticket`),
  INDEX `m_ticketSoporte_id_user_idx` (`id_user` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `harvest_reborn_db`.`m_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harvest_reborn_db`.`m_user` (
  `id` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `estado` ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `m_user_email_key` (`email` ASC) VISIBLE,
  INDEX `m_user_id_rol_idx` (`id_rol` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
