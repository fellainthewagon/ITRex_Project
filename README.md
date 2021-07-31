# Project "Doctors cabinete"

A sigle Express-based app with two unrelated functionality:

1. In-memory stack (LIFO)
2. In-memory key-value store with TTL

#### In-memory stack (LIFO):

The first piece of functionality is an in-memory stack (LIFO). This portion of the application should have two endpoints:

- an endpoint to add an item to the stack
- an endpoint to return the top item of the stack
  --- requesting an item from the stack should also remove that item from the top of the stack

#### In-memory key-value store with TTL:

The second piece of functionality is an in-memory key-value store that supports TTLs on the keys.
Your interface should support:

- adding a key to the store
  --- setting a TTL should be optional to the client when adding the key
- getting the value for a key
  --- this should respect the TTL for the key if provided
- deleting the value stored for a given key
