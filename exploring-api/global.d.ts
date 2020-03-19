type NotDecidedYetOptions = unknown
type NotDecidedYetInternalMapStoringData = unknown
declare class Serializer {
    constructor(options: NotDecidedYetOptions)
    serializeSync<T>(data: T): SerializedResult<T>
    deserializeSync<T>(data: SerializedResult<T>): T
    serialize<T>(data: T): Promise<SerializedResult<T>>
    deserialize<T>(data: SerializedResult<T>): Promise<T>
    static from<T>(
        fromFn: (rootSymbol: symbol) => Map<symbol, NotDecidedYetInternalMapStoringData>
    ): SerializedResult<T>
    static to<T>(data: SerializedResult<unknown>, toFn: (rootSymbol: symbol) => T): T
}

declare class SerializedResult<ContainingData = unknown> {
    // Not constructable by developers
    private constructor(context: Serializer)
    private context: Serializer
    private internalData: Map<symbol, NotDecidedYetInternalMapStoringData>
    private readable: boolean
    private writable: boolean
    get(symbol: symbol): NotDecidedYetInternalMapStoringData
    set(symbol: symbol, data: NotDecidedYetInternalMapStoringData): this
}

// installed some future npm package that integrated with this API
declare module 'es-serializer-adaptors/bson' {
    import { BSON } from 'bson'
    export function fromBSON(buf: BSON): SerializedResult
    export function toBSON(result: SerializedResult): BSON
}
declare module 'bson' {
    export class BSON extends ArrayBuffer {}
}
// some future package
declare module 'game' {
    export class Player {}
    export const serializerConfig: NotDecidedYetOptions
}
