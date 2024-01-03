const UNKNOWN_ERROR = 1
const knownErrors = [
  { exitCode: UNKNOWN_ERROR, event: 'uncaughtException' },
  { exitCode: UNKNOWN_ERROR, event: 'unhandledRejection' }
]

const log = msg => console.log(`[${process.pid}] - ${msg}`)

knownErrors.forEach(({exitCode, event}) => {
  process.on(event, (err) => {
    log(`Process exiting due to ${event}`, err.message)
    if (exitCode === UNKNOWN_ERROR) {
      // we could use the process.abort() to take a snapshot of the system in the moment of the crash.
      // process.abort()
      process.exit(exitCode)
      return
    }

    process.exit(exitCode)
  })
})

log('Process started')

let counter = 0
const connectToDB = async () => {
  const random = Math.random()
  if (random < 0.5) {
    return Promise.reject('Could not connect to DB')
  }
  log('DB connected with success')

  // finishes the process with success
  if (++counter > 3) process.exit(0)
}

setInterval(() => {
  connectToDB()
}, 200);