const images = import.meta.glob('/src/assets/**/*.png', { eager: true })

export const backgrounds: Record<string, string> = {}
export const characters: Record<string, string> = {}

export const preloadImages = () => {
  Object.values(images).forEach(module => {
    const img = new Image()
    const src = (module as { default: string }).default
    img.src = src

    console.log(src)
    const [, folder, fileName] = src.match(/([^/]+)\/([^/-]+)(?:-[^/]+)?\.png$/) ?? []

    if (folder === 'backgrounds') {
      backgrounds[fileName] = src
    } else if (folder === 'characters') {
      characters[fileName] = src
    }
  })
}

console.log(backgrounds)
console.log(characters)
