import { spawn } from 'node:child_process'
const prepareLog = pid => msg => console.log(`[${pid}] - ${msg}`)

const INSTANCES = 3

function spinUpInstance() {
  const cp = spawn('node', ['server.js'])

  const log = prepareLog(cp.pid)

  log('starting...')

  cp.stdout.on('data', msg => console.log(msg.toString().trim()))

  cp.on('exit', code => {
    const instanceCrashed = code === 1
    log(`exited with code ${code}`)
    if (instanceCrashed) spinUpInstance()
  })
}

for (let i =0; i< INSTANCES; i++) {
  spinUpInstance()
}