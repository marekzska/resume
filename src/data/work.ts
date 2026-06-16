export type Project = {
  key: string
  url: string
  stack: string[]
}

export const work: Project[] = [
  {
    key: 'askura',
    url: 'https://askura.cz',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'CMS'],
  },
  {
    key: 'almiro',
    url: 'https://almiro.sk',
    stack: ['Next.js', 'TypeScript', 'i18n', 'Tailwind'],
  },
  {
    key: 'aplik',
    url: 'https://aplik.sk',
    stack: ['React', 'TypeScript', 'Vite'],
  },
]
