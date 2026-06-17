import { describe, it, expect } from 'vitest'
import { work } from './work'
import en from '../locales/en.json'
import sk from '../locales/sk.json'

type Descs = Record<string, { desc?: string } | undefined>

describe('work data ↔ locale parity', () => {
  for (const project of work) {
    it(`has en + sk descriptions for "${project.key}"`, () => {
      const enDesc = (en.work as Descs)[project.key]?.desc
      const skDesc = (sk.work as Descs)[project.key]?.desc
      expect(enDesc, `missing en.work.${project.key}.desc`).toBeTruthy()
      expect(skDesc, `missing sk.work.${project.key}.desc`).toBeTruthy()
    })
  }
})
