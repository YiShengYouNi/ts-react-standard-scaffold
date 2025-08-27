/**
 * Place app-wide utility types here to avoid scattering complex generics.
 */

export type Values<T> = T[keyof T]

export type Prettify<T> = { [K in keyof T]: T[K] } & {}
