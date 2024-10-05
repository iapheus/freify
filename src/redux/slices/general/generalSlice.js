import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  theme: 'dark',
  searchResults: [],
};

export const fetchSearchResults = createAsyncThunk(
  "general/fetchSearchResults",
  async ({ artistName }) => {
    try {
      const response = await axios.get(
        `https://musicbrainz.org/ws/2/artist?query=${artistName}&fmt=json`
      );
      
      return response.data.artists;
    } catch (error) {
      throw error;
    }
  }
);

const getAlbumReleases = async (artistId) => {
  try {
    const releaseList = await axios.get(`https://musicbrainz.org/ws/2/release?artist=${artistId}&status=official&type=album&fmt=json`);
    
    if (!releaseList.data.releases || releaseList.data.releases.length === 0) {
      throw new Error('No releases found');
    }
    
    const requests = releaseList.data.releases.map(async (album) => {
      try {
        const eachAlbum = await axios.get(`https://coverartarchive.org/release/${album.id}`);
        if (eachAlbum.status === 200 && eachAlbum.data.images.length > 0) {
          const imageUrl = eachAlbum.data.images[0].image;
          return {
            id: album.id,
            name: album.title,
            image: imageUrl
          };
        } else {
          return {
            id: album.id,
            name: album.title,
            image: "https://static.vecteezy.com/system/resources/previews/006/060/045/non_2x/cd-icon-illustration-isolated-on-white-background-dvd-sign-free-vector.jpg"
          };
        }
      } catch (error) {
        return {
          id: album.id,
          name: album.title,
          image: "https://static.vecteezy.com/system/resources/previews/006/060/045/non_2x/cd-icon-illustration-isolated-on-white-background-dvd-sign-free-vector.jpg"
        };
      }
    });

    const results = await Promise.all(requests);
    const uniqueResults = Array.from(new Set(results.map(a => a.name)))
      .map(name => {
        return results.find(a => a.name === name);
      });
    return uniqueResults;
  } catch (error) {
    return [];
  }
};

const getArtistPhoto = async (artistName) => {
  const response = await axios.get(`https://yt.artemislena.eu/api/v1/search?q=${artistName}&type=channel&page=1&sort_by=relevance`); 
  const img = response.data.find(element => element.authorVerified)?.authorThumbnails[1]?.url ?? null;
  return img.slice(2);
}

const getArtistInfo = async (artistName) => {
  // const headers = {
  //   'User-Agent' : 'Mozilla/5.0 (Linux; Android 6.0.1; SM-D9258 Build/MDB08I) AppleWebKit/533.14 (KHTML, like Gecko) Chrome/52.0.1263.375 Mobile Safari/534.6'
  // }
  // const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${artistName}`, { headers }); 

  const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${artistName}`); 
  return response.data.extract;
}

export const fetchArtistResults = createAsyncThunk(
  'general/fetchArtistResults',
  async ({ artistId , artistName}) => {

    const [info, image, releases] = await Promise.all([
      getArtistInfo(artistName),
      getArtistPhoto(artistName),
      getAlbumReleases(artistId),
    ]);

    return { info, image, releases };
  }
)

// export const fetchSong = createAsyncThunk(
//   'general/fetchAlbum',
//   async ({ albumId }) => {

//     const [info, image, releases] = await Promise.all([
//       getArtistInfo(artistName),
//       getArtistPhoto(artistName),
//       getAlbumReleases(artistId),
//     ]);

//     return { info, image, releases };
//   }
// )

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    changeArtistName: (state, action) => {
      if(action.payload !== ''){
        state.artistName = action.payload
      }
      else{
        state.artistName = '';
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  }
});

export const { changeTheme, changeArtistName } = generalSlice.actions;

export default generalSlice.reducer;
