# Proposal Serialization

Clone/transfer data between Realms & serialize data for storage.

# The basic idea

This proposal aimed to provide a generic way to serialize and deserialize data.

## What does API may look like

<img src="https://raw.githubusercontent.com/Jack-Works/proposal-serializer/master/explainer.png" />

## Design goals

### Format independent

There will not be a built-in way in ECMAScript to serialize it into a string, blob or other formats.

The host can implement one by themselves. E.g.:

Browsers should make the serialization result structure clonable (https://developer.mozilla.org/en-US/docs/DOM/The_structured_clone_algorithm ). So developers can "store" a class instance into the Indexed DB then read it back next week.

The NodeJS might be implementing a built-in module that can store the serialization result to the file system. But they should maintain the format across the new/old version by themself.

### Configurable

The structured clone algorithm is awesome, but there is no way to define custom data.
For example, CryptoKey in WebCrypto API can be stored into Indexed DB (https://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-clone ), but a CryptoKey returned by a polyfill that implements AES (https://www.npmjs.com/package/asmcrypto.js ) can't do that.

### Support Async serialization

Some data structures need to be accessed asynchronously.

### Exportable

There is an interesting property in the CryptoKey interface members: `extractable`. With extractable = false, the host can store it internally (like IndexedDB) but not exportable to the external world (export as JSONWebKey).

In this proposal, if the exportable is false, this serialization cannot be store into a place that may leak. For example for NodeJS, it's the file system.

### Sendable

If the data is okay to send to another Realm.

### Transfer?

In the structured clone algorithm, a heavy object like huge ArrayBuffer can be transferred to another Realm, then it is not accessible by the current Realm.
