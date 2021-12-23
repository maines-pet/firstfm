import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

function SearchForm(props) {

  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  function handleChange(event) {
    setQuery(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate(`/search/${query}`)
  }

  return (
    <div className='mt-3 ml-3'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} className='bg-slate-700 border rounded-md w-1/4 pl-2 text-white font-sans' placeholder='Search' />
      </form>

      {query &&  <div>Searching for <span className='text-white font-semibold'>{query}</span></div>}
      <Outlet context={[query, setQuery]}/>
    </div>
  );
}

export default SearchForm;