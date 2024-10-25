import { addCollection } from '@iconify/vue'
import data from './data.json'

export async function downloadAndInstall(name: string) {
  const data1 = Object.freeze(await fetch(`./icons/${name}-raw.json`).then(r => r.json()))
  addCollection(data1)
}

export const icons = data.sort((a, b) => a.info.name.localeCompare(b.info.name))
