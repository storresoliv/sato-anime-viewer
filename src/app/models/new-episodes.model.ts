export interface ILink {
  url: string
  domain: string
}

export interface INewEpisode {
  id: string
  title: string
  name: string
  episodeNumber: string
  thumb_url: string
  links: ILink[]
  createdAt?: string
  updatedAt?: string
}

export interface INewEpisodes {
  data: INewEpisode[]
  page: number
  last_page: number
  total: number
}
