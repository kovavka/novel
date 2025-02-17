const images = import.meta.glob('/public/assets/**/*.png', { eager: true })

export const backgrounds: Record<string, string> = {}
export const characters: Record<string, string> = {}

export const preloadImages = () => {
  Object.values(images).forEach(module => {
    const img = new Image()
    const src = (module as { default: string }).default
    img.src = src

    const [folder, fileNameFull] = src.split('/').slice(-2)
    const fileName = fileNameFull.includes('-')
      ? fileNameFull.split('-')[0]
      : fileNameFull.split('.')[0]

    if (folder === 'backgrounds') {
      backgrounds[fileName] = src
    } else if (folder === 'characters') {
      characters[fileName] = src
    }
  })
}
