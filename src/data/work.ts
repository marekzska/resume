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
    url: 'https://www.askura.cz',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'CMS'],
  },
  {
    key: 'almiro',
    name: 'Almiro',
    url: 'https://www.almiro.org/cs',
    stack: ['Next.js', 'TypeScript', 'i18n', 'Tailwind'],
  },
  {
    key: 'almiro_eshop',
    name: 'Almiro E-shop',
    url: 'https://eshop.almiro.cz',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'E-commerce'],
  },
  {
    key: 'aplik',
    name: 'Aplik',
    url: 'https://aplik.sk',
    stack: ['React', 'TypeScript', 'Vite'],
  },
  {
    key: 'warm_motion',
    name: 'warm-motion',
    url: 'https://github.com/marekzska/resume/tree/main/packages/warm-motion',
    stack: ['React', 'TypeScript', 'Vitest', 'npm'],
  },
]
