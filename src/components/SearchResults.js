import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearch, useSearchForTrack } from '../api/search';

function SearchResults(props) {

    const { query } = useParams()
    const [searchText, setSearchText] = useState(query || '')

    const { artists, tracks, albums, isArtistLoaded, isTrackLoaded, isAlbumLoaded, error } = useSearch(searchText)

    const navigate = useNavigate()

    return (
        <>
            {
                (isArtistLoaded || isTrackLoaded || isAlbumLoaded)
                    ?
                    <>
                        <Cards heading='Artists'>
                            {isArtistLoaded &&
                                artists.artistmatches?.artist.map(artistElem => { //requires safe navigation from trackmatches to track (???) not sure why

                                    return (
                                        <div onClick={() => navigate(`/artist/${artistElem.name}`)} key={artistElem.url} className='box-border p-2 w-48 h-64 bg-black text-white border-0 rounded-md cursor-pointer'>
                                            <div className='w-44 h-44 border-0 rounded-full overflow-hidden'>
                                                <img src="https://i.scdn.co/image/8128a8fc52288607eb2e4667a4c172432b3e03e1" className='h-full object-cover object-center' alt="" />
                                            </div>
                                            <div className='text-center mt-5'>
                                                <div title={artistElem.name} className='font-bold truncate'>{artistElem.name}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Cards>
                        <Cards heading='Tracks'>
                            {isTrackLoaded &&
                                tracks.trackmatches?.track.map(trackElem => { //requires safe navigation from trackmatches to track (???) not sure why

                                    return (
                                        <div onClick={() => navigate(`/artist/${trackElem.artist}/track/${trackElem.name}`)} key={trackElem.url} className='box-border p-2 w-48 h-64 bg-black text-white border-0 rounded-md cursor-pointer'>
                                            <div className='w-44 h-44 border-0 rounded-full overflow-hidden'>
                                                <img src="https://i.scdn.co/image/8128a8fc52288607eb2e4667a4c172432b3e03e1" className='h-full object-cover object-center' alt="" />
                                            </div>
                                            <div className='text-center mt-5'>
                                                <div title={trackElem.name} className='font-bold truncate'>{trackElem.name}</div>
                                                <div className=' truncate'>by {trackElem.artist}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Cards>
                        <Cards heading='Albums'>
                            {isAlbumLoaded &&
                                albums.albummatches?.album.map(albumElem => { //requires safe navigation from trackmatches to track (???) not sure why

                                    return (
                                        <div onClick={() => navigate(`/artist/${albumElem.artist}/album/${albumElem.name}`)} key={albumElem.url} className='box-border p-2 w-48 h-64 bg-black text-white border-0 rounded-md cursor-pointer'>
                                            <div className='w-44 h-44 border-0 rounded-full overflow-hidden'>
                                                <img src={albumElem.image.find((albumImage => albumImage.size === 'large')
                                                )['#text']} 
                                                className='h-full object-cover object-center' alt="" />
                                            </div>
                                            <div className='text-center mt-5'>
                                                <div title={albumElem.name} className='font-bold truncate'>{albumElem.name}</div>
                                                <div className=' truncate'>{albumElem.artist}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Cards>
                    </>
                    :
                    false
            }

        </ >
    );
}

function Cards({ heading, children }) {
    return (
        <div>
            <div className='grid grid-flow-col place-content-between'>
                <div>{heading}</div>
                <div className='mr-5'>See all</div>
            </div>
            <div className='grid grid-flow-col justify-start gap-x-2 mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default SearchResults;