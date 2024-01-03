# Node.js let it crash

## Introduction

Project created while watching the [Erick Wendel's video](https://www.youtube.com/watch?v=iC_tKAyLeag) about error handling and the "let it crash" strategy.

### server.js

The server.js file will call the connectDB function repeatedly every 200ms and it will randomly return an unhandled promise, making the process crash.

If the process listeners weren't listening for the app errors, the app would fail, but as they are there, we can handle the crash calling the process.abort() or doing whatever we need.

### kubernetes-simulator.js

This file will spawn three instances of the server.js and listen for the exit event, spinning up new instances when the code of exit is 1, meaning that the application has crashed.

## Running the project

If you want to run the project, just run `node kubernetes-simulator.js`.
