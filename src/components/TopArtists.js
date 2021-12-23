import { Link } from "react-router-dom";
import { useChartTopArtists } from "../hooks/api";
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const localKey = 'likedArtists';

export function TopArtists(props) {
  let initialState
  if (localStorage.getItem(localKey)) {
    initialState = JSON.parse(localStorage.getItem(localKey))
  } else {
    initialState = []
  }
  const { artistsList, isLoaded, error } = useChartTopArtists()
  const [likedArtists, setLikedArtists] = useState(initialState)

  function handleLike(artist) {
    const temp = [...likedArtists]
    const index = temp.indexOf(artist)
    if (index === -1) {
      temp.push(artist)
    } else {
      temp.splice(index, 1)
    }
    setLikedArtists(temp)
  }

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(likedArtists))
  }, [likedArtists])

  return (
    <div className='pl-8'>
      <div className='text-4xl text-center pb-3'>Top Artists</div>
      <ul className='grid grid-cols-2  divide-gray-500'>
        {isLoaded &&
          artistsList?.artists?.artist.map((row, index) => {
            return <ArtistRow liked={likedArtists.indexOf(row.name) >= 0} onLikeToggle={handleLike} key={row.name} data={row} ranking={index} />
          })
        }
      </ul>
    </div>
  );
}

function ArtistRow(props) {

  const { name, playcount, listeners, url } = props.data

  function handleLike(event) {
    event.stopPropagation()
    props.onLikeToggle(name)
  }

  return (
    <li className={'pb-3 group hover:bg-gray-700'} >
      <div className='flex flex-row gap-x-2'>
        <div className='w-24 text-right my-auto relative'>
          <div onClick={handleLike} className='group-hover:visible invisible absolute right-0' >
            {
              props.liked ?
                <BsHeartFill className='top-1/2 transform -translate-y-1/2' size={40} />
                :
                <BsHeart className='top-1/2 transform -translate-y-1/2' size={40} />
            }
          </div>
          <p className='top-1/2 transform -translate-y-1/2 text-6xl group-hover:invisible absolute right-0'>{props.ranking + 1}</p>
        </div>

        <Link to={'/artist/' + encodeURIComponent(name)}>
          <div>
            <p className='text-3xl'>{name}</p>
            <p>Play count: {(+playcount).toLocaleString('en-US')}</p>
            <p>Listeners: {(+listeners).toLocaleString('en-US')}</p>
          </div>
        </Link>
        <hr />
      </div>
    </li>
  )
}