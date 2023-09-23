export interface ILink {
  url: string
  domain: string
}

export interface INewEpisodies {
  id: string
  title: string
  name: string
  episodeNumber: string
  thumb_url: string
  links: ILink[]
}
