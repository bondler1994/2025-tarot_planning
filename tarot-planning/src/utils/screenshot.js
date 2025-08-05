import { snapdom } from '@zumer/snapdom'

export async function screenshotAndDownload(className, fileName) {
  try {
    const el = document.querySelector(className)
    const result = await snapdom(el, {
      useProxy: 'https://wsrv.nl/?url=',
    })

    const img = await result.toPng()
    document.body.appendChild(img)
    await result.download({ format: 'jpg', filename: fileName })
  } catch (e) {
    throw new Error(e)
  }
}
