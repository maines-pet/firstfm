import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { useArtistSearch, useArtistTopAlbums, useArtistTopTracks } from '../hooks/api';

function ArtistInfo(props) {

  const { artist, isLoaded: artistLoaded, showFullContent, setShowFullContent, error: artistError } = useArtistSearch()
  const { albums, isLoaded: albumsLoaded, error: albumsError } = useArtistTopAlbums()
  const { tracks, isLoaded: tracksLoaded, error: tracksError } = useArtistTopTracks()

  const [imgUrl, setImgUrl] = useState('')
  const { name } = useParams()

  const location = useLocation()

  useEffect(() => {
    if (location?.state?.imageUrl) {
      setImgUrl(location.state.imageUrl)
    } else {
      setImgUrl('')
      axios.get('https://randomuser.me/api/?inc=picture')
        .then(res => setImgUrl(res.data.results[0].picture.large))
        .catch(err => console.log(err))
    }
  }, [name])

  const handleClick = () => {
    setShowFullContent(!showFullContent)
  }

  return (
    <>
      {
        artistLoaded &&
        <div className='mt-20 ml-8 max-w-4xl'>
          <img src={imgUrl} alt="" />
          <h1 className='text-3xl'>{artist.name}</h1>

          <div className='tags '>
            <br />
            <div className='text-xs mb-2'>Tags:</div>
            {artist.tags.tag.map(({ name, url }) => <Tag key={url} label={name} />)}
            <br />
            <br />
          </div>

          <div className='cursor-pointer' onClick={handleClick}>

            {(!showFullContent && artist.bio.content.length > 400) ?
              <>
                <p className='text-sm'>{artist.bio.content.substring(0, 400) + '...'}</p>
                <div className='mx-auto text-center text-xs'>show more</div>
              </>
              :
              <p className='text-sm'>{artist.bio.content.split('\n').map((item) => {
                return <span>{item}<br /></span>
              })}</p>
            }
          </div>
          <br />
          <br />
          <br />

          <div className='grid grid-cols-2 mb-3'>
            <div>
              {albumsLoaded && <TopAlbums albums={albums} />}
            </div>
            <div>
              {tracksLoaded && <TopTracks tracks={tracks} />}
            </div>
          </div>

          <div>
            <p className='text-md'>{`If you like ${artist.name}, you might also like:`}</p>
            <div className='mt-5 grid grid-flow-col-dense justify-start'>
              {artist.similar.artist.map(({ name }) => <SimilarArtist name={name} />)}
            </div>
          </div>
        </div>
      }
    </>

  );
}

function Tag({ label }) {
  return (
    <span className='text-xs mr-1 font-bold rounded-3xl border-yellow-800 border bg-orange-800 py-2 px-8'>{label}</span>
  )
}


function SimilarArtist({ name }) {
  return (
    <div>
      <Link to={'/artist/' + name} className='transition duration-500 border hover:text-slate-700 hover:bg-gray-100 rounded-2xl p-2 mr-2 mb-2 box-content'>
        {name}
      </Link>
    </div>
  )
}

function TopAlbums({ albums }) {
  return (
    <div className=''>
      <h1 className='text-lg'>Top Albums</h1>
      <ul>
        {
          albums.album.map(({ name, playcount, url, image }) => {
            return (
              <Link to={`/artist/${encodeURIComponent(albums['@attr'].artist)}/album/${encodeURIComponent(name)}`} key={url}>
                <div>
                  <img src={image.find((img) => img.size === 'medium')["#text"]} alt={name} />
                  <div>{name}</div>
                  <div className='text-xs'>{playcount.toLocaleString('en-US')}</div>
                </div>
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}


function TopTracks({ tracks }) {
  return (
    <div className=''>
      <h1 className='text-lg'>Top Tracks</h1>
      <ul>
        {
          tracks.track.map(({ name, playcount, url }) => {
            return (
              <Link to={`/artist/${encodeURIComponent(tracks['@attr'].artist)}/track/${encodeURIComponent(name)}`} key={url}>
                <div>{name}</div>
                <div className='text-xs'>{(+playcount).toLocaleString('en-US')}</div>
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}



export default ArtistInfo;