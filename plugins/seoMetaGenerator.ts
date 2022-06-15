import type { MetaInfo } from 'vue-meta'
import { MediaType } from '~/components/rmrk/types'
import { resolveMedia } from '~/utils/gallery/media'

declare module 'vue/types/vue' {
  // this.$seoMeta inside Vue components
  interface Vue {
    $seoMeta(meta: MetaProperties)
  }
}

type MetaProperties = {
  type?: string
  url?: string
  title?: string
  description?: string
  image?: string
  author?: string
  video?: string
  mime?: string
}

export default function ({ app }, inject): void {
  const getMetaType = (mediaType: MediaType | string | undefined): string => {
    switch (mediaType) {
      case MediaType.VIDEO:
      case MediaType.AUDIO:
      case MediaType.IMAGE:
      case MediaType.JSON:
      case MediaType.OBJECT:
      default:
        return 'website'
    }
  }

  const seoMeta = (meta: MetaProperties): MetaInfo['meta'] => {
    const baseUrl: string = app.$config.baseUrl
    const title = 'KodaDot - Kusama NFT Market Explorer'
    let description = 'Creating Carbonless NFTs on Kusama'
    description = meta?.description?.slice?.(0, 170) || description
    const image = `${baseUrl}/kodadot_card_root.png`
    const type = resolveMedia(meta?.mime)

    const seoTags = [
      {
        hid: 'title',
        name: 'title',
        content: meta?.title ? `${meta.title} | ${title}` : title,
      },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: getMetaType(type),
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${baseUrl}${meta?.url || ''}`,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: meta?.title ? `${meta.title} | ${title}` : title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: meta?.image || image,
      },
      type === MediaType.IMAGE && {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: meta?.mime,
      },
      type === MediaType.VIDEO && {
        hid: 'og:video',
        property: 'og:video',
        content: `${meta?.video}?mime=${meta?.mime}`,
      },
      type === MediaType.VIDEO && {
        hid: 'og:video:type',
        property: 'og:video:type',
        content: meta?.mime,
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: `${baseUrl}${meta?.url || ''}`,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: meta?.title || title,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: meta?.image || image,
      },
      // here you should add a link to a route where the video is embedded
      // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card
      // {
      //   hid: 'twitter:player',
      //   name: 'twitter:player',
      //   content: meta?.video,
      // },
    ]

    // only return non null, not undefined, not empty string
    return seoTags.filter((tag) => tag && tag.content !== '')
  }
  inject('seoMeta', seoMeta)
}
