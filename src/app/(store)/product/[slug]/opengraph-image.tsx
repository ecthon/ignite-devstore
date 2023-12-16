import { api } from '@/data/api'
import { IProduct } from '@/data/types/product'
import { env } from '@/env'
import { zinc } from 'tailwindcss/colors'
import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'

async function getProduct(slug: string): Promise<IProduct> {
    const response = await api(`/products/${slug}`, {
      next: {
        revalidate: 60 * 60, // 1 hour - a cada uma hora eu faço uma requisição para o meu back-end
      },
    })
    const product = await response.json()
    return product
}
 
// Image generation
export default async function OgImage({ params }: {params: { slug: string } }) {
  const product = await getProduct(params.slug)
  const productImageURL = new URL(product.image, env.APP_URL).toString()
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt='' style={{ width: '100%' }} />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}