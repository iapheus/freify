import { Box, Card, Text } from '@radix-ui/themes'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { changeArtistName } from '../redux/slices/general/generalSlice';

function ArtistShortInfo({ artist }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box maxWidth={1/3} className='px-1 lg:basis[%10]' >
            <Card asChild onClick={() => {dispatch(changeArtistName(artist.name)); navigate(`/artist/${artist.id}/${artist.name}`);}}>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  {artist.name}
                </Text>
                <div className='flex items-center'>
                  <Text as="div" color="gray" size="2">
                  {artist.gender != null ? artist.gender : 'undefined'} /
                  </Text>
                  {artist.country != null ? <img className='pl-1.5' src={`https://flagcdn.com/16x12/${artist.country?.toLowerCase()}.png`} alt='Flag' /> : <Text as='div' color='gray' size="2">undefined</Text>}
                </div>
              </a>
            </Card>
    </Box>
  )
}

export default ArtistShortInfo