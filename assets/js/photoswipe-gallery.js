import PhotoSwipeLightbox from 'photoswipe/lightbox'

const shuffle = (items) => {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
  }

  return result
}

document.querySelectorAll('[data-random-gallery]').forEach((gallery) => {
  const source = document.querySelector(
    `[data-gallery-source="${gallery.id}"]`
  )
  const picksPerAlbum = Number(gallery.dataset.picksPerAlbum) || 3

  if (!(source instanceof HTMLTemplateElement)) return

  const imagesByAlbum = new Map()

  source.content.querySelectorAll('[data-album]').forEach((item) => {
    const album = item.dataset.album
    const albumImages = imagesByAlbum.get(album) || []
    albumImages.push(item)
    imagesByAlbum.set(album, albumImages)
  })

  const selection = shuffle(
    [...imagesByAlbum.values()].flatMap((images) =>
      shuffle(images).slice(0, picksPerAlbum)
    )
  )

  gallery.replaceChildren(...selection)

  const firstImage = gallery.querySelector('img')
  if (firstImage) {
    firstImage.loading = 'eager'
    firstImage.fetchPriority = 'high'
  }
})

document.querySelectorAll('[data-pswp-gallery]').forEach((gallery) => {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: 'a',
    bgOpacity: 0.92,
    showHideAnimationType: 'fade',
    pswpModule: () => import('photoswipe'),
  })

  lightbox.init()
})
