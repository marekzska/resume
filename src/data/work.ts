export type Project = {
  key: string
  name: string
  url: string
  stack: string[]
}

export const work: Project[] = [
  {
    key: 'askura',
    name: 'Askura',
    url: 'https://askura.cz',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'CMS'],
  },
  {
    key: 'almiro',
    name: 'Almiro',
    url: 'https://almiro.sk',
    stack: ['Next.js', 'TypeScript', 'i18n', 'Tailwind'],
  },
  {
    key: 'aplik',
    name: 'Aplik',
    url: 'https://aplik.sk',
    stack: ['React', 'TypeScript', 'Vite'],
  },
]
