import * as Comlink from 'comlink'
import { executeOutput } from 'hedgehog-lab-core-test'

const outputWorker = {
  output: async (e) => executeOutput(e)
}

Comlink.expose(outputWorker)

