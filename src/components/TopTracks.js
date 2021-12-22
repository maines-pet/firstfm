import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useChartTopTracks, useTopArtistsSearch } from "../hooks/api";

const localKey = 'likedTracks'
export function TopTracks(props) {
  let initialState
  if (localStorage.getItem(localKey)) {
    initialState = JSON.parse(localStorage.getItem(localKey))
  } else {
    initialState = []
  }

  const { tracks, isLoaded, error } = useChartTopTracks()
  const [likedTracks, setLikedTracks] = useState(initialState)

  function handleLike(track) {
    const temp = [...likedTracks]
    const index = temp.indexOf(track)
    if (index === -1) {
      temp.push(track)
    } else {
      temp.splice(index, 1)
    }
    setLikedTracks(temp)
  }

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(likedTracks))
  }, [likedTracks])

  return (
    <div className='pl-8'>
      <p className='text-4xl text-center pb-3'>Top Charts</p>
      <ul className='xl:grid xl:grid-cols-2 divide-gray-500'>
        {isLoaded &&
          tracks.track.map((row, index) => {
            return <TracksRow liked={likedTracks.indexOf(row.name) >= 0} onLikeToggle={handleLike} key={row.url} data={row} ranking={index} />
          })
        }
      </ul>
    </div>
  );
}


function TracksRow(props) {

  const { name, playcount, listeners, artist, url } = props.data

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
        <div>
          <Link to={'/artist/' + encodeURIComponent(artist.name) + '/track/' + encodeURIComponent(name)}>
            <div className='w-[450px]'>
              <div className='hover:underline text-3xl truncate p-0.5'>{name}</div>
            </div>
          </Link>
          <Link to={'/artist/' + encodeURIComponent(artist.name)}>
            <p className='text-xl'>by <span className='hover:underline'>{artist.name}</span></p>
          </Link>
          <p>Play count: {(+playcount).toLocaleString('en-US')}</p>
          <p>Listeners: {(+listeners).toLocaleString('en-US')}</p>
        </div>
        <hr />
      </div>
    </li>
  )
}