import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'

function getSearchResult(query, method) {
  let params = {
    method,
    api_key: process.env.REACT_APP_LAST_FM,
    format: 'json',
    limit: 6
  }

  params = {...params, ...query}
  return axios.get(BASE_URL, {
    params: {
      ...params
    }
  })
}

export function useSearch(query) {
  const [ artists, setArtists ] = useState({})
  const [isArtistLoaded, setIsArtistLoaded] = useState(false)
  const [ tracks, setTracks ] = useState({})
  const [isTrackLoaded, setIsTrackLoaded] = useState(false)
  const [ albums, setAlbums ] = useState({})
  const [isAlbumLoaded, setIsAlbumLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (query.trim() === '') return
    setIsArtistLoaded(false)
    setIsTrackLoaded(false)
    setIsAlbumLoaded(false)
    const timeOut = setTimeout(() => {
      getSearchResult({artist: query}, 'artist.search')
      .then(res => {
        setIsArtistLoaded(true)
        setArtists(res.data.results)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
      
      getSearchResult({track: query}, 'track.search')
      .then(res => {
        setIsTrackLoaded(true)
        setTracks(res.data.results)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })

      getSearchResult({album: query}, 'album.search')
      .then(res => {
        setIsAlbumLoaded(true)
        setAlbums(res.data.results)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
    }, 750)
    

    return (() => clearTimeout(timeOut))

  }, [query])

  return {artists, tracks, albums, isArtistLoaded, isTrackLoaded, isAlbumLoaded, error}
}
