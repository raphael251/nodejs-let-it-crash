import { spawn } from 'node:child_process'
const prepareLog = pid => msg => console.log(`[${pid}] - ${msg}`)

const INSTANCES = 3

function spinUpInstance() {
  const cp = spawn('node', ['server.js'])
  const log = prepareLog(cp.pid)
  log('starting...')
  cp.stdout.on('data', msg => console.log(msg.toString().trim()))
  cp.on('exit', code => {
    const exitedWithSuccess = code === 0
    log(`exited with code ${code}`)
    if (exitedWithSuccess) {
      return
    }
    spinUpInstance()
  })
}

for (let i =0; i< INSTANCES; i++) {
  spinUpInstance()
}