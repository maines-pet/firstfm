import React from 'react';
import { Link } from 'react-router-dom';
import { convertMiliSecToMinSec } from '../helper/helper';
import { useAlbumInfo } from '../hooks/api';
import { FaRegClock } from 'react-icons/fa'

function AlbumInfo(props) {

  const { albumInfo, isLoaded, error } = useAlbumInfo()
  return (

    <div className='mt-4 ml-4'>
      {
        isLoaded &&
        <div className='mt-3'>
          <Link to={'/artist/' + encodeURIComponent(albumInfo.artist)} className='text-xl opacity-70 hover:opacity-100 hover:underline'>{albumInfo.artist}</Link>
          <h2 className='text-3xl'>{albumInfo.name}</h2>
          {/* {
            +(albumInfo.duration) > 0 ?
            <p>{convertMiliSecToMinSec(albumInfo.duration)}</p>
            :
            <p>-m--s</p>
          } */}
          <p>{(+albumInfo.listeners).toLocaleString('en-US') + ' listeners'}</p>
          <p>{(+albumInfo.playcount).toLocaleString('en-US') + ' play count'}</p>
          {/* <p className='mt-4'>{albumInfo?.wiki?.summary}</p> */}
          {
            albumInfo?.tracks.track ?
              <div className='mt-4'>
                <h1 className='mb-3 font-semibold'>Tracklisting</h1>
                <TracksTable />
                {
                  Array.isArray(albumInfo.tracks.track)
                    ?
                    albumInfo.tracks.track.sort((a, b) => a['@attr'].rank - b['@attr'].rank)
                      .map(track => <TrackListing {...track} />)
                    :
                    <TrackListing {...albumInfo.tracks.track} />
                }
              </div>
              :
              <div className='mt-4 font-semibold'>Album info missing</div>
          }
        </div>
      }
    </div>
  );
}

function TracksTable() {
  return (
    <div className='pl-3 flex flex-row'>
      <div className='basis-5/6 flex flex-row gap-x-5'>
        <div className='relative'>
          <div className='absolute right-0'>#</div>
        </div>
        <div className=''>Title</div>
      </div>
      <div className='relative basis-1/6'>
        <FaRegClock className='absolute right-16' />
      </div>
    </div>
  )
}

function TrackListing({ name, '@attr': attr, duration, artist }) {
  return (
    <div className='group-hover:bg-slate-700 pl-3 flex flex-row group'>
      <div className='group-hover:bg-slate-700 basis-5/6 flex flex-row gap-x-5'>
        <div className='relative'>
          <div className=' group-hover:bg-slate-700 absolute right-0'>{attr.rank}</div>
        </div>
        <Link to={`/artist/${artist.name}/track/${name}`} className='group-hover:bg-slate-700 hover:underline'>{name}</Link>
      </div>
      <div className='group-hover:bg-slate-700 relative basis-1/6'>
        <div className='absolute right-16'>{convertMiliSecToMinSec(duration * 1000)}</div>
      </div>
    </div>
  )
}

export default AlbumInfo;