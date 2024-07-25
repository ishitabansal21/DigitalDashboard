import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const SPOTIFY_CLIENT_ID = '752125d09418458196562c4cc60a6593';
const REDIRECT_URI = 'http://localhost:5173';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';

function SpotifyPlayer() {
  const [token, setToken] = useState('');
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    spotifyApi.setAccessToken(token);

    if (token) {
      loadSpotifySDK(token);
    }
  }, []);

  const loadSpotifySDK = (token) => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        transferPlayback(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (state) {
          setCurrentTrack(state.track_window.current_track);
          setIsPlaying(!state.paused);
        }
      });

      player.connect();
    };
  };

  const transferPlayback = (deviceId) => {
    spotifyApi.transferMyPlayback([deviceId], { play: true });
  };

  const handlePlayPause = () => {
    player.togglePlay();
  };

  const handlePrevTrack = () => {
    player.previousTrack();
  };

  const handleNextTrack = () => {
    player.nextTrack();
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <a href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Login to Spotify
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Spotify Player</h1>
        {currentTrack ? (
          <div className="text-center">
            <img src={currentTrack.album.images[0].url} alt="Album cover" className="w-64 h-64 mx-auto mb-4 rounded-lg shadow-md" />
            <h2 className="text-xl font-semibold">{currentTrack.name}</h2>
            <p className="text-gray-600">{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handlePrevTrack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                Previous
              </button>
              <button onClick={handlePlayPause} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleNextTrack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">No track currently playing</p>
        )}
        <button onClick={logout} className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded block mx-auto">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SpotifyPlayer;