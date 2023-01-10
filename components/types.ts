export type preview = {
    id: string
    title: string
    seasons: number
    image: string
    genres: string[]
    updated: string
}

export type show = {
    id: string
    title: string
    seasons: seasons[]
    image: string
    genres: string[]
    updated: string
}

export type seasons = {
    season: number
    title: string
    image: string
    episodes: episode[]
}

export type episode = {
    episode: number
    description: string
    title: string
    file: string
}




export type phase = 'loading' | 'list' | 'single' | 'seasons' | 'error'
export type sorting = 'a-z' | 'z-a' | 'oldest-latest' | 'latest-oldest'




export type state = {
    phase: phase
    previews: preview[]
    single: null | show
    seasons: seasons[]
    sorting: sorting
    search: string
}

export type subscription = (state: state) => void