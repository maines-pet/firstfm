import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { convertMiliSecToMinSec } from '../helper/helper';
import { useTrackInfo } from '../hooks/api';

function TrackInfo(props) {

  const { trackInfo, isLoaded, error } = useTrackInfo()

  const location = useLocation()
  let imgSrc = location.state?.image || `https://picsum.photos/seed/${trackInfo.name}/200`
  return (

    <div className='mt-4 ml-4'>
      {
        isLoaded &&
        <div className='mt-3'>
          <img src={imgSrc} alt="" />
          <Link to={'/artist/' + encodeURIComponent(trackInfo.artist.name)} className='text-xl opacity-70 hover:opacity-100 hover:underline'>{trackInfo.artist.name}</Link>
          <h2 className='text-3xl'>{trackInfo.name}</h2>
          {
            +(trackInfo.duration) > 0 ?
            <p>{convertMiliSecToMinSec(trackInfo.duration)}</p>
            :
            <p>00:00</p>
          }
          <p>{(+trackInfo.listeners).toLocaleString('en-US') + ' listeners'}</p>
          <p>{(+trackInfo.playcount).toLocaleString('en-US') + ' play count'}</p>
          <p className='mt-4'>{trackInfo?.wiki?.summary}</p>
          {
            trackInfo.album ?
              <div className='mt-4'>
                <h1 className='mb-3 font-semibold'>Appears On</h1>
                {/* <div className='flex flex-col content-center justify-center absolute border rounded-md w-24 aspect-square text-center'> */}
                <div className='w-1/3 grid grid-flow-col justify-start'>
                  <img src={trackInfo.album.image.find(img => img.size ==='medium')['#text']} alt={trackInfo.album.title} />
                  <Link to={`/artist/${trackInfo.artist.name}/album/${trackInfo.album.title}`} className='p-4 text-sm'>{trackInfo.album.title}</Link>
                </div>
              </div>
              :
              <div className='mt-4 font-semibold'>Album info missing</div>
          }
        </div>
      }
    </div>
  );
}


export default TrackInfo;