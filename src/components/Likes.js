export function Likes(props) {

  const likedArtists = getDataFromLocalStorage('likedArtists')
  const likedAlbums = getDataFromLocalStorage('likedAlbums')
  const likedTracks = getDataFromLocalStorage('likedTracks')
  const hideList = [likedArtists, likedAlbums, likedTracks].every(list => list.length === 0)
  return (
    <div>
      <h1 className='pt-6 pl-6'>Favourites</h1>
      {hideList &&
        <div>You haven't liked any artist, albums or tracks yet</div>}
      {
        !hideList && likedArtists.length > 0 &&
        renderList('Artists', likedArtists)
      }

      {
        !hideList && likedAlbums.length > 0 &&
        renderList('Albums', likedAlbums)
      }

      {
        !hideList && likedTracks.length > 0 &&
        renderList('Tracks', likedTracks)
      }
    </div>
  );
}

function getDataFromLocalStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
}

function renderList(heading, items) {
  return (
    <div className='p-6'>
      <p className='underline'>{heading}</p>
      <ul>
        {items.map(e => <li>{e}</li>)}
      </ul>
    </div>
  )
}
