const images = import.meta.glob('/src/assets/**/*.png', { eager: true })

export const backgrounds: Record<string, string> = {}
export const characters: Record<string, string> = {}

export const preloadImages = async (): Promise<void> => {
  const promises = Object.values(images).map(module => {
    return new Promise<void>(resolve => {
      const img = new Image()
      const src = (module as { default: string }).default
      img.src = src
      img.onload = () => resolve()
      img.onerror = () => resolve() // Prevent blocking due to errors

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
  })

  await Promise.all(promises)
}
