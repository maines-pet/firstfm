import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom'
import AlbumInfo from './AlbumInfo';
import ArtistInfo from './ArtistInfo';
import { Home } from './Home'
import { Likes } from './Likes';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { TopArtists } from './TopArtists'
import { TopTracks } from './TopTracks';
import TrackInfo from './TrackInfo';

export function FirstFM(props) {
  return (
    <Router>
      <div className='text-gray-300 font-mono'>
        <div className='grid grid-cols-5 container mx-auto bg-slate-600 h-screen overflow-auto'>
          <nav className='bg-slate-900 pt-10 p-4 '>
            <ul>
              <li className='p-4'><Link to='/'>Home</Link></li>
              <li className='p-4'><Link to='/search'>Search</Link></li>
              <li className='p-4'><Link to='/top-artists'>Top Artists</Link></li>
              <li className='p-4'><Link to='/top-tracks'>Top Tracks</Link></li>
              <li className='p-4'><Link to='/likes'>Likes</Link></li>
            </ul>
          </nav>

          <div className='col-span-4 pb-2'>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchForm />} >
                <Route path=':searchString' element={<SearchResults />} />
              </Route>
              <Route path='/top-artists' element={<TopArtists />} />
              <Route path='/top-tracks' element={<TopTracks />} />
              <Route path='/likes' element={<Likes />} />
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

