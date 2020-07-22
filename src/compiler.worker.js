import * as Comlink from 'comlink'
import { transpile } from 'hedgehog-lab-core-test'

const compilerWorker = {
  compile: (e) => transpile(e)
}

Comlink.expose(compilerWorker)
