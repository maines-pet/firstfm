import { useParams } from "react-router"

const { default: axios } = require("axios")
const { useState, useEffect } = require("react")


const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'


export function useChartTopArtists() {
  const [artistsList, setArtistList] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoaded(false)
    axios.get(BASE_URL, {
      params: {
        method: 'chart.gettopartists',
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json',
        limit: 20
      }
    }).then(res => {
      setArtistList(res.data)
      setIsLoaded(true)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
  }, [])

  return { artistsList, isLoaded, error }

}

export function useChartTopTracks() {
  const [tracks, setTracks] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoaded(false)
    axios.get(BASE_URL, {
      params: {
        method: 'chart.gettoptracks',
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json',
        limit: 20
      }
    }).then(res => {
      setTracks(res.data.tracks)
      setIsLoaded(true)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
  }, [])


  return { tracks, isLoaded, error }
}

export function useArtistSearch() {
  const [artist, setArtist] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [showFullContent, setShowFullContent] = useState(false)


  const { name } = useParams()

  const cancelSource = axios.CancelToken.source()

  useEffect(() => {
    setIsLoaded(false)
    setShowFullContent(false)
    axios.get(BASE_URL, {
      params: {
        method: 'artist.getinfo',
        artist: name,
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json'
      }
    }).then(res => {
      setArtist(res.data.artist)
      setIsLoaded(true)
    }).catch(err => {
      console.log(err)
      setError(err)
    })

    return cancelSource.cancel('Inflight axios request cancelled')
  }, [name])


  return { artist, isLoaded, showFullContent, setShowFullContent, error }
}

export function useArtistTopAlbums() {
  const [albums, setAlbums] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const { name } = useParams()

  useEffect(() => {
    setIsLoaded(false)
    axios.get(BASE_URL, {
      params: {
        method: 'artist.gettopalbums',
        artist: name,
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json',
        limit: 5
      }
    }).then(res => {
      setAlbums(res.data.topalbums)
      setIsLoaded(true)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
  }, [name])


  return { albums, isLoaded, error }
}

export function useArtistTopTracks() {
  const [tracks, setTracks] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const { name } = useParams()

  useEffect(() => {
    console.log('in effect')
    setIsLoaded(false)
    axios.get(BASE_URL, {
      params: {
        method: 'artist.gettoptracks',
        artist: name,
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json',
        limit: 5
      }
    }).then(res => {
      setTracks(res.data.toptracks)
      setIsLoaded(true)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
  }, [name])


  return { tracks, isLoaded, error }
}


export function useTrackInfo() {
  const [trackInfo, setTrackInfo] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const {name, track} = useParams()
  const cancelSource = axios.CancelToken.source()
  useEffect(() => {
    setIsLoaded(false)
    axios.get(BASE_URL, {
      params: {
        method: 'track.getInfo',
        artist: name,
        track,
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json'
      }
    }).then(res => {
      setTrackInfo(res.data.track)
      setIsLoaded(true)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
    return cancelSource.cancel('Inflight axios request cancelled')
  }, [name])


  return { trackInfo, isLoaded, error }
}


export function useAlbumInfo() {
  const [albumInfo, setAlbumInfo] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const {name, album} = useParams()
  const cancelSource = axios.CancelToken.source()
  useEffect(() => {
    setIsLoaded(false)
    axios.get(BASE_URL, {
      params: {
        method: 'album.getInfo',
        artist: name,
        album,
        api_key: process.env.REACT_APP_LAST_FM,
        format: 'json'
      }
    }).then(res => {
      setAlbumInfo(res.data.album)
      setIsLoaded(true)
      console.log(res.data.album)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
    return cancelSource.cancel('Inflight axios request cancelled')
  }, [name])


  return { albumInfo, isLoaded, error }
}


