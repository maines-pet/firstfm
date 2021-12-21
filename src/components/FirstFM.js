import { useState, useEffect } from 'react'
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom'
import AlbumInfo from './AlbumInfo';
import ArtistInfo from './ArtistInfo';
import { Home } from './Home'
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { TopArtists } from './TopArtists'
import { TopTracks } from './TopTracks';
import TrackInfo from './TrackInfo';

function FirstFM(props) {
  return (
    <Router>
      <div className='text-gray-300 font-mono'>
        <div className='grid grid-cols-5 container mx-auto bg-slate-600 h-screen overflow-auto'>
          <nav className='bg-slate-900  '>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/search'>Search</Link></li>
              <li><Link to='/top-artists'>Top Artists</Link></li>
              <li><Link to='/top-charts'>Top Tracks</Link></li>
              <li>Playlist</li>
            </ul>
          </nav>

          <div className='col-span-4 pb-2'>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchForm />} >
                <Route path=':searchString' element={<SearchResults />} />
              </Route>
              <Route path='/top-artists' element={<TopArtists />} />
              <Route path='/top-charts' element={<TopTracks />} />
              <Route path='/artist/:name' element={<ArtistInfo />} />
              <Route path='/artist/:name/album/:album' element={<AlbumInfo />} />
              <Route path='/artist/:name/track/:track' element={<TrackInfo />} />
            </Routes>

          </div>
        </div>
      </div>
    </Router>
  );
}

export default FirstFM;