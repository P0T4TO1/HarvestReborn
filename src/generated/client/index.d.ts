
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model TicketComentario
 * 
 */
export type TicketComentario = $Result.DefaultSelection<Prisma.$TicketComentarioPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RespuestasFaq
 * 
 */
export type RespuestasFaq = $Result.DefaultSelection<Prisma.$RespuestasFaqPayload>
/**
 * Model PreguntasFrecuentes
 * 
 */
export type PreguntasFrecuentes = $Result.DefaultSelection<Prisma.$PreguntasFrecuentesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Tipo: {
  INCIDENCIA: 'INCIDENCIA',
  PETICION: 'PETICION',
  QUEJA: 'QUEJA',
  RECLAMACION: 'RECLAMACION'
};

export type Tipo = (typeof Tipo)[keyof typeof Tipo]


export const Estado: {
  ABIERTO: 'ABIERTO',
  EN_PROCESO: 'EN_PROCESO',
  CERRADO: 'CERRADO'
};

export type Estado = (typeof Estado)[keyof typeof Estado]


export const Prioridad: {
  BAJA: 'BAJA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
  INMEDIATA: 'INMEDIATA'
};

export type Prioridad = (typeof Prioridad)[keyof typeof Prioridad]


export const TipoPregunta: {
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

export type TipoPregunta = (typeof TipoPregunta)[keyof typeof TipoPregunta]

}

export type Tipo = $Enums.Tipo

export const Tipo: typeof $Enums.Tipo

export type Estado = $Enums.Estado

export const Estado: typeof $Enums.Estado

export type Prioridad = $Enums.Prioridad

export const Prioridad: typeof $Enums.Prioridad

export type TipoPregunta = $Enums.TipoPregunta

export const TipoPregunta: typeof $Enums.TipoPregunta

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tickets
 * const tickets = await prisma.ticket.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tickets
   * const tickets = await prisma.ticket.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs>;

  /**
   * `prisma.ticketComentario`: Exposes CRUD operations for the **TicketComentario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketComentarios
    * const ticketComentarios = await prisma.ticketComentario.findMany()
    * ```
    */
  get ticketComentario(): Prisma.TicketComentarioDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.respuestasFaq`: Exposes CRUD operations for the **RespuestasFaq** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RespuestasFaqs
    * const respuestasFaqs = await prisma.respuestasFaq.findMany()
    * ```
    */
  get respuestasFaq(): Prisma.RespuestasFaqDelegate<ExtArgs>;

  /**
   * `prisma.preguntasFrecuentes`: Exposes CRUD operations for the **PreguntasFrecuentes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreguntasFrecuentes
    * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findMany()
    * ```
    */
  get preguntasFrecuentes(): Prisma.PreguntasFrecuentesDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.10.2
   * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Ticket: 'Ticket',
    TicketComentario: 'TicketComentario',
    User: 'User',
    RespuestasFaq: 'RespuestasFaq',
    PreguntasFrecuentes: 'PreguntasFrecuentes'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'ticket' | 'ticketComentario' | 'user' | 'respuestasFaq' | 'preguntasFrecuentes'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>,
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      TicketComentario: {
        payload: Prisma.$TicketComentarioPayload<ExtArgs>
        fields: Prisma.TicketComentarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketComentarioFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketComentarioFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>
          }
          findFirst: {
            args: Prisma.TicketComentarioFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketComentarioFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>
          }
          findMany: {
            args: Prisma.TicketComentarioFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>[]
          }
          create: {
            args: Prisma.TicketComentarioCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>
          }
          createMany: {
            args: Prisma.TicketComentarioCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TicketComentarioDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>
          }
          update: {
            args: Prisma.TicketComentarioUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>
          }
          deleteMany: {
            args: Prisma.TicketComentarioDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TicketComentarioUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TicketComentarioUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketComentarioPayload>
          }
          aggregate: {
            args: Prisma.TicketComentarioAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTicketComentario>
          }
          groupBy: {
            args: Prisma.TicketComentarioGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TicketComentarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketComentarioCountArgs<ExtArgs>,
            result: $Utils.Optional<TicketComentarioCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RespuestasFaq: {
        payload: Prisma.$RespuestasFaqPayload<ExtArgs>
        fields: Prisma.RespuestasFaqFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RespuestasFaqFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RespuestasFaqFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>
          }
          findFirst: {
            args: Prisma.RespuestasFaqFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RespuestasFaqFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>
          }
          findMany: {
            args: Prisma.RespuestasFaqFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>[]
          }
          create: {
            args: Prisma.RespuestasFaqCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>
          }
          createMany: {
            args: Prisma.RespuestasFaqCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RespuestasFaqDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>
          }
          update: {
            args: Prisma.RespuestasFaqUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>
          }
          deleteMany: {
            args: Prisma.RespuestasFaqDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RespuestasFaqUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RespuestasFaqUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RespuestasFaqPayload>
          }
          aggregate: {
            args: Prisma.RespuestasFaqAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRespuestasFaq>
          }
          groupBy: {
            args: Prisma.RespuestasFaqGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RespuestasFaqGroupByOutputType>[]
          }
          count: {
            args: Prisma.RespuestasFaqCountArgs<ExtArgs>,
            result: $Utils.Optional<RespuestasFaqCountAggregateOutputType> | number
          }
        }
      }
      PreguntasFrecuentes: {
        payload: Prisma.$PreguntasFrecuentesPayload<ExtArgs>
        fields: Prisma.PreguntasFrecuentesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreguntasFrecuentesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreguntasFrecuentesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>
          }
          findFirst: {
            args: Prisma.PreguntasFrecuentesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreguntasFrecuentesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>
          }
          findMany: {
            args: Prisma.PreguntasFrecuentesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>[]
          }
          create: {
            args: Prisma.PreguntasFrecuentesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>
          }
          createMany: {
            args: Prisma.PreguntasFrecuentesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PreguntasFrecuentesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>
          }
          update: {
            args: Prisma.PreguntasFrecuentesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>
          }
          deleteMany: {
            args: Prisma.PreguntasFrecuentesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PreguntasFrecuentesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PreguntasFrecuentesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PreguntasFrecuentesPayload>
          }
          aggregate: {
            args: Prisma.PreguntasFrecuentesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePreguntasFrecuentes>
          }
          groupBy: {
            args: Prisma.PreguntasFrecuentesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PreguntasFrecuentesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreguntasFrecuentesCountArgs<ExtArgs>,
            result: $Utils.Optional<PreguntasFrecuentesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TicketCountOutputType
   */

  export type TicketCountOutputType = {
    comentarios: number
  }

  export type TicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comentarios?: boolean | TicketCountOutputTypeCountComentariosArgs
  }

  // Custom InputTypes

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketCountOutputType
     */
    select?: TicketCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountComentariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketComentarioWhereInput
  }



  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tickets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | UserCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }



  /**
   * Count Type PreguntasFrecuentesCountOutputType
   */

  export type PreguntasFrecuentesCountOutputType = {
    respuestas: number
  }

  export type PreguntasFrecuentesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    respuestas?: boolean | PreguntasFrecuentesCountOutputTypeCountRespuestasArgs
  }

  // Custom InputTypes

  /**
   * PreguntasFrecuentesCountOutputType without action
   */
  export type PreguntasFrecuentesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentesCountOutputType
     */
    select?: PreguntasFrecuentesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * PreguntasFrecuentesCountOutputType without action
   */
  export type PreguntasFrecuentesCountOutputTypeCountRespuestasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RespuestasFaqWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    id_ticket: number | null
  }

  export type TicketSumAggregateOutputType = {
    id_ticket: number | null
  }

  export type TicketMinAggregateOutputType = {
    id_ticket: number | null
    tipo: $Enums.Tipo | null
    estado: $Enums.Estado | null
    prioridad: $Enums.Prioridad | null
    motivo: string | null
    descripcion: string | null
    fecha_inicio: Date | null
    fecha_cierre: Date | null
    respuesta: string | null
    id_user: string | null
  }

  export type TicketMaxAggregateOutputType = {
    id_ticket: number | null
    tipo: $Enums.Tipo | null
    estado: $Enums.Estado | null
    prioridad: $Enums.Prioridad | null
    motivo: string | null
    descripcion: string | null
    fecha_inicio: Date | null
    fecha_cierre: Date | null
    respuesta: string | null
    id_user: string | null
  }

  export type TicketCountAggregateOutputType = {
    id_ticket: number
    tipo: number
    estado: number
    prioridad: number
    motivo: number
    descripcion: number
    fecha_inicio: number
    fecha_cierre: number
    respuesta: number
    id_user: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    id_ticket?: true
  }

  export type TicketSumAggregateInputType = {
    id_ticket?: true
  }

  export type TicketMinAggregateInputType = {
    id_ticket?: true
    tipo?: true
    estado?: true
    prioridad?: true
    motivo?: true
    descripcion?: true
    fecha_inicio?: true
    fecha_cierre?: true
    respuesta?: true
    id_user?: true
  }

  export type TicketMaxAggregateInputType = {
    id_ticket?: true
    tipo?: true
    estado?: true
    prioridad?: true
    motivo?: true
    descripcion?: true
    fecha_inicio?: true
    fecha_cierre?: true
    respuesta?: true
    id_user?: true
  }

  export type TicketCountAggregateInputType = {
    id_ticket?: true
    tipo?: true
    estado?: true
    prioridad?: true
    motivo?: true
    descripcion?: true
    fecha_inicio?: true
    fecha_cierre?: true
    respuesta?: true
    id_user?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id_ticket: number
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date
    fecha_cierre: Date | null
    respuesta: string | null
    id_user: string
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_ticket?: boolean
    tipo?: boolean
    estado?: boolean
    prioridad?: boolean
    motivo?: boolean
    descripcion?: boolean
    fecha_inicio?: boolean
    fecha_cierre?: boolean
    respuesta?: boolean
    id_user?: boolean
    comentarios?: boolean | Ticket$comentariosArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id_ticket?: boolean
    tipo?: boolean
    estado?: boolean
    prioridad?: boolean
    motivo?: boolean
    descripcion?: boolean
    fecha_inicio?: boolean
    fecha_cierre?: boolean
    respuesta?: boolean
    id_user?: boolean
  }

  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comentarios?: boolean | Ticket$comentariosArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      comentarios: Prisma.$TicketComentarioPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_ticket: number
      tipo: $Enums.Tipo
      estado: $Enums.Estado
      prioridad: $Enums.Prioridad
      motivo: string
      descripcion: string
      fecha_inicio: Date
      fecha_cierre: Date | null
      respuesta: string | null
      id_user: string
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }


  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TicketFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Ticket that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TicketFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id_ticket`
     * const ticketWithId_ticketOnly = await prisma.ticket.findMany({ select: { id_ticket: true } })
     * 
    **/
    findMany<T extends TicketFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
    **/
    create<T extends TicketCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketCreateArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Tickets.
     *     @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     *     @example
     *     // Create many Tickets
     *     const ticket = await prisma.ticket.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TicketCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
    **/
    delete<T extends TicketDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TicketUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TicketDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TicketUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
    **/
    upsert<T extends TicketUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    comentarios<T extends Ticket$comentariosArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$comentariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'findMany'> | Null>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Ticket model
   */ 
  interface TicketFieldRefs {
    readonly id_ticket: FieldRef<"Ticket", 'Int'>
    readonly tipo: FieldRef<"Ticket", 'Tipo'>
    readonly estado: FieldRef<"Ticket", 'Estado'>
    readonly prioridad: FieldRef<"Ticket", 'Prioridad'>
    readonly motivo: FieldRef<"Ticket", 'String'>
    readonly descripcion: FieldRef<"Ticket", 'String'>
    readonly fecha_inicio: FieldRef<"Ticket", 'DateTime'>
    readonly fecha_cierre: FieldRef<"Ticket", 'DateTime'>
    readonly respuesta: FieldRef<"Ticket", 'String'>
    readonly id_user: FieldRef<"Ticket", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }


  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
  }


  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }


  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
  }


  /**
   * Ticket.comentarios
   */
  export type Ticket$comentariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    where?: TicketComentarioWhereInput
    orderBy?: TicketComentarioOrderByWithRelationInput | TicketComentarioOrderByWithRelationInput[]
    cursor?: TicketComentarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketComentarioScalarFieldEnum | TicketComentarioScalarFieldEnum[]
  }


  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
  }



  /**
   * Model TicketComentario
   */

  export type AggregateTicketComentario = {
    _count: TicketComentarioCountAggregateOutputType | null
    _avg: TicketComentarioAvgAggregateOutputType | null
    _sum: TicketComentarioSumAggregateOutputType | null
    _min: TicketComentarioMinAggregateOutputType | null
    _max: TicketComentarioMaxAggregateOutputType | null
  }

  export type TicketComentarioAvgAggregateOutputType = {
    id_comentario: number | null
    id_ticket: number | null
  }

  export type TicketComentarioSumAggregateOutputType = {
    id_comentario: number | null
    id_ticket: number | null
  }

  export type TicketComentarioMinAggregateOutputType = {
    id_comentario: number | null
    id_ticket: number | null
    comentario: string | null
    fecha: Date | null
  }

  export type TicketComentarioMaxAggregateOutputType = {
    id_comentario: number | null
    id_ticket: number | null
    comentario: string | null
    fecha: Date | null
  }

  export type TicketComentarioCountAggregateOutputType = {
    id_comentario: number
    id_ticket: number
    comentario: number
    fecha: number
    _all: number
  }


  export type TicketComentarioAvgAggregateInputType = {
    id_comentario?: true
    id_ticket?: true
  }

  export type TicketComentarioSumAggregateInputType = {
    id_comentario?: true
    id_ticket?: true
  }

  export type TicketComentarioMinAggregateInputType = {
    id_comentario?: true
    id_ticket?: true
    comentario?: true
    fecha?: true
  }

  export type TicketComentarioMaxAggregateInputType = {
    id_comentario?: true
    id_ticket?: true
    comentario?: true
    fecha?: true
  }

  export type TicketComentarioCountAggregateInputType = {
    id_comentario?: true
    id_ticket?: true
    comentario?: true
    fecha?: true
    _all?: true
  }

  export type TicketComentarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketComentario to aggregate.
     */
    where?: TicketComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComentarios to fetch.
     */
    orderBy?: TicketComentarioOrderByWithRelationInput | TicketComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComentarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketComentarios
    **/
    _count?: true | TicketComentarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketComentarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketComentarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketComentarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketComentarioMaxAggregateInputType
  }

  export type GetTicketComentarioAggregateType<T extends TicketComentarioAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketComentario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketComentario[P]>
      : GetScalarType<T[P], AggregateTicketComentario[P]>
  }




  export type TicketComentarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketComentarioWhereInput
    orderBy?: TicketComentarioOrderByWithAggregationInput | TicketComentarioOrderByWithAggregationInput[]
    by: TicketComentarioScalarFieldEnum[] | TicketComentarioScalarFieldEnum
    having?: TicketComentarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketComentarioCountAggregateInputType | true
    _avg?: TicketComentarioAvgAggregateInputType
    _sum?: TicketComentarioSumAggregateInputType
    _min?: TicketComentarioMinAggregateInputType
    _max?: TicketComentarioMaxAggregateInputType
  }

  export type TicketComentarioGroupByOutputType = {
    id_comentario: number
    id_ticket: number
    comentario: string
    fecha: Date
    _count: TicketComentarioCountAggregateOutputType | null
    _avg: TicketComentarioAvgAggregateOutputType | null
    _sum: TicketComentarioSumAggregateOutputType | null
    _min: TicketComentarioMinAggregateOutputType | null
    _max: TicketComentarioMaxAggregateOutputType | null
  }

  type GetTicketComentarioGroupByPayload<T extends TicketComentarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketComentarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketComentarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketComentarioGroupByOutputType[P]>
            : GetScalarType<T[P], TicketComentarioGroupByOutputType[P]>
        }
      >
    >


  export type TicketComentarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_comentario?: boolean
    id_ticket?: boolean
    comentario?: boolean
    fecha?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketComentario"]>

  export type TicketComentarioSelectScalar = {
    id_comentario?: boolean
    id_ticket?: boolean
    comentario?: boolean
    fecha?: boolean
  }

  export type TicketComentarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }


  export type $TicketComentarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketComentario"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_comentario: number
      id_ticket: number
      comentario: string
      fecha: Date
    }, ExtArgs["result"]["ticketComentario"]>
    composites: {}
  }


  type TicketComentarioGetPayload<S extends boolean | null | undefined | TicketComentarioDefaultArgs> = $Result.GetResult<Prisma.$TicketComentarioPayload, S>

  type TicketComentarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TicketComentarioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TicketComentarioCountAggregateInputType | true
    }

  export interface TicketComentarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketComentario'], meta: { name: 'TicketComentario' } }
    /**
     * Find zero or one TicketComentario that matches the filter.
     * @param {TicketComentarioFindUniqueArgs} args - Arguments to find a TicketComentario
     * @example
     * // Get one TicketComentario
     * const ticketComentario = await prisma.ticketComentario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TicketComentarioFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TicketComentarioFindUniqueArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TicketComentario that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TicketComentarioFindUniqueOrThrowArgs} args - Arguments to find a TicketComentario
     * @example
     * // Get one TicketComentario
     * const ticketComentario = await prisma.ticketComentario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TicketComentarioFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketComentarioFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TicketComentario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioFindFirstArgs} args - Arguments to find a TicketComentario
     * @example
     * // Get one TicketComentario
     * const ticketComentario = await prisma.ticketComentario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TicketComentarioFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketComentarioFindFirstArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TicketComentario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioFindFirstOrThrowArgs} args - Arguments to find a TicketComentario
     * @example
     * // Get one TicketComentario
     * const ticketComentario = await prisma.ticketComentario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TicketComentarioFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketComentarioFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TicketComentarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketComentarios
     * const ticketComentarios = await prisma.ticketComentario.findMany()
     * 
     * // Get first 10 TicketComentarios
     * const ticketComentarios = await prisma.ticketComentario.findMany({ take: 10 })
     * 
     * // Only select the `id_comentario`
     * const ticketComentarioWithId_comentarioOnly = await prisma.ticketComentario.findMany({ select: { id_comentario: true } })
     * 
    **/
    findMany<T extends TicketComentarioFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketComentarioFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TicketComentario.
     * @param {TicketComentarioCreateArgs} args - Arguments to create a TicketComentario.
     * @example
     * // Create one TicketComentario
     * const TicketComentario = await prisma.ticketComentario.create({
     *   data: {
     *     // ... data to create a TicketComentario
     *   }
     * })
     * 
    **/
    create<T extends TicketComentarioCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketComentarioCreateArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many TicketComentarios.
     *     @param {TicketComentarioCreateManyArgs} args - Arguments to create many TicketComentarios.
     *     @example
     *     // Create many TicketComentarios
     *     const ticketComentario = await prisma.ticketComentario.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TicketComentarioCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketComentarioCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TicketComentario.
     * @param {TicketComentarioDeleteArgs} args - Arguments to delete one TicketComentario.
     * @example
     * // Delete one TicketComentario
     * const TicketComentario = await prisma.ticketComentario.delete({
     *   where: {
     *     // ... filter to delete one TicketComentario
     *   }
     * })
     * 
    **/
    delete<T extends TicketComentarioDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TicketComentarioDeleteArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TicketComentario.
     * @param {TicketComentarioUpdateArgs} args - Arguments to update one TicketComentario.
     * @example
     * // Update one TicketComentario
     * const ticketComentario = await prisma.ticketComentario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TicketComentarioUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketComentarioUpdateArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TicketComentarios.
     * @param {TicketComentarioDeleteManyArgs} args - Arguments to filter TicketComentarios to delete.
     * @example
     * // Delete a few TicketComentarios
     * const { count } = await prisma.ticketComentario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TicketComentarioDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketComentarioDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketComentarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketComentarios
     * const ticketComentario = await prisma.ticketComentario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TicketComentarioUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TicketComentarioUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TicketComentario.
     * @param {TicketComentarioUpsertArgs} args - Arguments to update or create a TicketComentario.
     * @example
     * // Update or create a TicketComentario
     * const ticketComentario = await prisma.ticketComentario.upsert({
     *   create: {
     *     // ... data to create a TicketComentario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketComentario we want to update
     *   }
     * })
    **/
    upsert<T extends TicketComentarioUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TicketComentarioUpsertArgs<ExtArgs>>
    ): Prisma__TicketComentarioClient<$Result.GetResult<Prisma.$TicketComentarioPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TicketComentarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioCountArgs} args - Arguments to filter TicketComentarios to count.
     * @example
     * // Count the number of TicketComentarios
     * const count = await prisma.ticketComentario.count({
     *   where: {
     *     // ... the filter for the TicketComentarios we want to count
     *   }
     * })
    **/
    count<T extends TicketComentarioCountArgs>(
      args?: Subset<T, TicketComentarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketComentarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketComentario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketComentarioAggregateArgs>(args: Subset<T, TicketComentarioAggregateArgs>): Prisma.PrismaPromise<GetTicketComentarioAggregateType<T>>

    /**
     * Group by TicketComentario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketComentarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketComentarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketComentarioGroupByArgs['orderBy'] }
        : { orderBy?: TicketComentarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketComentarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketComentarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketComentario model
   */
  readonly fields: TicketComentarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketComentario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketComentarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TicketComentario model
   */ 
  interface TicketComentarioFieldRefs {
    readonly id_comentario: FieldRef<"TicketComentario", 'Int'>
    readonly id_ticket: FieldRef<"TicketComentario", 'Int'>
    readonly comentario: FieldRef<"TicketComentario", 'String'>
    readonly fecha: FieldRef<"TicketComentario", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * TicketComentario findUnique
   */
  export type TicketComentarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * Filter, which TicketComentario to fetch.
     */
    where: TicketComentarioWhereUniqueInput
  }


  /**
   * TicketComentario findUniqueOrThrow
   */
  export type TicketComentarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * Filter, which TicketComentario to fetch.
     */
    where: TicketComentarioWhereUniqueInput
  }


  /**
   * TicketComentario findFirst
   */
  export type TicketComentarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * Filter, which TicketComentario to fetch.
     */
    where?: TicketComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComentarios to fetch.
     */
    orderBy?: TicketComentarioOrderByWithRelationInput | TicketComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketComentarios.
     */
    cursor?: TicketComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComentarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketComentarios.
     */
    distinct?: TicketComentarioScalarFieldEnum | TicketComentarioScalarFieldEnum[]
  }


  /**
   * TicketComentario findFirstOrThrow
   */
  export type TicketComentarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * Filter, which TicketComentario to fetch.
     */
    where?: TicketComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComentarios to fetch.
     */
    orderBy?: TicketComentarioOrderByWithRelationInput | TicketComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketComentarios.
     */
    cursor?: TicketComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComentarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketComentarios.
     */
    distinct?: TicketComentarioScalarFieldEnum | TicketComentarioScalarFieldEnum[]
  }


  /**
   * TicketComentario findMany
   */
  export type TicketComentarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * Filter, which TicketComentarios to fetch.
     */
    where?: TicketComentarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComentarios to fetch.
     */
    orderBy?: TicketComentarioOrderByWithRelationInput | TicketComentarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketComentarios.
     */
    cursor?: TicketComentarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComentarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComentarios.
     */
    skip?: number
    distinct?: TicketComentarioScalarFieldEnum | TicketComentarioScalarFieldEnum[]
  }


  /**
   * TicketComentario create
   */
  export type TicketComentarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * The data needed to create a TicketComentario.
     */
    data: XOR<TicketComentarioCreateInput, TicketComentarioUncheckedCreateInput>
  }


  /**
   * TicketComentario createMany
   */
  export type TicketComentarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TicketComentarios.
     */
    data: TicketComentarioCreateManyInput | TicketComentarioCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * TicketComentario update
   */
  export type TicketComentarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * The data needed to update a TicketComentario.
     */
    data: XOR<TicketComentarioUpdateInput, TicketComentarioUncheckedUpdateInput>
    /**
     * Choose, which TicketComentario to update.
     */
    where: TicketComentarioWhereUniqueInput
  }


  /**
   * TicketComentario updateMany
   */
  export type TicketComentarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketComentarios.
     */
    data: XOR<TicketComentarioUpdateManyMutationInput, TicketComentarioUncheckedUpdateManyInput>
    /**
     * Filter which TicketComentarios to update
     */
    where?: TicketComentarioWhereInput
  }


  /**
   * TicketComentario upsert
   */
  export type TicketComentarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * The filter to search for the TicketComentario to update in case it exists.
     */
    where: TicketComentarioWhereUniqueInput
    /**
     * In case the TicketComentario found by the `where` argument doesn't exist, create a new TicketComentario with this data.
     */
    create: XOR<TicketComentarioCreateInput, TicketComentarioUncheckedCreateInput>
    /**
     * In case the TicketComentario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketComentarioUpdateInput, TicketComentarioUncheckedUpdateInput>
  }


  /**
   * TicketComentario delete
   */
  export type TicketComentarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
    /**
     * Filter which TicketComentario to delete.
     */
    where: TicketComentarioWhereUniqueInput
  }


  /**
   * TicketComentario deleteMany
   */
  export type TicketComentarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketComentarios to delete
     */
    where?: TicketComentarioWhereInput
  }


  /**
   * TicketComentario without action
   */
  export type TicketComentarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComentario
     */
    select?: TicketComentarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketComentarioInclude<ExtArgs> | null
  }



  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    apellidos: string | null
    email: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    apellidos: string | null
    email: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nombre: number
    apellidos: number
    email: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nombre?: true
    apellidos?: true
    email?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nombre?: true
    apellidos?: true
    email?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nombre?: true
    apellidos?: true
    email?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nombre: string
    apellidos: string
    email: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellidos?: boolean
    email?: boolean
    tickets?: boolean | User$ticketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nombre?: boolean
    apellidos?: boolean
    email?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | User$ticketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      apellidos: string
      email: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    tickets<T extends User$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nombre: FieldRef<"User", 'String'>
    readonly apellidos: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.tickets
   */
  export type User$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model RespuestasFaq
   */

  export type AggregateRespuestasFaq = {
    _count: RespuestasFaqCountAggregateOutputType | null
    _avg: RespuestasFaqAvgAggregateOutputType | null
    _sum: RespuestasFaqSumAggregateOutputType | null
    _min: RespuestasFaqMinAggregateOutputType | null
    _max: RespuestasFaqMaxAggregateOutputType | null
  }

  export type RespuestasFaqAvgAggregateOutputType = {
    id_faqRespuesta: number | null
    id_prefrec: number | null
  }

  export type RespuestasFaqSumAggregateOutputType = {
    id_faqRespuesta: number | null
    id_prefrec: number | null
  }

  export type RespuestasFaqMinAggregateOutputType = {
    id_faqRespuesta: number | null
    id_prefrec: number | null
    respuesta: string | null
  }

  export type RespuestasFaqMaxAggregateOutputType = {
    id_faqRespuesta: number | null
    id_prefrec: number | null
    respuesta: string | null
  }

  export type RespuestasFaqCountAggregateOutputType = {
    id_faqRespuesta: number
    id_prefrec: number
    respuesta: number
    _all: number
  }


  export type RespuestasFaqAvgAggregateInputType = {
    id_faqRespuesta?: true
    id_prefrec?: true
  }

  export type RespuestasFaqSumAggregateInputType = {
    id_faqRespuesta?: true
    id_prefrec?: true
  }

  export type RespuestasFaqMinAggregateInputType = {
    id_faqRespuesta?: true
    id_prefrec?: true
    respuesta?: true
  }

  export type RespuestasFaqMaxAggregateInputType = {
    id_faqRespuesta?: true
    id_prefrec?: true
    respuesta?: true
  }

  export type RespuestasFaqCountAggregateInputType = {
    id_faqRespuesta?: true
    id_prefrec?: true
    respuesta?: true
    _all?: true
  }

  export type RespuestasFaqAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RespuestasFaq to aggregate.
     */
    where?: RespuestasFaqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RespuestasFaqs to fetch.
     */
    orderBy?: RespuestasFaqOrderByWithRelationInput | RespuestasFaqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RespuestasFaqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RespuestasFaqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RespuestasFaqs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RespuestasFaqs
    **/
    _count?: true | RespuestasFaqCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RespuestasFaqAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RespuestasFaqSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RespuestasFaqMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RespuestasFaqMaxAggregateInputType
  }

  export type GetRespuestasFaqAggregateType<T extends RespuestasFaqAggregateArgs> = {
        [P in keyof T & keyof AggregateRespuestasFaq]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRespuestasFaq[P]>
      : GetScalarType<T[P], AggregateRespuestasFaq[P]>
  }




  export type RespuestasFaqGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RespuestasFaqWhereInput
    orderBy?: RespuestasFaqOrderByWithAggregationInput | RespuestasFaqOrderByWithAggregationInput[]
    by: RespuestasFaqScalarFieldEnum[] | RespuestasFaqScalarFieldEnum
    having?: RespuestasFaqScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RespuestasFaqCountAggregateInputType | true
    _avg?: RespuestasFaqAvgAggregateInputType
    _sum?: RespuestasFaqSumAggregateInputType
    _min?: RespuestasFaqMinAggregateInputType
    _max?: RespuestasFaqMaxAggregateInputType
  }

  export type RespuestasFaqGroupByOutputType = {
    id_faqRespuesta: number
    id_prefrec: number
    respuesta: string
    _count: RespuestasFaqCountAggregateOutputType | null
    _avg: RespuestasFaqAvgAggregateOutputType | null
    _sum: RespuestasFaqSumAggregateOutputType | null
    _min: RespuestasFaqMinAggregateOutputType | null
    _max: RespuestasFaqMaxAggregateOutputType | null
  }

  type GetRespuestasFaqGroupByPayload<T extends RespuestasFaqGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RespuestasFaqGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RespuestasFaqGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RespuestasFaqGroupByOutputType[P]>
            : GetScalarType<T[P], RespuestasFaqGroupByOutputType[P]>
        }
      >
    >


  export type RespuestasFaqSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_faqRespuesta?: boolean
    id_prefrec?: boolean
    respuesta?: boolean
    pregunta?: boolean | PreguntasFrecuentesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["respuestasFaq"]>

  export type RespuestasFaqSelectScalar = {
    id_faqRespuesta?: boolean
    id_prefrec?: boolean
    respuesta?: boolean
  }

  export type RespuestasFaqInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pregunta?: boolean | PreguntasFrecuentesDefaultArgs<ExtArgs>
  }


  export type $RespuestasFaqPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RespuestasFaq"
    objects: {
      pregunta: Prisma.$PreguntasFrecuentesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_faqRespuesta: number
      id_prefrec: number
      respuesta: string
    }, ExtArgs["result"]["respuestasFaq"]>
    composites: {}
  }


  type RespuestasFaqGetPayload<S extends boolean | null | undefined | RespuestasFaqDefaultArgs> = $Result.GetResult<Prisma.$RespuestasFaqPayload, S>

  type RespuestasFaqCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RespuestasFaqFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RespuestasFaqCountAggregateInputType | true
    }

  export interface RespuestasFaqDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RespuestasFaq'], meta: { name: 'RespuestasFaq' } }
    /**
     * Find zero or one RespuestasFaq that matches the filter.
     * @param {RespuestasFaqFindUniqueArgs} args - Arguments to find a RespuestasFaq
     * @example
     * // Get one RespuestasFaq
     * const respuestasFaq = await prisma.respuestasFaq.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RespuestasFaqFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RespuestasFaqFindUniqueArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RespuestasFaq that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RespuestasFaqFindUniqueOrThrowArgs} args - Arguments to find a RespuestasFaq
     * @example
     * // Get one RespuestasFaq
     * const respuestasFaq = await prisma.respuestasFaq.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RespuestasFaqFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RespuestasFaqFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RespuestasFaq that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqFindFirstArgs} args - Arguments to find a RespuestasFaq
     * @example
     * // Get one RespuestasFaq
     * const respuestasFaq = await prisma.respuestasFaq.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RespuestasFaqFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RespuestasFaqFindFirstArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RespuestasFaq that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqFindFirstOrThrowArgs} args - Arguments to find a RespuestasFaq
     * @example
     * // Get one RespuestasFaq
     * const respuestasFaq = await prisma.respuestasFaq.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RespuestasFaqFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RespuestasFaqFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RespuestasFaqs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RespuestasFaqs
     * const respuestasFaqs = await prisma.respuestasFaq.findMany()
     * 
     * // Get first 10 RespuestasFaqs
     * const respuestasFaqs = await prisma.respuestasFaq.findMany({ take: 10 })
     * 
     * // Only select the `id_faqRespuesta`
     * const respuestasFaqWithId_faqRespuestaOnly = await prisma.respuestasFaq.findMany({ select: { id_faqRespuesta: true } })
     * 
    **/
    findMany<T extends RespuestasFaqFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RespuestasFaqFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RespuestasFaq.
     * @param {RespuestasFaqCreateArgs} args - Arguments to create a RespuestasFaq.
     * @example
     * // Create one RespuestasFaq
     * const RespuestasFaq = await prisma.respuestasFaq.create({
     *   data: {
     *     // ... data to create a RespuestasFaq
     *   }
     * })
     * 
    **/
    create<T extends RespuestasFaqCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RespuestasFaqCreateArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many RespuestasFaqs.
     *     @param {RespuestasFaqCreateManyArgs} args - Arguments to create many RespuestasFaqs.
     *     @example
     *     // Create many RespuestasFaqs
     *     const respuestasFaq = await prisma.respuestasFaq.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RespuestasFaqCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RespuestasFaqCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RespuestasFaq.
     * @param {RespuestasFaqDeleteArgs} args - Arguments to delete one RespuestasFaq.
     * @example
     * // Delete one RespuestasFaq
     * const RespuestasFaq = await prisma.respuestasFaq.delete({
     *   where: {
     *     // ... filter to delete one RespuestasFaq
     *   }
     * })
     * 
    **/
    delete<T extends RespuestasFaqDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RespuestasFaqDeleteArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RespuestasFaq.
     * @param {RespuestasFaqUpdateArgs} args - Arguments to update one RespuestasFaq.
     * @example
     * // Update one RespuestasFaq
     * const respuestasFaq = await prisma.respuestasFaq.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RespuestasFaqUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RespuestasFaqUpdateArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RespuestasFaqs.
     * @param {RespuestasFaqDeleteManyArgs} args - Arguments to filter RespuestasFaqs to delete.
     * @example
     * // Delete a few RespuestasFaqs
     * const { count } = await prisma.respuestasFaq.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RespuestasFaqDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RespuestasFaqDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RespuestasFaqs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RespuestasFaqs
     * const respuestasFaq = await prisma.respuestasFaq.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RespuestasFaqUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RespuestasFaqUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RespuestasFaq.
     * @param {RespuestasFaqUpsertArgs} args - Arguments to update or create a RespuestasFaq.
     * @example
     * // Update or create a RespuestasFaq
     * const respuestasFaq = await prisma.respuestasFaq.upsert({
     *   create: {
     *     // ... data to create a RespuestasFaq
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RespuestasFaq we want to update
     *   }
     * })
    **/
    upsert<T extends RespuestasFaqUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RespuestasFaqUpsertArgs<ExtArgs>>
    ): Prisma__RespuestasFaqClient<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RespuestasFaqs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqCountArgs} args - Arguments to filter RespuestasFaqs to count.
     * @example
     * // Count the number of RespuestasFaqs
     * const count = await prisma.respuestasFaq.count({
     *   where: {
     *     // ... the filter for the RespuestasFaqs we want to count
     *   }
     * })
    **/
    count<T extends RespuestasFaqCountArgs>(
      args?: Subset<T, RespuestasFaqCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RespuestasFaqCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RespuestasFaq.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RespuestasFaqAggregateArgs>(args: Subset<T, RespuestasFaqAggregateArgs>): Prisma.PrismaPromise<GetRespuestasFaqAggregateType<T>>

    /**
     * Group by RespuestasFaq.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RespuestasFaqGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RespuestasFaqGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RespuestasFaqGroupByArgs['orderBy'] }
        : { orderBy?: RespuestasFaqGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RespuestasFaqGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRespuestasFaqGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RespuestasFaq model
   */
  readonly fields: RespuestasFaqFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RespuestasFaq.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RespuestasFaqClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    pregunta<T extends PreguntasFrecuentesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PreguntasFrecuentesDefaultArgs<ExtArgs>>): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the RespuestasFaq model
   */ 
  interface RespuestasFaqFieldRefs {
    readonly id_faqRespuesta: FieldRef<"RespuestasFaq", 'Int'>
    readonly id_prefrec: FieldRef<"RespuestasFaq", 'Int'>
    readonly respuesta: FieldRef<"RespuestasFaq", 'String'>
  }
    

  // Custom InputTypes

  /**
   * RespuestasFaq findUnique
   */
  export type RespuestasFaqFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * Filter, which RespuestasFaq to fetch.
     */
    where: RespuestasFaqWhereUniqueInput
  }


  /**
   * RespuestasFaq findUniqueOrThrow
   */
  export type RespuestasFaqFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * Filter, which RespuestasFaq to fetch.
     */
    where: RespuestasFaqWhereUniqueInput
  }


  /**
   * RespuestasFaq findFirst
   */
  export type RespuestasFaqFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * Filter, which RespuestasFaq to fetch.
     */
    where?: RespuestasFaqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RespuestasFaqs to fetch.
     */
    orderBy?: RespuestasFaqOrderByWithRelationInput | RespuestasFaqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RespuestasFaqs.
     */
    cursor?: RespuestasFaqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RespuestasFaqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RespuestasFaqs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RespuestasFaqs.
     */
    distinct?: RespuestasFaqScalarFieldEnum | RespuestasFaqScalarFieldEnum[]
  }


  /**
   * RespuestasFaq findFirstOrThrow
   */
  export type RespuestasFaqFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * Filter, which RespuestasFaq to fetch.
     */
    where?: RespuestasFaqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RespuestasFaqs to fetch.
     */
    orderBy?: RespuestasFaqOrderByWithRelationInput | RespuestasFaqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RespuestasFaqs.
     */
    cursor?: RespuestasFaqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RespuestasFaqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RespuestasFaqs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RespuestasFaqs.
     */
    distinct?: RespuestasFaqScalarFieldEnum | RespuestasFaqScalarFieldEnum[]
  }


  /**
   * RespuestasFaq findMany
   */
  export type RespuestasFaqFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * Filter, which RespuestasFaqs to fetch.
     */
    where?: RespuestasFaqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RespuestasFaqs to fetch.
     */
    orderBy?: RespuestasFaqOrderByWithRelationInput | RespuestasFaqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RespuestasFaqs.
     */
    cursor?: RespuestasFaqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RespuestasFaqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RespuestasFaqs.
     */
    skip?: number
    distinct?: RespuestasFaqScalarFieldEnum | RespuestasFaqScalarFieldEnum[]
  }


  /**
   * RespuestasFaq create
   */
  export type RespuestasFaqCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * The data needed to create a RespuestasFaq.
     */
    data: XOR<RespuestasFaqCreateInput, RespuestasFaqUncheckedCreateInput>
  }


  /**
   * RespuestasFaq createMany
   */
  export type RespuestasFaqCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RespuestasFaqs.
     */
    data: RespuestasFaqCreateManyInput | RespuestasFaqCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * RespuestasFaq update
   */
  export type RespuestasFaqUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * The data needed to update a RespuestasFaq.
     */
    data: XOR<RespuestasFaqUpdateInput, RespuestasFaqUncheckedUpdateInput>
    /**
     * Choose, which RespuestasFaq to update.
     */
    where: RespuestasFaqWhereUniqueInput
  }


  /**
   * RespuestasFaq updateMany
   */
  export type RespuestasFaqUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RespuestasFaqs.
     */
    data: XOR<RespuestasFaqUpdateManyMutationInput, RespuestasFaqUncheckedUpdateManyInput>
    /**
     * Filter which RespuestasFaqs to update
     */
    where?: RespuestasFaqWhereInput
  }


  /**
   * RespuestasFaq upsert
   */
  export type RespuestasFaqUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * The filter to search for the RespuestasFaq to update in case it exists.
     */
    where: RespuestasFaqWhereUniqueInput
    /**
     * In case the RespuestasFaq found by the `where` argument doesn't exist, create a new RespuestasFaq with this data.
     */
    create: XOR<RespuestasFaqCreateInput, RespuestasFaqUncheckedCreateInput>
    /**
     * In case the RespuestasFaq was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RespuestasFaqUpdateInput, RespuestasFaqUncheckedUpdateInput>
  }


  /**
   * RespuestasFaq delete
   */
  export type RespuestasFaqDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    /**
     * Filter which RespuestasFaq to delete.
     */
    where: RespuestasFaqWhereUniqueInput
  }


  /**
   * RespuestasFaq deleteMany
   */
  export type RespuestasFaqDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RespuestasFaqs to delete
     */
    where?: RespuestasFaqWhereInput
  }


  /**
   * RespuestasFaq without action
   */
  export type RespuestasFaqDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
  }



  /**
   * Model PreguntasFrecuentes
   */

  export type AggregatePreguntasFrecuentes = {
    _count: PreguntasFrecuentesCountAggregateOutputType | null
    _avg: PreguntasFrecuentesAvgAggregateOutputType | null
    _sum: PreguntasFrecuentesSumAggregateOutputType | null
    _min: PreguntasFrecuentesMinAggregateOutputType | null
    _max: PreguntasFrecuentesMaxAggregateOutputType | null
  }

  export type PreguntasFrecuentesAvgAggregateOutputType = {
    id_prefrec: number | null
  }

  export type PreguntasFrecuentesSumAggregateOutputType = {
    id_prefrec: number | null
  }

  export type PreguntasFrecuentesMinAggregateOutputType = {
    id_prefrec: number | null
    pregunta: string | null
    tipo: $Enums.TipoPregunta | null
  }

  export type PreguntasFrecuentesMaxAggregateOutputType = {
    id_prefrec: number | null
    pregunta: string | null
    tipo: $Enums.TipoPregunta | null
  }

  export type PreguntasFrecuentesCountAggregateOutputType = {
    id_prefrec: number
    pregunta: number
    tipo: number
    _all: number
  }


  export type PreguntasFrecuentesAvgAggregateInputType = {
    id_prefrec?: true
  }

  export type PreguntasFrecuentesSumAggregateInputType = {
    id_prefrec?: true
  }

  export type PreguntasFrecuentesMinAggregateInputType = {
    id_prefrec?: true
    pregunta?: true
    tipo?: true
  }

  export type PreguntasFrecuentesMaxAggregateInputType = {
    id_prefrec?: true
    pregunta?: true
    tipo?: true
  }

  export type PreguntasFrecuentesCountAggregateInputType = {
    id_prefrec?: true
    pregunta?: true
    tipo?: true
    _all?: true
  }

  export type PreguntasFrecuentesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreguntasFrecuentes to aggregate.
     */
    where?: PreguntasFrecuentesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreguntasFrecuentes to fetch.
     */
    orderBy?: PreguntasFrecuentesOrderByWithRelationInput | PreguntasFrecuentesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreguntasFrecuentesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreguntasFrecuentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreguntasFrecuentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreguntasFrecuentes
    **/
    _count?: true | PreguntasFrecuentesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreguntasFrecuentesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreguntasFrecuentesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreguntasFrecuentesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreguntasFrecuentesMaxAggregateInputType
  }

  export type GetPreguntasFrecuentesAggregateType<T extends PreguntasFrecuentesAggregateArgs> = {
        [P in keyof T & keyof AggregatePreguntasFrecuentes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreguntasFrecuentes[P]>
      : GetScalarType<T[P], AggregatePreguntasFrecuentes[P]>
  }




  export type PreguntasFrecuentesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreguntasFrecuentesWhereInput
    orderBy?: PreguntasFrecuentesOrderByWithAggregationInput | PreguntasFrecuentesOrderByWithAggregationInput[]
    by: PreguntasFrecuentesScalarFieldEnum[] | PreguntasFrecuentesScalarFieldEnum
    having?: PreguntasFrecuentesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreguntasFrecuentesCountAggregateInputType | true
    _avg?: PreguntasFrecuentesAvgAggregateInputType
    _sum?: PreguntasFrecuentesSumAggregateInputType
    _min?: PreguntasFrecuentesMinAggregateInputType
    _max?: PreguntasFrecuentesMaxAggregateInputType
  }

  export type PreguntasFrecuentesGroupByOutputType = {
    id_prefrec: number
    pregunta: string
    tipo: $Enums.TipoPregunta
    _count: PreguntasFrecuentesCountAggregateOutputType | null
    _avg: PreguntasFrecuentesAvgAggregateOutputType | null
    _sum: PreguntasFrecuentesSumAggregateOutputType | null
    _min: PreguntasFrecuentesMinAggregateOutputType | null
    _max: PreguntasFrecuentesMaxAggregateOutputType | null
  }

  type GetPreguntasFrecuentesGroupByPayload<T extends PreguntasFrecuentesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreguntasFrecuentesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreguntasFrecuentesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreguntasFrecuentesGroupByOutputType[P]>
            : GetScalarType<T[P], PreguntasFrecuentesGroupByOutputType[P]>
        }
      >
    >


  export type PreguntasFrecuentesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_prefrec?: boolean
    pregunta?: boolean
    tipo?: boolean
    respuestas?: boolean | PreguntasFrecuentes$respuestasArgs<ExtArgs>
    _count?: boolean | PreguntasFrecuentesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preguntasFrecuentes"]>

  export type PreguntasFrecuentesSelectScalar = {
    id_prefrec?: boolean
    pregunta?: boolean
    tipo?: boolean
  }

  export type PreguntasFrecuentesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    respuestas?: boolean | PreguntasFrecuentes$respuestasArgs<ExtArgs>
    _count?: boolean | PreguntasFrecuentesCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $PreguntasFrecuentesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreguntasFrecuentes"
    objects: {
      respuestas: Prisma.$RespuestasFaqPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_prefrec: number
      pregunta: string
      tipo: $Enums.TipoPregunta
    }, ExtArgs["result"]["preguntasFrecuentes"]>
    composites: {}
  }


  type PreguntasFrecuentesGetPayload<S extends boolean | null | undefined | PreguntasFrecuentesDefaultArgs> = $Result.GetResult<Prisma.$PreguntasFrecuentesPayload, S>

  type PreguntasFrecuentesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PreguntasFrecuentesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PreguntasFrecuentesCountAggregateInputType | true
    }

  export interface PreguntasFrecuentesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreguntasFrecuentes'], meta: { name: 'PreguntasFrecuentes' } }
    /**
     * Find zero or one PreguntasFrecuentes that matches the filter.
     * @param {PreguntasFrecuentesFindUniqueArgs} args - Arguments to find a PreguntasFrecuentes
     * @example
     * // Get one PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PreguntasFrecuentesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, PreguntasFrecuentesFindUniqueArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one PreguntasFrecuentes that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PreguntasFrecuentesFindUniqueOrThrowArgs} args - Arguments to find a PreguntasFrecuentes
     * @example
     * // Get one PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PreguntasFrecuentesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PreguntasFrecuentesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first PreguntasFrecuentes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesFindFirstArgs} args - Arguments to find a PreguntasFrecuentes
     * @example
     * // Get one PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PreguntasFrecuentesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, PreguntasFrecuentesFindFirstArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first PreguntasFrecuentes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesFindFirstOrThrowArgs} args - Arguments to find a PreguntasFrecuentes
     * @example
     * // Get one PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PreguntasFrecuentesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PreguntasFrecuentesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more PreguntasFrecuentes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findMany()
     * 
     * // Get first 10 PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.findMany({ take: 10 })
     * 
     * // Only select the `id_prefrec`
     * const preguntasFrecuentesWithId_prefrecOnly = await prisma.preguntasFrecuentes.findMany({ select: { id_prefrec: true } })
     * 
    **/
    findMany<T extends PreguntasFrecuentesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PreguntasFrecuentesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a PreguntasFrecuentes.
     * @param {PreguntasFrecuentesCreateArgs} args - Arguments to create a PreguntasFrecuentes.
     * @example
     * // Create one PreguntasFrecuentes
     * const PreguntasFrecuentes = await prisma.preguntasFrecuentes.create({
     *   data: {
     *     // ... data to create a PreguntasFrecuentes
     *   }
     * })
     * 
    **/
    create<T extends PreguntasFrecuentesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PreguntasFrecuentesCreateArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many PreguntasFrecuentes.
     *     @param {PreguntasFrecuentesCreateManyArgs} args - Arguments to create many PreguntasFrecuentes.
     *     @example
     *     // Create many PreguntasFrecuentes
     *     const preguntasFrecuentes = await prisma.preguntasFrecuentes.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PreguntasFrecuentesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PreguntasFrecuentesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PreguntasFrecuentes.
     * @param {PreguntasFrecuentesDeleteArgs} args - Arguments to delete one PreguntasFrecuentes.
     * @example
     * // Delete one PreguntasFrecuentes
     * const PreguntasFrecuentes = await prisma.preguntasFrecuentes.delete({
     *   where: {
     *     // ... filter to delete one PreguntasFrecuentes
     *   }
     * })
     * 
    **/
    delete<T extends PreguntasFrecuentesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PreguntasFrecuentesDeleteArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one PreguntasFrecuentes.
     * @param {PreguntasFrecuentesUpdateArgs} args - Arguments to update one PreguntasFrecuentes.
     * @example
     * // Update one PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PreguntasFrecuentesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PreguntasFrecuentesUpdateArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more PreguntasFrecuentes.
     * @param {PreguntasFrecuentesDeleteManyArgs} args - Arguments to filter PreguntasFrecuentes to delete.
     * @example
     * // Delete a few PreguntasFrecuentes
     * const { count } = await prisma.preguntasFrecuentes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PreguntasFrecuentesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PreguntasFrecuentesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreguntasFrecuentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PreguntasFrecuentesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PreguntasFrecuentesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PreguntasFrecuentes.
     * @param {PreguntasFrecuentesUpsertArgs} args - Arguments to update or create a PreguntasFrecuentes.
     * @example
     * // Update or create a PreguntasFrecuentes
     * const preguntasFrecuentes = await prisma.preguntasFrecuentes.upsert({
     *   create: {
     *     // ... data to create a PreguntasFrecuentes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreguntasFrecuentes we want to update
     *   }
     * })
    **/
    upsert<T extends PreguntasFrecuentesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PreguntasFrecuentesUpsertArgs<ExtArgs>>
    ): Prisma__PreguntasFrecuentesClient<$Result.GetResult<Prisma.$PreguntasFrecuentesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of PreguntasFrecuentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesCountArgs} args - Arguments to filter PreguntasFrecuentes to count.
     * @example
     * // Count the number of PreguntasFrecuentes
     * const count = await prisma.preguntasFrecuentes.count({
     *   where: {
     *     // ... the filter for the PreguntasFrecuentes we want to count
     *   }
     * })
    **/
    count<T extends PreguntasFrecuentesCountArgs>(
      args?: Subset<T, PreguntasFrecuentesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreguntasFrecuentesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreguntasFrecuentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreguntasFrecuentesAggregateArgs>(args: Subset<T, PreguntasFrecuentesAggregateArgs>): Prisma.PrismaPromise<GetPreguntasFrecuentesAggregateType<T>>

    /**
     * Group by PreguntasFrecuentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreguntasFrecuentesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreguntasFrecuentesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreguntasFrecuentesGroupByArgs['orderBy'] }
        : { orderBy?: PreguntasFrecuentesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreguntasFrecuentesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreguntasFrecuentesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreguntasFrecuentes model
   */
  readonly fields: PreguntasFrecuentesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreguntasFrecuentes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreguntasFrecuentesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    respuestas<T extends PreguntasFrecuentes$respuestasArgs<ExtArgs> = {}>(args?: Subset<T, PreguntasFrecuentes$respuestasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RespuestasFaqPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the PreguntasFrecuentes model
   */ 
  interface PreguntasFrecuentesFieldRefs {
    readonly id_prefrec: FieldRef<"PreguntasFrecuentes", 'Int'>
    readonly pregunta: FieldRef<"PreguntasFrecuentes", 'String'>
    readonly tipo: FieldRef<"PreguntasFrecuentes", 'TipoPregunta'>
  }
    

  // Custom InputTypes

  /**
   * PreguntasFrecuentes findUnique
   */
  export type PreguntasFrecuentesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * Filter, which PreguntasFrecuentes to fetch.
     */
    where: PreguntasFrecuentesWhereUniqueInput
  }


  /**
   * PreguntasFrecuentes findUniqueOrThrow
   */
  export type PreguntasFrecuentesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * Filter, which PreguntasFrecuentes to fetch.
     */
    where: PreguntasFrecuentesWhereUniqueInput
  }


  /**
   * PreguntasFrecuentes findFirst
   */
  export type PreguntasFrecuentesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * Filter, which PreguntasFrecuentes to fetch.
     */
    where?: PreguntasFrecuentesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreguntasFrecuentes to fetch.
     */
    orderBy?: PreguntasFrecuentesOrderByWithRelationInput | PreguntasFrecuentesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreguntasFrecuentes.
     */
    cursor?: PreguntasFrecuentesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreguntasFrecuentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreguntasFrecuentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreguntasFrecuentes.
     */
    distinct?: PreguntasFrecuentesScalarFieldEnum | PreguntasFrecuentesScalarFieldEnum[]
  }


  /**
   * PreguntasFrecuentes findFirstOrThrow
   */
  export type PreguntasFrecuentesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * Filter, which PreguntasFrecuentes to fetch.
     */
    where?: PreguntasFrecuentesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreguntasFrecuentes to fetch.
     */
    orderBy?: PreguntasFrecuentesOrderByWithRelationInput | PreguntasFrecuentesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreguntasFrecuentes.
     */
    cursor?: PreguntasFrecuentesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreguntasFrecuentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreguntasFrecuentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreguntasFrecuentes.
     */
    distinct?: PreguntasFrecuentesScalarFieldEnum | PreguntasFrecuentesScalarFieldEnum[]
  }


  /**
   * PreguntasFrecuentes findMany
   */
  export type PreguntasFrecuentesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * Filter, which PreguntasFrecuentes to fetch.
     */
    where?: PreguntasFrecuentesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreguntasFrecuentes to fetch.
     */
    orderBy?: PreguntasFrecuentesOrderByWithRelationInput | PreguntasFrecuentesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreguntasFrecuentes.
     */
    cursor?: PreguntasFrecuentesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreguntasFrecuentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreguntasFrecuentes.
     */
    skip?: number
    distinct?: PreguntasFrecuentesScalarFieldEnum | PreguntasFrecuentesScalarFieldEnum[]
  }


  /**
   * PreguntasFrecuentes create
   */
  export type PreguntasFrecuentesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * The data needed to create a PreguntasFrecuentes.
     */
    data: XOR<PreguntasFrecuentesCreateInput, PreguntasFrecuentesUncheckedCreateInput>
  }


  /**
   * PreguntasFrecuentes createMany
   */
  export type PreguntasFrecuentesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreguntasFrecuentes.
     */
    data: PreguntasFrecuentesCreateManyInput | PreguntasFrecuentesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * PreguntasFrecuentes update
   */
  export type PreguntasFrecuentesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * The data needed to update a PreguntasFrecuentes.
     */
    data: XOR<PreguntasFrecuentesUpdateInput, PreguntasFrecuentesUncheckedUpdateInput>
    /**
     * Choose, which PreguntasFrecuentes to update.
     */
    where: PreguntasFrecuentesWhereUniqueInput
  }


  /**
   * PreguntasFrecuentes updateMany
   */
  export type PreguntasFrecuentesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreguntasFrecuentes.
     */
    data: XOR<PreguntasFrecuentesUpdateManyMutationInput, PreguntasFrecuentesUncheckedUpdateManyInput>
    /**
     * Filter which PreguntasFrecuentes to update
     */
    where?: PreguntasFrecuentesWhereInput
  }


  /**
   * PreguntasFrecuentes upsert
   */
  export type PreguntasFrecuentesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * The filter to search for the PreguntasFrecuentes to update in case it exists.
     */
    where: PreguntasFrecuentesWhereUniqueInput
    /**
     * In case the PreguntasFrecuentes found by the `where` argument doesn't exist, create a new PreguntasFrecuentes with this data.
     */
    create: XOR<PreguntasFrecuentesCreateInput, PreguntasFrecuentesUncheckedCreateInput>
    /**
     * In case the PreguntasFrecuentes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreguntasFrecuentesUpdateInput, PreguntasFrecuentesUncheckedUpdateInput>
  }


  /**
   * PreguntasFrecuentes delete
   */
  export type PreguntasFrecuentesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
    /**
     * Filter which PreguntasFrecuentes to delete.
     */
    where: PreguntasFrecuentesWhereUniqueInput
  }


  /**
   * PreguntasFrecuentes deleteMany
   */
  export type PreguntasFrecuentesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreguntasFrecuentes to delete
     */
    where?: PreguntasFrecuentesWhereInput
  }


  /**
   * PreguntasFrecuentes.respuestas
   */
  export type PreguntasFrecuentes$respuestasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RespuestasFaq
     */
    select?: RespuestasFaqSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RespuestasFaqInclude<ExtArgs> | null
    where?: RespuestasFaqWhereInput
    orderBy?: RespuestasFaqOrderByWithRelationInput | RespuestasFaqOrderByWithRelationInput[]
    cursor?: RespuestasFaqWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RespuestasFaqScalarFieldEnum | RespuestasFaqScalarFieldEnum[]
  }


  /**
   * PreguntasFrecuentes without action
   */
  export type PreguntasFrecuentesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreguntasFrecuentes
     */
    select?: PreguntasFrecuentesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreguntasFrecuentesInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TicketScalarFieldEnum: {
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

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const TicketComentarioScalarFieldEnum: {
    id_comentario: 'id_comentario',
    id_ticket: 'id_ticket',
    comentario: 'comentario',
    fecha: 'fecha'
  };

  export type TicketComentarioScalarFieldEnum = (typeof TicketComentarioScalarFieldEnum)[keyof typeof TicketComentarioScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    apellidos: 'apellidos',
    email: 'email'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RespuestasFaqScalarFieldEnum: {
    id_faqRespuesta: 'id_faqRespuesta',
    id_prefrec: 'id_prefrec',
    respuesta: 'respuesta'
  };

  export type RespuestasFaqScalarFieldEnum = (typeof RespuestasFaqScalarFieldEnum)[keyof typeof RespuestasFaqScalarFieldEnum]


  export const PreguntasFrecuentesScalarFieldEnum: {
    id_prefrec: 'id_prefrec',
    pregunta: 'pregunta',
    tipo: 'tipo'
  };

  export type PreguntasFrecuentesScalarFieldEnum = (typeof PreguntasFrecuentesScalarFieldEnum)[keyof typeof PreguntasFrecuentesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Tipo'
   */
  export type EnumTipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tipo'>
    


  /**
   * Reference to a field of type 'Tipo[]'
   */
  export type ListEnumTipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tipo[]'>
    


  /**
   * Reference to a field of type 'Estado'
   */
  export type EnumEstadoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Estado'>
    


  /**
   * Reference to a field of type 'Estado[]'
   */
  export type ListEnumEstadoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Estado[]'>
    


  /**
   * Reference to a field of type 'Prioridad'
   */
  export type EnumPrioridadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Prioridad'>
    


  /**
   * Reference to a field of type 'Prioridad[]'
   */
  export type ListEnumPrioridadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Prioridad[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TipoPregunta'
   */
  export type EnumTipoPreguntaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoPregunta'>
    


  /**
   * Reference to a field of type 'TipoPregunta[]'
   */
  export type ListEnumTipoPreguntaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoPregunta[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id_ticket?: IntFilter<"Ticket"> | number
    tipo?: EnumTipoFilter<"Ticket"> | $Enums.Tipo
    estado?: EnumEstadoFilter<"Ticket"> | $Enums.Estado
    prioridad?: EnumPrioridadFilter<"Ticket"> | $Enums.Prioridad
    motivo?: StringFilter<"Ticket"> | string
    descripcion?: StringFilter<"Ticket"> | string
    fecha_inicio?: DateTimeFilter<"Ticket"> | Date | string
    fecha_cierre?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    respuesta?: StringNullableFilter<"Ticket"> | string | null
    id_user?: StringFilter<"Ticket"> | string
    comentarios?: TicketComentarioListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TicketOrderByWithRelationInput = {
    id_ticket?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    motivo?: SortOrder
    descripcion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_cierre?: SortOrderInput | SortOrder
    respuesta?: SortOrderInput | SortOrder
    id_user?: SortOrder
    comentarios?: TicketComentarioOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id_ticket?: number
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    tipo?: EnumTipoFilter<"Ticket"> | $Enums.Tipo
    estado?: EnumEstadoFilter<"Ticket"> | $Enums.Estado
    prioridad?: EnumPrioridadFilter<"Ticket"> | $Enums.Prioridad
    motivo?: StringFilter<"Ticket"> | string
    descripcion?: StringFilter<"Ticket"> | string
    fecha_inicio?: DateTimeFilter<"Ticket"> | Date | string
    fecha_cierre?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    respuesta?: StringNullableFilter<"Ticket"> | string | null
    id_user?: StringFilter<"Ticket"> | string
    comentarios?: TicketComentarioListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id_ticket">

  export type TicketOrderByWithAggregationInput = {
    id_ticket?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    motivo?: SortOrder
    descripcion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_cierre?: SortOrderInput | SortOrder
    respuesta?: SortOrderInput | SortOrder
    id_user?: SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id_ticket?: IntWithAggregatesFilter<"Ticket"> | number
    tipo?: EnumTipoWithAggregatesFilter<"Ticket"> | $Enums.Tipo
    estado?: EnumEstadoWithAggregatesFilter<"Ticket"> | $Enums.Estado
    prioridad?: EnumPrioridadWithAggregatesFilter<"Ticket"> | $Enums.Prioridad
    motivo?: StringWithAggregatesFilter<"Ticket"> | string
    descripcion?: StringWithAggregatesFilter<"Ticket"> | string
    fecha_inicio?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    fecha_cierre?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    respuesta?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    id_user?: StringWithAggregatesFilter<"Ticket"> | string
  }

  export type TicketComentarioWhereInput = {
    AND?: TicketComentarioWhereInput | TicketComentarioWhereInput[]
    OR?: TicketComentarioWhereInput[]
    NOT?: TicketComentarioWhereInput | TicketComentarioWhereInput[]
    id_comentario?: IntFilter<"TicketComentario"> | number
    id_ticket?: IntFilter<"TicketComentario"> | number
    comentario?: StringFilter<"TicketComentario"> | string
    fecha?: DateTimeFilter<"TicketComentario"> | Date | string
    ticket?: XOR<TicketRelationFilter, TicketWhereInput>
  }

  export type TicketComentarioOrderByWithRelationInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
    comentario?: SortOrder
    fecha?: SortOrder
    ticket?: TicketOrderByWithRelationInput
  }

  export type TicketComentarioWhereUniqueInput = Prisma.AtLeast<{
    id_comentario?: number
    AND?: TicketComentarioWhereInput | TicketComentarioWhereInput[]
    OR?: TicketComentarioWhereInput[]
    NOT?: TicketComentarioWhereInput | TicketComentarioWhereInput[]
    id_ticket?: IntFilter<"TicketComentario"> | number
    comentario?: StringFilter<"TicketComentario"> | string
    fecha?: DateTimeFilter<"TicketComentario"> | Date | string
    ticket?: XOR<TicketRelationFilter, TicketWhereInput>
  }, "id_comentario">

  export type TicketComentarioOrderByWithAggregationInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
    comentario?: SortOrder
    fecha?: SortOrder
    _count?: TicketComentarioCountOrderByAggregateInput
    _avg?: TicketComentarioAvgOrderByAggregateInput
    _max?: TicketComentarioMaxOrderByAggregateInput
    _min?: TicketComentarioMinOrderByAggregateInput
    _sum?: TicketComentarioSumOrderByAggregateInput
  }

  export type TicketComentarioScalarWhereWithAggregatesInput = {
    AND?: TicketComentarioScalarWhereWithAggregatesInput | TicketComentarioScalarWhereWithAggregatesInput[]
    OR?: TicketComentarioScalarWhereWithAggregatesInput[]
    NOT?: TicketComentarioScalarWhereWithAggregatesInput | TicketComentarioScalarWhereWithAggregatesInput[]
    id_comentario?: IntWithAggregatesFilter<"TicketComentario"> | number
    id_ticket?: IntWithAggregatesFilter<"TicketComentario"> | number
    comentario?: StringWithAggregatesFilter<"TicketComentario"> | string
    fecha?: DateTimeWithAggregatesFilter<"TicketComentario"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    apellidos?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    tickets?: TicketListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    email?: SortOrder
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nombre?: StringFilter<"User"> | string
    apellidos?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    tickets?: TicketListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    email?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nombre?: StringWithAggregatesFilter<"User"> | string
    apellidos?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
  }

  export type RespuestasFaqWhereInput = {
    AND?: RespuestasFaqWhereInput | RespuestasFaqWhereInput[]
    OR?: RespuestasFaqWhereInput[]
    NOT?: RespuestasFaqWhereInput | RespuestasFaqWhereInput[]
    id_faqRespuesta?: IntFilter<"RespuestasFaq"> | number
    id_prefrec?: IntFilter<"RespuestasFaq"> | number
    respuesta?: StringFilter<"RespuestasFaq"> | string
    pregunta?: XOR<PreguntasFrecuentesRelationFilter, PreguntasFrecuentesWhereInput>
  }

  export type RespuestasFaqOrderByWithRelationInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
    respuesta?: SortOrder
    pregunta?: PreguntasFrecuentesOrderByWithRelationInput
  }

  export type RespuestasFaqWhereUniqueInput = Prisma.AtLeast<{
    id_faqRespuesta?: number
    AND?: RespuestasFaqWhereInput | RespuestasFaqWhereInput[]
    OR?: RespuestasFaqWhereInput[]
    NOT?: RespuestasFaqWhereInput | RespuestasFaqWhereInput[]
    id_prefrec?: IntFilter<"RespuestasFaq"> | number
    respuesta?: StringFilter<"RespuestasFaq"> | string
    pregunta?: XOR<PreguntasFrecuentesRelationFilter, PreguntasFrecuentesWhereInput>
  }, "id_faqRespuesta">

  export type RespuestasFaqOrderByWithAggregationInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
    respuesta?: SortOrder
    _count?: RespuestasFaqCountOrderByAggregateInput
    _avg?: RespuestasFaqAvgOrderByAggregateInput
    _max?: RespuestasFaqMaxOrderByAggregateInput
    _min?: RespuestasFaqMinOrderByAggregateInput
    _sum?: RespuestasFaqSumOrderByAggregateInput
  }

  export type RespuestasFaqScalarWhereWithAggregatesInput = {
    AND?: RespuestasFaqScalarWhereWithAggregatesInput | RespuestasFaqScalarWhereWithAggregatesInput[]
    OR?: RespuestasFaqScalarWhereWithAggregatesInput[]
    NOT?: RespuestasFaqScalarWhereWithAggregatesInput | RespuestasFaqScalarWhereWithAggregatesInput[]
    id_faqRespuesta?: IntWithAggregatesFilter<"RespuestasFaq"> | number
    id_prefrec?: IntWithAggregatesFilter<"RespuestasFaq"> | number
    respuesta?: StringWithAggregatesFilter<"RespuestasFaq"> | string
  }

  export type PreguntasFrecuentesWhereInput = {
    AND?: PreguntasFrecuentesWhereInput | PreguntasFrecuentesWhereInput[]
    OR?: PreguntasFrecuentesWhereInput[]
    NOT?: PreguntasFrecuentesWhereInput | PreguntasFrecuentesWhereInput[]
    id_prefrec?: IntFilter<"PreguntasFrecuentes"> | number
    pregunta?: StringFilter<"PreguntasFrecuentes"> | string
    tipo?: EnumTipoPreguntaFilter<"PreguntasFrecuentes"> | $Enums.TipoPregunta
    respuestas?: RespuestasFaqListRelationFilter
  }

  export type PreguntasFrecuentesOrderByWithRelationInput = {
    id_prefrec?: SortOrder
    pregunta?: SortOrder
    tipo?: SortOrder
    respuestas?: RespuestasFaqOrderByRelationAggregateInput
  }

  export type PreguntasFrecuentesWhereUniqueInput = Prisma.AtLeast<{
    id_prefrec?: number
    AND?: PreguntasFrecuentesWhereInput | PreguntasFrecuentesWhereInput[]
    OR?: PreguntasFrecuentesWhereInput[]
    NOT?: PreguntasFrecuentesWhereInput | PreguntasFrecuentesWhereInput[]
    pregunta?: StringFilter<"PreguntasFrecuentes"> | string
    tipo?: EnumTipoPreguntaFilter<"PreguntasFrecuentes"> | $Enums.TipoPregunta
    respuestas?: RespuestasFaqListRelationFilter
  }, "id_prefrec">

  export type PreguntasFrecuentesOrderByWithAggregationInput = {
    id_prefrec?: SortOrder
    pregunta?: SortOrder
    tipo?: SortOrder
    _count?: PreguntasFrecuentesCountOrderByAggregateInput
    _avg?: PreguntasFrecuentesAvgOrderByAggregateInput
    _max?: PreguntasFrecuentesMaxOrderByAggregateInput
    _min?: PreguntasFrecuentesMinOrderByAggregateInput
    _sum?: PreguntasFrecuentesSumOrderByAggregateInput
  }

  export type PreguntasFrecuentesScalarWhereWithAggregatesInput = {
    AND?: PreguntasFrecuentesScalarWhereWithAggregatesInput | PreguntasFrecuentesScalarWhereWithAggregatesInput[]
    OR?: PreguntasFrecuentesScalarWhereWithAggregatesInput[]
    NOT?: PreguntasFrecuentesScalarWhereWithAggregatesInput | PreguntasFrecuentesScalarWhereWithAggregatesInput[]
    id_prefrec?: IntWithAggregatesFilter<"PreguntasFrecuentes"> | number
    pregunta?: StringWithAggregatesFilter<"PreguntasFrecuentes"> | string
    tipo?: EnumTipoPreguntaWithAggregatesFilter<"PreguntasFrecuentes"> | $Enums.TipoPregunta
  }

  export type TicketCreateInput = {
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    comentarios?: TicketComentarioCreateNestedManyWithoutTicketInput
    user: UserCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateInput = {
    id_ticket?: number
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    id_user: string
    comentarios?: TicketComentarioUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketUpdateInput = {
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    comentarios?: TicketComentarioUpdateManyWithoutTicketNestedInput
    user?: UserUpdateOneRequiredWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id_ticket?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: StringFieldUpdateOperationsInput | string
    comentarios?: TicketComentarioUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketCreateManyInput = {
    id_ticket?: number
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    id_user: string
  }

  export type TicketUpdateManyMutationInput = {
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketUncheckedUpdateManyInput = {
    id_ticket?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: StringFieldUpdateOperationsInput | string
  }

  export type TicketComentarioCreateInput = {
    comentario: string
    fecha: Date | string
    ticket: TicketCreateNestedOneWithoutComentariosInput
  }

  export type TicketComentarioUncheckedCreateInput = {
    id_comentario?: number
    id_ticket: number
    comentario: string
    fecha: Date | string
  }

  export type TicketComentarioUpdateInput = {
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutComentariosNestedInput
  }

  export type TicketComentarioUncheckedUpdateInput = {
    id_comentario?: IntFieldUpdateOperationsInput | number
    id_ticket?: IntFieldUpdateOperationsInput | number
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketComentarioCreateManyInput = {
    id_comentario?: number
    id_ticket: number
    comentario: string
    fecha: Date | string
  }

  export type TicketComentarioUpdateManyMutationInput = {
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketComentarioUncheckedUpdateManyInput = {
    id_comentario?: IntFieldUpdateOperationsInput | number
    id_ticket?: IntFieldUpdateOperationsInput | number
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nombre: string
    apellidos: string
    email: string
    tickets?: TicketCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nombre: string
    apellidos: string
    email: string
    tickets?: TicketUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tickets?: TicketUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tickets?: TicketUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nombre: string
    apellidos: string
    email: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type RespuestasFaqCreateInput = {
    respuesta: string
    pregunta: PreguntasFrecuentesCreateNestedOneWithoutRespuestasInput
  }

  export type RespuestasFaqUncheckedCreateInput = {
    id_faqRespuesta?: number
    id_prefrec: number
    respuesta: string
  }

  export type RespuestasFaqUpdateInput = {
    respuesta?: StringFieldUpdateOperationsInput | string
    pregunta?: PreguntasFrecuentesUpdateOneRequiredWithoutRespuestasNestedInput
  }

  export type RespuestasFaqUncheckedUpdateInput = {
    id_faqRespuesta?: IntFieldUpdateOperationsInput | number
    id_prefrec?: IntFieldUpdateOperationsInput | number
    respuesta?: StringFieldUpdateOperationsInput | string
  }

  export type RespuestasFaqCreateManyInput = {
    id_faqRespuesta?: number
    id_prefrec: number
    respuesta: string
  }

  export type RespuestasFaqUpdateManyMutationInput = {
    respuesta?: StringFieldUpdateOperationsInput | string
  }

  export type RespuestasFaqUncheckedUpdateManyInput = {
    id_faqRespuesta?: IntFieldUpdateOperationsInput | number
    id_prefrec?: IntFieldUpdateOperationsInput | number
    respuesta?: StringFieldUpdateOperationsInput | string
  }

  export type PreguntasFrecuentesCreateInput = {
    pregunta: string
    tipo?: $Enums.TipoPregunta
    respuestas?: RespuestasFaqCreateNestedManyWithoutPreguntaInput
  }

  export type PreguntasFrecuentesUncheckedCreateInput = {
    id_prefrec?: number
    pregunta: string
    tipo?: $Enums.TipoPregunta
    respuestas?: RespuestasFaqUncheckedCreateNestedManyWithoutPreguntaInput
  }

  export type PreguntasFrecuentesUpdateInput = {
    pregunta?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoPreguntaFieldUpdateOperationsInput | $Enums.TipoPregunta
    respuestas?: RespuestasFaqUpdateManyWithoutPreguntaNestedInput
  }

  export type PreguntasFrecuentesUncheckedUpdateInput = {
    id_prefrec?: IntFieldUpdateOperationsInput | number
    pregunta?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoPreguntaFieldUpdateOperationsInput | $Enums.TipoPregunta
    respuestas?: RespuestasFaqUncheckedUpdateManyWithoutPreguntaNestedInput
  }

  export type PreguntasFrecuentesCreateManyInput = {
    id_prefrec?: number
    pregunta: string
    tipo?: $Enums.TipoPregunta
  }

  export type PreguntasFrecuentesUpdateManyMutationInput = {
    pregunta?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoPreguntaFieldUpdateOperationsInput | $Enums.TipoPregunta
  }

  export type PreguntasFrecuentesUncheckedUpdateManyInput = {
    id_prefrec?: IntFieldUpdateOperationsInput | number
    pregunta?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoPreguntaFieldUpdateOperationsInput | $Enums.TipoPregunta
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTipoFilter<$PrismaModel = never> = {
    equals?: $Enums.Tipo | EnumTipoFieldRefInput<$PrismaModel>
    in?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoFilter<$PrismaModel> | $Enums.Tipo
  }

  export type EnumEstadoFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado | EnumEstadoFieldRefInput<$PrismaModel>
    in?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFilter<$PrismaModel> | $Enums.Estado
  }

  export type EnumPrioridadFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadFilter<$PrismaModel> | $Enums.Prioridad
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type TicketComentarioListRelationFilter = {
    every?: TicketComentarioWhereInput
    some?: TicketComentarioWhereInput
    none?: TicketComentarioWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TicketComentarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketCountOrderByAggregateInput = {
    id_ticket?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    motivo?: SortOrder
    descripcion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_cierre?: SortOrder
    respuesta?: SortOrder
    id_user?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    id_ticket?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id_ticket?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    motivo?: SortOrder
    descripcion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_cierre?: SortOrder
    respuesta?: SortOrder
    id_user?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id_ticket?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    motivo?: SortOrder
    descripcion?: SortOrder
    fecha_inicio?: SortOrder
    fecha_cierre?: SortOrder
    respuesta?: SortOrder
    id_user?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    id_ticket?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTipoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tipo | EnumTipoFieldRefInput<$PrismaModel>
    in?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoWithAggregatesFilter<$PrismaModel> | $Enums.Tipo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoFilter<$PrismaModel>
    _max?: NestedEnumTipoFilter<$PrismaModel>
  }

  export type EnumEstadoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado | EnumEstadoFieldRefInput<$PrismaModel>
    in?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoWithAggregatesFilter<$PrismaModel> | $Enums.Estado
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoFilter<$PrismaModel>
    _max?: NestedEnumEstadoFilter<$PrismaModel>
  }

  export type EnumPrioridadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadWithAggregatesFilter<$PrismaModel> | $Enums.Prioridad
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrioridadFilter<$PrismaModel>
    _max?: NestedEnumPrioridadFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TicketRelationFilter = {
    is?: TicketWhereInput
    isNot?: TicketWhereInput
  }

  export type TicketComentarioCountOrderByAggregateInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
    comentario?: SortOrder
    fecha?: SortOrder
  }

  export type TicketComentarioAvgOrderByAggregateInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
  }

  export type TicketComentarioMaxOrderByAggregateInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
    comentario?: SortOrder
    fecha?: SortOrder
  }

  export type TicketComentarioMinOrderByAggregateInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
    comentario?: SortOrder
    fecha?: SortOrder
  }

  export type TicketComentarioSumOrderByAggregateInput = {
    id_comentario?: SortOrder
    id_ticket?: SortOrder
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    email?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    email?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    email?: SortOrder
  }

  export type PreguntasFrecuentesRelationFilter = {
    is?: PreguntasFrecuentesWhereInput
    isNot?: PreguntasFrecuentesWhereInput
  }

  export type RespuestasFaqCountOrderByAggregateInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
    respuesta?: SortOrder
  }

  export type RespuestasFaqAvgOrderByAggregateInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
  }

  export type RespuestasFaqMaxOrderByAggregateInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
    respuesta?: SortOrder
  }

  export type RespuestasFaqMinOrderByAggregateInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
    respuesta?: SortOrder
  }

  export type RespuestasFaqSumOrderByAggregateInput = {
    id_faqRespuesta?: SortOrder
    id_prefrec?: SortOrder
  }

  export type EnumTipoPreguntaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPregunta | EnumTipoPreguntaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPreguntaFilter<$PrismaModel> | $Enums.TipoPregunta
  }

  export type RespuestasFaqListRelationFilter = {
    every?: RespuestasFaqWhereInput
    some?: RespuestasFaqWhereInput
    none?: RespuestasFaqWhereInput
  }

  export type RespuestasFaqOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreguntasFrecuentesCountOrderByAggregateInput = {
    id_prefrec?: SortOrder
    pregunta?: SortOrder
    tipo?: SortOrder
  }

  export type PreguntasFrecuentesAvgOrderByAggregateInput = {
    id_prefrec?: SortOrder
  }

  export type PreguntasFrecuentesMaxOrderByAggregateInput = {
    id_prefrec?: SortOrder
    pregunta?: SortOrder
    tipo?: SortOrder
  }

  export type PreguntasFrecuentesMinOrderByAggregateInput = {
    id_prefrec?: SortOrder
    pregunta?: SortOrder
    tipo?: SortOrder
  }

  export type PreguntasFrecuentesSumOrderByAggregateInput = {
    id_prefrec?: SortOrder
  }

  export type EnumTipoPreguntaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPregunta | EnumTipoPreguntaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPreguntaWithAggregatesFilter<$PrismaModel> | $Enums.TipoPregunta
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoPreguntaFilter<$PrismaModel>
    _max?: NestedEnumTipoPreguntaFilter<$PrismaModel>
  }

  export type TicketComentarioCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketComentarioCreateWithoutTicketInput, TicketComentarioUncheckedCreateWithoutTicketInput> | TicketComentarioCreateWithoutTicketInput[] | TicketComentarioUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketComentarioCreateOrConnectWithoutTicketInput | TicketComentarioCreateOrConnectWithoutTicketInput[]
    createMany?: TicketComentarioCreateManyTicketInputEnvelope
    connect?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTicketsInput = {
    create?: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type TicketComentarioUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketComentarioCreateWithoutTicketInput, TicketComentarioUncheckedCreateWithoutTicketInput> | TicketComentarioCreateWithoutTicketInput[] | TicketComentarioUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketComentarioCreateOrConnectWithoutTicketInput | TicketComentarioCreateOrConnectWithoutTicketInput[]
    createMany?: TicketComentarioCreateManyTicketInputEnvelope
    connect?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
  }

  export type EnumTipoFieldUpdateOperationsInput = {
    set?: $Enums.Tipo
  }

  export type EnumEstadoFieldUpdateOperationsInput = {
    set?: $Enums.Estado
  }

  export type EnumPrioridadFieldUpdateOperationsInput = {
    set?: $Enums.Prioridad
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TicketComentarioUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketComentarioCreateWithoutTicketInput, TicketComentarioUncheckedCreateWithoutTicketInput> | TicketComentarioCreateWithoutTicketInput[] | TicketComentarioUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketComentarioCreateOrConnectWithoutTicketInput | TicketComentarioCreateOrConnectWithoutTicketInput[]
    upsert?: TicketComentarioUpsertWithWhereUniqueWithoutTicketInput | TicketComentarioUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketComentarioCreateManyTicketInputEnvelope
    set?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    disconnect?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    delete?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    connect?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    update?: TicketComentarioUpdateWithWhereUniqueWithoutTicketInput | TicketComentarioUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketComentarioUpdateManyWithWhereWithoutTicketInput | TicketComentarioUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketComentarioScalarWhereInput | TicketComentarioScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsInput
    upsert?: UserUpsertWithoutTicketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsInput, UserUpdateWithoutTicketsInput>, UserUncheckedUpdateWithoutTicketsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TicketComentarioUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketComentarioCreateWithoutTicketInput, TicketComentarioUncheckedCreateWithoutTicketInput> | TicketComentarioCreateWithoutTicketInput[] | TicketComentarioUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketComentarioCreateOrConnectWithoutTicketInput | TicketComentarioCreateOrConnectWithoutTicketInput[]
    upsert?: TicketComentarioUpsertWithWhereUniqueWithoutTicketInput | TicketComentarioUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketComentarioCreateManyTicketInputEnvelope
    set?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    disconnect?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    delete?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    connect?: TicketComentarioWhereUniqueInput | TicketComentarioWhereUniqueInput[]
    update?: TicketComentarioUpdateWithWhereUniqueWithoutTicketInput | TicketComentarioUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketComentarioUpdateManyWithWhereWithoutTicketInput | TicketComentarioUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketComentarioScalarWhereInput | TicketComentarioScalarWhereInput[]
  }

  export type TicketCreateNestedOneWithoutComentariosInput = {
    create?: XOR<TicketCreateWithoutComentariosInput, TicketUncheckedCreateWithoutComentariosInput>
    connectOrCreate?: TicketCreateOrConnectWithoutComentariosInput
    connect?: TicketWhereUniqueInput
  }

  export type TicketUpdateOneRequiredWithoutComentariosNestedInput = {
    create?: XOR<TicketCreateWithoutComentariosInput, TicketUncheckedCreateWithoutComentariosInput>
    connectOrCreate?: TicketCreateOrConnectWithoutComentariosInput
    upsert?: TicketUpsertWithoutComentariosInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutComentariosInput, TicketUpdateWithoutComentariosInput>, TicketUncheckedUpdateWithoutComentariosInput>
  }

  export type TicketCreateNestedManyWithoutUserInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUpdateManyWithoutUserNestedInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutUserInput | TicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutUserInput | TicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutUserInput | TicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutUserInput | TicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutUserInput | TicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutUserInput | TicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type PreguntasFrecuentesCreateNestedOneWithoutRespuestasInput = {
    create?: XOR<PreguntasFrecuentesCreateWithoutRespuestasInput, PreguntasFrecuentesUncheckedCreateWithoutRespuestasInput>
    connectOrCreate?: PreguntasFrecuentesCreateOrConnectWithoutRespuestasInput
    connect?: PreguntasFrecuentesWhereUniqueInput
  }

  export type PreguntasFrecuentesUpdateOneRequiredWithoutRespuestasNestedInput = {
    create?: XOR<PreguntasFrecuentesCreateWithoutRespuestasInput, PreguntasFrecuentesUncheckedCreateWithoutRespuestasInput>
    connectOrCreate?: PreguntasFrecuentesCreateOrConnectWithoutRespuestasInput
    upsert?: PreguntasFrecuentesUpsertWithoutRespuestasInput
    connect?: PreguntasFrecuentesWhereUniqueInput
    update?: XOR<XOR<PreguntasFrecuentesUpdateToOneWithWhereWithoutRespuestasInput, PreguntasFrecuentesUpdateWithoutRespuestasInput>, PreguntasFrecuentesUncheckedUpdateWithoutRespuestasInput>
  }

  export type RespuestasFaqCreateNestedManyWithoutPreguntaInput = {
    create?: XOR<RespuestasFaqCreateWithoutPreguntaInput, RespuestasFaqUncheckedCreateWithoutPreguntaInput> | RespuestasFaqCreateWithoutPreguntaInput[] | RespuestasFaqUncheckedCreateWithoutPreguntaInput[]
    connectOrCreate?: RespuestasFaqCreateOrConnectWithoutPreguntaInput | RespuestasFaqCreateOrConnectWithoutPreguntaInput[]
    createMany?: RespuestasFaqCreateManyPreguntaInputEnvelope
    connect?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
  }

  export type RespuestasFaqUncheckedCreateNestedManyWithoutPreguntaInput = {
    create?: XOR<RespuestasFaqCreateWithoutPreguntaInput, RespuestasFaqUncheckedCreateWithoutPreguntaInput> | RespuestasFaqCreateWithoutPreguntaInput[] | RespuestasFaqUncheckedCreateWithoutPreguntaInput[]
    connectOrCreate?: RespuestasFaqCreateOrConnectWithoutPreguntaInput | RespuestasFaqCreateOrConnectWithoutPreguntaInput[]
    createMany?: RespuestasFaqCreateManyPreguntaInputEnvelope
    connect?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
  }

  export type EnumTipoPreguntaFieldUpdateOperationsInput = {
    set?: $Enums.TipoPregunta
  }

  export type RespuestasFaqUpdateManyWithoutPreguntaNestedInput = {
    create?: XOR<RespuestasFaqCreateWithoutPreguntaInput, RespuestasFaqUncheckedCreateWithoutPreguntaInput> | RespuestasFaqCreateWithoutPreguntaInput[] | RespuestasFaqUncheckedCreateWithoutPreguntaInput[]
    connectOrCreate?: RespuestasFaqCreateOrConnectWithoutPreguntaInput | RespuestasFaqCreateOrConnectWithoutPreguntaInput[]
    upsert?: RespuestasFaqUpsertWithWhereUniqueWithoutPreguntaInput | RespuestasFaqUpsertWithWhereUniqueWithoutPreguntaInput[]
    createMany?: RespuestasFaqCreateManyPreguntaInputEnvelope
    set?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    disconnect?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    delete?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    connect?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    update?: RespuestasFaqUpdateWithWhereUniqueWithoutPreguntaInput | RespuestasFaqUpdateWithWhereUniqueWithoutPreguntaInput[]
    updateMany?: RespuestasFaqUpdateManyWithWhereWithoutPreguntaInput | RespuestasFaqUpdateManyWithWhereWithoutPreguntaInput[]
    deleteMany?: RespuestasFaqScalarWhereInput | RespuestasFaqScalarWhereInput[]
  }

  export type RespuestasFaqUncheckedUpdateManyWithoutPreguntaNestedInput = {
    create?: XOR<RespuestasFaqCreateWithoutPreguntaInput, RespuestasFaqUncheckedCreateWithoutPreguntaInput> | RespuestasFaqCreateWithoutPreguntaInput[] | RespuestasFaqUncheckedCreateWithoutPreguntaInput[]
    connectOrCreate?: RespuestasFaqCreateOrConnectWithoutPreguntaInput | RespuestasFaqCreateOrConnectWithoutPreguntaInput[]
    upsert?: RespuestasFaqUpsertWithWhereUniqueWithoutPreguntaInput | RespuestasFaqUpsertWithWhereUniqueWithoutPreguntaInput[]
    createMany?: RespuestasFaqCreateManyPreguntaInputEnvelope
    set?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    disconnect?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    delete?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    connect?: RespuestasFaqWhereUniqueInput | RespuestasFaqWhereUniqueInput[]
    update?: RespuestasFaqUpdateWithWhereUniqueWithoutPreguntaInput | RespuestasFaqUpdateWithWhereUniqueWithoutPreguntaInput[]
    updateMany?: RespuestasFaqUpdateManyWithWhereWithoutPreguntaInput | RespuestasFaqUpdateManyWithWhereWithoutPreguntaInput[]
    deleteMany?: RespuestasFaqScalarWhereInput | RespuestasFaqScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumTipoFilter<$PrismaModel = never> = {
    equals?: $Enums.Tipo | EnumTipoFieldRefInput<$PrismaModel>
    in?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoFilter<$PrismaModel> | $Enums.Tipo
  }

  export type NestedEnumEstadoFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado | EnumEstadoFieldRefInput<$PrismaModel>
    in?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFilter<$PrismaModel> | $Enums.Estado
  }

  export type NestedEnumPrioridadFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadFilter<$PrismaModel> | $Enums.Prioridad
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTipoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tipo | EnumTipoFieldRefInput<$PrismaModel>
    in?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tipo[] | ListEnumTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoWithAggregatesFilter<$PrismaModel> | $Enums.Tipo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoFilter<$PrismaModel>
    _max?: NestedEnumTipoFilter<$PrismaModel>
  }

  export type NestedEnumEstadoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado | EnumEstadoFieldRefInput<$PrismaModel>
    in?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado[] | ListEnumEstadoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoWithAggregatesFilter<$PrismaModel> | $Enums.Estado
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoFilter<$PrismaModel>
    _max?: NestedEnumEstadoFilter<$PrismaModel>
  }

  export type NestedEnumPrioridadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadWithAggregatesFilter<$PrismaModel> | $Enums.Prioridad
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrioridadFilter<$PrismaModel>
    _max?: NestedEnumPrioridadFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumTipoPreguntaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPregunta | EnumTipoPreguntaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPreguntaFilter<$PrismaModel> | $Enums.TipoPregunta
  }

  export type NestedEnumTipoPreguntaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPregunta | EnumTipoPreguntaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPregunta[] | ListEnumTipoPreguntaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPreguntaWithAggregatesFilter<$PrismaModel> | $Enums.TipoPregunta
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoPreguntaFilter<$PrismaModel>
    _max?: NestedEnumTipoPreguntaFilter<$PrismaModel>
  }

  export type TicketComentarioCreateWithoutTicketInput = {
    comentario: string
    fecha: Date | string
  }

  export type TicketComentarioUncheckedCreateWithoutTicketInput = {
    id_comentario?: number
    comentario: string
    fecha: Date | string
  }

  export type TicketComentarioCreateOrConnectWithoutTicketInput = {
    where: TicketComentarioWhereUniqueInput
    create: XOR<TicketComentarioCreateWithoutTicketInput, TicketComentarioUncheckedCreateWithoutTicketInput>
  }

  export type TicketComentarioCreateManyTicketInputEnvelope = {
    data: TicketComentarioCreateManyTicketInput | TicketComentarioCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTicketsInput = {
    id?: string
    nombre: string
    apellidos: string
    email: string
  }

  export type UserUncheckedCreateWithoutTicketsInput = {
    id?: string
    nombre: string
    apellidos: string
    email: string
  }

  export type UserCreateOrConnectWithoutTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
  }

  export type TicketComentarioUpsertWithWhereUniqueWithoutTicketInput = {
    where: TicketComentarioWhereUniqueInput
    update: XOR<TicketComentarioUpdateWithoutTicketInput, TicketComentarioUncheckedUpdateWithoutTicketInput>
    create: XOR<TicketComentarioCreateWithoutTicketInput, TicketComentarioUncheckedCreateWithoutTicketInput>
  }

  export type TicketComentarioUpdateWithWhereUniqueWithoutTicketInput = {
    where: TicketComentarioWhereUniqueInput
    data: XOR<TicketComentarioUpdateWithoutTicketInput, TicketComentarioUncheckedUpdateWithoutTicketInput>
  }

  export type TicketComentarioUpdateManyWithWhereWithoutTicketInput = {
    where: TicketComentarioScalarWhereInput
    data: XOR<TicketComentarioUpdateManyMutationInput, TicketComentarioUncheckedUpdateManyWithoutTicketInput>
  }

  export type TicketComentarioScalarWhereInput = {
    AND?: TicketComentarioScalarWhereInput | TicketComentarioScalarWhereInput[]
    OR?: TicketComentarioScalarWhereInput[]
    NOT?: TicketComentarioScalarWhereInput | TicketComentarioScalarWhereInput[]
    id_comentario?: IntFilter<"TicketComentario"> | number
    id_ticket?: IntFilter<"TicketComentario"> | number
    comentario?: StringFilter<"TicketComentario"> | string
    fecha?: DateTimeFilter<"TicketComentario"> | Date | string
  }

  export type UserUpsertWithoutTicketsInput = {
    update: XOR<UserUpdateWithoutTicketsInput, UserUncheckedUpdateWithoutTicketsInput>
    create: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsInput, UserUncheckedUpdateWithoutTicketsInput>
  }

  export type UserUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type TicketCreateWithoutComentariosInput = {
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    user: UserCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateWithoutComentariosInput = {
    id_ticket?: number
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    id_user: string
  }

  export type TicketCreateOrConnectWithoutComentariosInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutComentariosInput, TicketUncheckedCreateWithoutComentariosInput>
  }

  export type TicketUpsertWithoutComentariosInput = {
    update: XOR<TicketUpdateWithoutComentariosInput, TicketUncheckedUpdateWithoutComentariosInput>
    create: XOR<TicketCreateWithoutComentariosInput, TicketUncheckedCreateWithoutComentariosInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutComentariosInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutComentariosInput, TicketUncheckedUpdateWithoutComentariosInput>
  }

  export type TicketUpdateWithoutComentariosInput = {
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutComentariosInput = {
    id_ticket?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: StringFieldUpdateOperationsInput | string
  }

  export type TicketCreateWithoutUserInput = {
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    comentarios?: TicketComentarioCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutUserInput = {
    id_ticket?: number
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
    comentarios?: TicketComentarioUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutUserInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput>
  }

  export type TicketCreateManyUserInputEnvelope = {
    data: TicketCreateManyUserInput | TicketCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TicketUpsertWithWhereUniqueWithoutUserInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutUserInput, TicketUncheckedUpdateWithoutUserInput>
    create: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutUserInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutUserInput, TicketUncheckedUpdateWithoutUserInput>
  }

  export type TicketUpdateManyWithWhereWithoutUserInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutUserInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id_ticket?: IntFilter<"Ticket"> | number
    tipo?: EnumTipoFilter<"Ticket"> | $Enums.Tipo
    estado?: EnumEstadoFilter<"Ticket"> | $Enums.Estado
    prioridad?: EnumPrioridadFilter<"Ticket"> | $Enums.Prioridad
    motivo?: StringFilter<"Ticket"> | string
    descripcion?: StringFilter<"Ticket"> | string
    fecha_inicio?: DateTimeFilter<"Ticket"> | Date | string
    fecha_cierre?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    respuesta?: StringNullableFilter<"Ticket"> | string | null
    id_user?: StringFilter<"Ticket"> | string
  }

  export type PreguntasFrecuentesCreateWithoutRespuestasInput = {
    pregunta: string
    tipo?: $Enums.TipoPregunta
  }

  export type PreguntasFrecuentesUncheckedCreateWithoutRespuestasInput = {
    id_prefrec?: number
    pregunta: string
    tipo?: $Enums.TipoPregunta
  }

  export type PreguntasFrecuentesCreateOrConnectWithoutRespuestasInput = {
    where: PreguntasFrecuentesWhereUniqueInput
    create: XOR<PreguntasFrecuentesCreateWithoutRespuestasInput, PreguntasFrecuentesUncheckedCreateWithoutRespuestasInput>
  }

  export type PreguntasFrecuentesUpsertWithoutRespuestasInput = {
    update: XOR<PreguntasFrecuentesUpdateWithoutRespuestasInput, PreguntasFrecuentesUncheckedUpdateWithoutRespuestasInput>
    create: XOR<PreguntasFrecuentesCreateWithoutRespuestasInput, PreguntasFrecuentesUncheckedCreateWithoutRespuestasInput>
    where?: PreguntasFrecuentesWhereInput
  }

  export type PreguntasFrecuentesUpdateToOneWithWhereWithoutRespuestasInput = {
    where?: PreguntasFrecuentesWhereInput
    data: XOR<PreguntasFrecuentesUpdateWithoutRespuestasInput, PreguntasFrecuentesUncheckedUpdateWithoutRespuestasInput>
  }

  export type PreguntasFrecuentesUpdateWithoutRespuestasInput = {
    pregunta?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoPreguntaFieldUpdateOperationsInput | $Enums.TipoPregunta
  }

  export type PreguntasFrecuentesUncheckedUpdateWithoutRespuestasInput = {
    id_prefrec?: IntFieldUpdateOperationsInput | number
    pregunta?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoPreguntaFieldUpdateOperationsInput | $Enums.TipoPregunta
  }

  export type RespuestasFaqCreateWithoutPreguntaInput = {
    respuesta: string
  }

  export type RespuestasFaqUncheckedCreateWithoutPreguntaInput = {
    id_faqRespuesta?: number
    respuesta: string
  }

  export type RespuestasFaqCreateOrConnectWithoutPreguntaInput = {
    where: RespuestasFaqWhereUniqueInput
    create: XOR<RespuestasFaqCreateWithoutPreguntaInput, RespuestasFaqUncheckedCreateWithoutPreguntaInput>
  }

  export type RespuestasFaqCreateManyPreguntaInputEnvelope = {
    data: RespuestasFaqCreateManyPreguntaInput | RespuestasFaqCreateManyPreguntaInput[]
    skipDuplicates?: boolean
  }

  export type RespuestasFaqUpsertWithWhereUniqueWithoutPreguntaInput = {
    where: RespuestasFaqWhereUniqueInput
    update: XOR<RespuestasFaqUpdateWithoutPreguntaInput, RespuestasFaqUncheckedUpdateWithoutPreguntaInput>
    create: XOR<RespuestasFaqCreateWithoutPreguntaInput, RespuestasFaqUncheckedCreateWithoutPreguntaInput>
  }

  export type RespuestasFaqUpdateWithWhereUniqueWithoutPreguntaInput = {
    where: RespuestasFaqWhereUniqueInput
    data: XOR<RespuestasFaqUpdateWithoutPreguntaInput, RespuestasFaqUncheckedUpdateWithoutPreguntaInput>
  }

  export type RespuestasFaqUpdateManyWithWhereWithoutPreguntaInput = {
    where: RespuestasFaqScalarWhereInput
    data: XOR<RespuestasFaqUpdateManyMutationInput, RespuestasFaqUncheckedUpdateManyWithoutPreguntaInput>
  }

  export type RespuestasFaqScalarWhereInput = {
    AND?: RespuestasFaqScalarWhereInput | RespuestasFaqScalarWhereInput[]
    OR?: RespuestasFaqScalarWhereInput[]
    NOT?: RespuestasFaqScalarWhereInput | RespuestasFaqScalarWhereInput[]
    id_faqRespuesta?: IntFilter<"RespuestasFaq"> | number
    id_prefrec?: IntFilter<"RespuestasFaq"> | number
    respuesta?: StringFilter<"RespuestasFaq"> | string
  }

  export type TicketComentarioCreateManyTicketInput = {
    id_comentario?: number
    comentario: string
    fecha: Date | string
  }

  export type TicketComentarioUpdateWithoutTicketInput = {
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketComentarioUncheckedUpdateWithoutTicketInput = {
    id_comentario?: IntFieldUpdateOperationsInput | number
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketComentarioUncheckedUpdateManyWithoutTicketInput = {
    id_comentario?: IntFieldUpdateOperationsInput | number
    comentario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateManyUserInput = {
    id_ticket?: number
    tipo: $Enums.Tipo
    estado: $Enums.Estado
    prioridad: $Enums.Prioridad
    motivo: string
    descripcion: string
    fecha_inicio: Date | string
    fecha_cierre?: Date | string | null
    respuesta?: string | null
  }

  export type TicketUpdateWithoutUserInput = {
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    comentarios?: TicketComentarioUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutUserInput = {
    id_ticket?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
    comentarios?: TicketComentarioUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutUserInput = {
    id_ticket?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoFieldUpdateOperationsInput | $Enums.Tipo
    estado?: EnumEstadoFieldUpdateOperationsInput | $Enums.Estado
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    motivo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fecha_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_cierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respuesta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RespuestasFaqCreateManyPreguntaInput = {
    id_faqRespuesta?: number
    respuesta: string
  }

  export type RespuestasFaqUpdateWithoutPreguntaInput = {
    respuesta?: StringFieldUpdateOperationsInput | string
  }

  export type RespuestasFaqUncheckedUpdateWithoutPreguntaInput = {
    id_faqRespuesta?: IntFieldUpdateOperationsInput | number
    respuesta?: StringFieldUpdateOperationsInput | string
  }

  export type RespuestasFaqUncheckedUpdateManyWithoutPreguntaInput = {
    id_faqRespuesta?: IntFieldUpdateOperationsInput | number
    respuesta?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TicketCountOutputTypeDefaultArgs instead
     */
    export type TicketCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TicketCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PreguntasFrecuentesCountOutputTypeDefaultArgs instead
     */
    export type PreguntasFrecuentesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PreguntasFrecuentesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TicketDefaultArgs instead
     */
    export type TicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TicketComentarioDefaultArgs instead
     */
    export type TicketComentarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TicketComentarioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RespuestasFaqDefaultArgs instead
     */
    export type RespuestasFaqArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RespuestasFaqDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PreguntasFrecuentesDefaultArgs instead
     */
    export type PreguntasFrecuentesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PreguntasFrecuentesDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}