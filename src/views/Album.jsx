import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackToPage from '../components/BackToPage';
import BackToHome from '../components/BackToHome';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Album() {
    const { id, artistName } = useParams();
    const [musicId, setMusicId] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [albumInfo, setAlbumInfo] = useState();
    const themeValue = useSelector((state) => state.general.theme);

    function convertLength(ms) {
      var second = ms / 1000;

      var minute = Math.floor(second / 60);
      var leftSecond = Math.floor(second % 60);

      if(leftSecond <= 9){
        leftSecond = `0${leftSecond}`;
      }

      return `${minute}:${leftSecond}`;
  }

    useEffect(() => {
      async function getReleases() {
        const [albumCover, albumData] = await Promise.all([
          axios.get(`https://coverartarchive.org/release/${id}`),
          axios.get(`https://musicbrainz.org/ws/2/release/${id}?inc=recordings&fmt=json`)
        ]);

        if(albumCover.data.images[0].thumbnails[500] != null) {
          setAlbumCover(albumCover.data.images[0].thumbnails[500]);
        }else{
          setAlbumCover(albumCover.data.images[0].thumbnails['small']);
        }
        setAlbumInfo({
          title: albumData.data.title,
          date: albumData.data.date,
          media: albumData.data.media[0].tracks
        })
      }
      console.log(albumInfo);
      getReleases();
    },[id,artistName]);

    const getSong = async (searchQuery) => {
      const videoIdReq = await axios.get(`https://yt.artemislena.eu/api/v1/search?q=${searchQuery}&sort_by=relevance&type=video`); 
      setMusicId(videoIdReq.data[0].videoId);
    }

    return (
    <div>
      <div className='flex -mt-8'>
        <BackToPage/>
        <BackToHome/>
      </div>

      { albumInfo && 
        <div className='pt-2 lg:flex'>
          <img className='mx-auto lg:ml-14 h-52 rounded-full' src={albumCover} />
          <div className='text-center lg:mt-20 lg:ml-5 lg:text-start lg:flex-1'>
            <p className='text-xl mt-2'>{albumInfo.title}</p>
            <p className='text-xl lg:mt-2'>Publish Date: {albumInfo.date}</p>
          </div>
        </div>
      }

      <div className='mt-10 mx-5 space-x-5 space-y-3'>
        {
          albumInfo && albumInfo.media.map((element) => (
            <div className={`hover:transition-colors hover:duration-200 hover:border-cyan-300 ${themeValue == 'dark' ? 'bg-[#1a1a1e]' : 'bg-[#e3e3e3]'} inline-block p-3 rounded-3xl border-2 border-cyan-800 cursor-pointer`}
            onClick={() => {setMusicId(''); getSong(`${element.title} ${artistName}`);}} >
              <p className='text-xl' >{element.title}</p>
              <p className='text-xl' >{`Duration: ${convertLength(element.length)}`}</p>
            </div>
          ))
        }
      </div>

      {
        musicId !== '' && 
        <audio className='w-full bottom-0 absolute bg-cyan-800 rounded-2xl' autoPlay='true' controls='true' src={`https://eu-proxy.poketube.fun/latest_version?id=${musicId}&itag=18&local=true`}></audio>
      }
    </div>
  )
}

export default Album