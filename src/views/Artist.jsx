import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtistResults } from '../redux/slices/general/generalSlice';
import BackToPage from '../components/BackToPage';
import Loading from '../components/Loading';


function Artist() {
  const navigate = useNavigate();
  const { id, artistName } = useParams();
  const dispatch = useDispatch();
  
  const [info, setInfo] = useState('');
  const [img, setImg] = useState('');
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  const themeValue = useSelector((state) => state.general.theme);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dispatch(fetchArtistResults({ artistId: id, artistName }));
        const { info, image, releases } = response.payload;
        setInfo(info);
        setImg(image);
        setReleases(releases);
        setLoading(false);
        console.log(themeValue);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    }

    fetchData();
  }, [dispatch, id, artistName]);

  return (
    <div>
      <div className='-mt-8'>
        <BackToPage/>
      </div>
      <div className='pt-2 lg:flex lg:pt-10'>
        <img className='mx-auto lg:ml-4 h-52 rounded-full' src={'https://' + img} />
        <p className='pt-2 mx-5 md:text-center lg:my-14 text-lg'>{info}</p>
      </div>
      <div className='flex flex-wrap lg:space-x-5 mt-2 justify-center'>
        {loading && <Loading/>}
        {releases && releases.map((release, index) => (
          <div key={index} 
          className={`cursor-pointer hover:scale-110 transition-transform duration-100 ${themeValue == 'dark' ? 'hover:bg-[#111113]' : 'hover:bg-[#FFFFFF]'}`}>
              <img onClick={() => navigate(`/album/${release.id}/${artistName}`)} className='h-64' src={release.image}></img>
              <h1>{release.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artist;
