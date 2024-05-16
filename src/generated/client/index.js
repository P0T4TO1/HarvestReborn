
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.2
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.2",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TicketScalarFieldEnum = {
  id_ticket: 'id_ticket',
  tipo: 'tipo',
  estado: 'estado',
  prioridad: 'prioridad',
  motivo: 'motivo',
  descripcion: 'descripcion',
  fecha_inicio: 'fecha_inicio',
  fecha_cierre: 'fecha_cierre',
  respuesta: 'respuesta',
  id_user: 'id_user'
};

exports.Prisma.TicketComentarioScalarFieldEnum = {
  id_comentario: 'id_comentario',
  id_ticket: 'id_ticket',
  comentario: 'comentario',
  fecha: 'fecha'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  apellidos: 'apellidos',
  email: 'email'
};

exports.Prisma.RespuestasFaqScalarFieldEnum = {
  id_faqRespuesta: 'id_faqRespuesta',
  id_prefrec: 'id_prefrec',
  respuesta: 'respuesta'
};

exports.Prisma.PreguntasFrecuentesScalarFieldEnum = {
  id_prefrec: 'id_prefrec',
  pregunta: 'pregunta',
  tipo: 'tipo'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Tipo = exports.$Enums.Tipo = {
  INCIDENCIA: 'INCIDENCIA',
  PETICION: 'PETICION',
  QUEJA: 'QUEJA',
  RECLAMACION: 'RECLAMACION'
};

exports.Estado = exports.$Enums.Estado = {
  ABIERTO: 'ABIERTO',
  EN_PROCESO: 'EN_PROCESO',
  CERRADO: 'CERRADO'
};

exports.Prioridad = exports.$Enums.Prioridad = {
  BAJA: 'BAJA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
  INMEDIATA: 'INMEDIATA'
};

exports.TipoPregunta = exports.$Enums.TipoPregunta = {
  GENERAL: 'GENERAL',
  CUENTA: 'CUENTA',
  NEGOCIO: 'NEGOCIO',
  CLIENTE: 'CLIENTE',
  DUENONEGOCIO: 'DUENONEGOCIO',
  ORDENES: 'ORDENES',
  PRODUCTOS: 'PRODUCTOS',
  INVENTARIO: 'INVENTARIO',
  CHAT: 'CHAT',
  PUBLICACIONES: 'PUBLICACIONES',
  TECNICO: 'TECNICO'
};

exports.Prisma.ModelName = {
  Ticket: 'Ticket',
  TicketComentario: 'TicketComentario',
  User: 'User',
  RespuestasFaq: 'RespuestasFaq',
  PreguntasFrecuentes: 'PreguntasFrecuentes'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Usuarios\\Jaret\\Documents\\CECyT 9\\Sexto semestre\\Proyecto Aula\\WebApp\\HarvestReborn_PA\\src\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma-second",
  "clientVersion": "5.10.2",
  "engineVersion": "5a9203d0590c951969e85a7d07215503f4672eb9",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\r\n  provider = \"prisma-client-js\"\r\n  output   = \"../src/generated/client\"\r\n}\r\n\r\ndatasource db {\r\n  provider     = \"postgresql\"\r\n  url          = env(\"DATABASE_URL\")\r\n  relationMode = \"prisma\"\r\n}\r\n\r\nmodel Ticket {\r\n  id_ticket Int       @id @default(autoincrement())\r\n  tipo      Tipo\r\n  estado    Estado\r\n  prioridad Prioridad\r\n\r\n  motivo       String\r\n  descripcion  String    @db.Text\r\n  fecha_inicio DateTime\r\n  fecha_cierre DateTime?\r\n\r\n  respuesta String? @db.Text\r\n\r\n  comentarios TicketComentario[]\r\n\r\n  id_user String\r\n  user    User   @relation(fields: [id_user], references: [id])\r\n\r\n  @@index([id_user])\r\n}\r\n\r\nmodel TicketComentario {\r\n  id_comentario Int @id @default(autoincrement())\r\n\r\n  id_ticket Int\r\n  ticket    Ticket @relation(fields: [id_ticket], references: [id_ticket])\r\n\r\n  comentario String   @db.Text\r\n  fecha      DateTime\r\n\r\n  @@index([id_ticket])\r\n}\r\n\r\nenum Tipo {\r\n  INCIDENCIA\r\n  PETICION\r\n  QUEJA\r\n  RECLAMACION\r\n}\r\n\r\nenum Estado {\r\n  ABIERTO\r\n  EN_PROCESO\r\n  CERRADO\r\n}\r\n\r\nenum Prioridad {\r\n  BAJA\r\n  MEDIA\r\n  ALTA\r\n  INMEDIATA\r\n}\r\n\r\nmodel User {\r\n  id        String @id @default(uuid())\r\n  nombre    String\r\n  apellidos String\r\n  email     String\r\n\r\n  tickets Ticket[]\r\n}\r\n\r\nmodel RespuestasFaq {\r\n  id_faqRespuesta Int @id @default(autoincrement())\r\n\r\n  id_prefrec Int\r\n  pregunta   PreguntasFrecuentes @relation(fields: [id_prefrec], references: [id_prefrec])\r\n\r\n  respuesta String\r\n\r\n  @@index([id_prefrec])\r\n}\r\n\r\nmodel PreguntasFrecuentes {\r\n  id_prefrec Int @id @default(autoincrement())\r\n\r\n  pregunta String\r\n\r\n  respuestas RespuestasFaq[]\r\n  tipo       TipoPregunta    @default(GENERAL)\r\n}\r\n\r\nenum TipoPregunta {\r\n  GENERAL\r\n  CUENTA\r\n  NEGOCIO\r\n  CLIENTE\r\n  DUENONEGOCIO\r\n  ORDENES\r\n  PRODUCTOS\r\n  INVENTARIO\r\n  CHAT\r\n  PUBLICACIONES\r\n  TECNICO\r\n}\r\n\r\n",
  "inlineSchemaHash": "f275e1860bb3f6e407cc24ddcd16cea83af6cb54a0fff7a0d35f86ebdc1bb753",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/client",
    "generated/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Ticket\":{\"dbName\":null,\"fields\":[{\"name\":\"id_ticket\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipo\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tipo\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"estado\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Estado\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prioridad\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Prioridad\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"motivo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descripcion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha_inicio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha_cierre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"respuesta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comentarios\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TicketComentario\",\"relationName\":\"TicketToTicketComentario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_user\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TicketToUser\",\"relationFromFields\":[\"id_user\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TicketComentario\":{\"dbName\":null,\"fields\":[{\"name\":\"id_comentario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_ticket\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ticket\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ticket\",\"relationName\":\"TicketToTicketComentario\",\"relationFromFields\":[\"id_ticket\"],\"relationToFields\":[\"id_ticket\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comentario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"apellidos\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tickets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ticket\",\"relationName\":\"TicketToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RespuestasFaq\":{\"dbName\":null,\"fields\":[{\"name\":\"id_faqRespuesta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_prefrec\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pregunta\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PreguntasFrecuentes\",\"relationName\":\"PreguntasFrecuentesToRespuestasFaq\",\"relationFromFields\":[\"id_prefrec\"],\"relationToFields\":[\"id_prefrec\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"respuesta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PreguntasFrecuentes\":{\"dbName\":null,\"fields\":[{\"name\":\"id_prefrec\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pregunta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"respuestas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RespuestasFaq\",\"relationName\":\"PreguntasFrecuentesToRespuestasFaq\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipo\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TipoPregunta\",\"default\":\"GENERAL\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Tipo\":{\"values\":[{\"name\":\"INCIDENCIA\",\"dbName\":null},{\"name\":\"PETICION\",\"dbName\":null},{\"name\":\"QUEJA\",\"dbName\":null},{\"name\":\"RECLAMACION\",\"dbName\":null}],\"dbName\":null},\"Estado\":{\"values\":[{\"name\":\"ABIERTO\",\"dbName\":null},{\"name\":\"EN_PROCESO\",\"dbName\":null},{\"name\":\"CERRADO\",\"dbName\":null}],\"dbName\":null},\"Prioridad\":{\"values\":[{\"name\":\"BAJA\",\"dbName\":null},{\"name\":\"MEDIA\",\"dbName\":null},{\"name\":\"ALTA\",\"dbName\":null},{\"name\":\"INMEDIATA\",\"dbName\":null}],\"dbName\":null},\"TipoPregunta\":{\"values\":[{\"name\":\"GENERAL\",\"dbName\":null},{\"name\":\"CUENTA\",\"dbName\":null},{\"name\":\"NEGOCIO\",\"dbName\":null},{\"name\":\"CLIENTE\",\"dbName\":null},{\"name\":\"DUENONEGOCIO\",\"dbName\":null},{\"name\":\"ORDENES\",\"dbName\":null},{\"name\":\"PRODUCTOS\",\"dbName\":null},{\"name\":\"INVENTARIO\",\"dbName\":null},{\"name\":\"CHAT\",\"dbName\":null},{\"name\":\"PUBLICACIONES\",\"dbName\":null},{\"name\":\"TECNICO\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "src/generated/client/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/client/schema.prisma")
