import { Player } from 'game'
const ser = new Serializer({})
const internal = ser.serializeSync(new Player())

postMessage(internal, '*')
onmessage = e => {
    if (!(e.data instanceof SerializedResult)) return
    const internal = e.data
    const msg = ser.deserializeSync(internal)
    if (!(msg instanceof Player)) return // unknown message
    console.log(msg)
}

import { fromBSON, toBSON } from 'es-serializer-adaptors/bson'
fetch('/', { body: toBSON(internal) })
    .then(x => x.arrayBuffer())
    .then(fromBSON)
    .then(ser.deserialize.bind(ser))
    .then(console.log)
