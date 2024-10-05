import { TextField } from '@radix-ui/themes';
import RotatingLogo from './components/RotatingLogo';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';
import ArtistShortInfo from './components/ArtistShortInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from './redux/slices/general/generalSlice';

function Index() {

  const dispatch = useDispatch();
  let searchResults = useSelector(state => state.general.searchResults);

  const handleClick = (e) => {
    setTimeout(() => {
      const query = e.target.value;
      if (query.length > 3) {
        dispatch(fetchSearchResults({ artistName: query }));
      }
    }, 1500);

  };

  return (
    <div className='w-full text-center py-auto'>
      <RotatingLogo />
      <div className='mt-7'>
        <TextField.Root
          onChange={(e) => handleClick(e)}
          size={'3'}
          className='mx-8 lg:w-96 lg:mx-auto'
          placeholder="Search your favorite artist..."
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>
      <div className='h-64 mx-auto mt-5 flex flex-wrap justify-center'>
        {searchResults && searchResults.map((result) => (
          <ArtistShortInfo key={result.id} artist={result} />
        ))}
      </div>
    </div>
  );
}

export default Index;
