import {
  Battery50Icon,
  ChartBarIcon,
  HeartIcon,
  WifiIcon,
} from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Menu } from './Menu';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Favorites } from './Favorites';
import defaultSound from './sounds/506054__mellau__button-click-1.wav';

type Favorites = {
  song: string;
  artist: string;
  poster: string;
  audio: string;
  genre: string;
};

type Results = {
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
  primaryGenreName: string;
};

type Playlist = {
  song: string;
  artist: string;
  poster: string;
  audio: string;
  genre: string;
};
interface Prop {
  checkInput: boolean;
  fadeIntro: boolean;
  hideIntro: boolean;
  song: string;
  artist: string;
  poster: string;
  nowPlaying: boolean;
  length: number;
  skip: number;
  genre: string;
  searching: boolean;
  fadeSearching: boolean;
  fadeResult: boolean;
  menu: boolean;
  nav: number;
  des: boolean;
  list: boolean;
  fav: boolean;
  audio: string;
  skipFav: number;
  setFavAudio: (favAudio: string) => void;
  skipList: number;
  setListAudio: (listAudio: string) => void;
  setListLength: (listLength: number) => void;
  setFavLength: (favLength: number) => void;
  listLength: number;
  hideResult: boolean;
  results: Results[];
}
export function Screen({
  checkInput,
  fadeIntro,
  hideIntro,
  song,
  artist,
  poster,
  nowPlaying,
  length,
  skip,
  genre,
  searching,
  fadeSearching,
  fadeResult,
  menu,
  nav,
  des,
  fav,
  list,
  audio,
  skipFav,
  setFavAudio,
  skipList,
  setListAudio,
  setListLength,
  setFavLength,
  listLength,
  hideResult,
  results,
}: Prop) {
  const [time, setTime] = useState<string>();
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [favMsg, setFavMsg] = useState<boolean>(false);
  const [listMsg, setListMsg] = useState<boolean>(false);
  const defaultRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format('h:mma'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function addToFavorites() {
    setFavorites((prev) => [...prev, { song, artist, poster, audio, genre }]);
    setFavAudio(audio);
    setFavLength(favorites.length);
    setFavMsg(true);
    setTimeout(() => {
      setFavMsg(false);
    }, 1500);
    if (defaultRef.current) {
      defaultRef.current.currentTime = 0;
      defaultRef.current.play();
    }
  }

  function addToPlaylist() {
    setPlaylist((prev) => [...prev, { song, artist, poster, audio, genre }]);
    setListAudio(audio);
    setListLength(playlist.length);
    setListMsg(true);
    setTimeout(() => {
      setListMsg(false);
    }, 1500);
    if (defaultRef.current) {
      defaultRef.current.currentTime = 0;
      defaultRef.current.play();
    }
  }
  return (
    <div className="font-mono font-bold flex flex-col justify-center items-center w-full h-[230px]">
      <audio ref={defaultRef} src={defaultSound} preload="auto" />

      <div
        className={`flex flex-col w-full  justify-center items-center transition duration-700`}
      >
        <div className="border-[2px] rounded-[10px] w-[290px] h-[200px] border-orange-400 flex flex-col items-center justify-center relative mt-[20px] z-20 overflow-hidden ">
          <div>
            <p className="ml-[5px] font-mono font-bold text-orange-400 absolute top-[0px] left-[0px]">
              {time}
            </p>
            <ChartBarIcon className="mr-[5px] w-[15px] h-[15px] absolute top-[0px] right-[40px] text-orange-400" />
            <WifiIcon className="mr-[5px] w-[15px] h-[15px] absolute top-[0px] right-[20px] text-orange-400" />
            <Battery50Icon className="mr-[5px] w-[15px] h-[15px] absolute top-[0px] right-[0px] text-orange-400" />
          </div>
          {menu ? (
            <Menu
              list={list}
              fav={fav}
              des={des}
              nav={nav}
              audio={audio}
              favorites={favorites}
              playlist={playlist}
              nowPlaying={nowPlaying}
              genre={genre}
              skipFav={skipFav}
              skipList={skipList}
              length={length}
              song={song}
              poster={poster}
              artist={artist}
              setFavAudio={setFavAudio}
              setListAudio={setListAudio}
              listLength={listLength}
            />
          ) : (
            <div className="flex h-[120px] relative items-center ">
              <p
                className={`text-orange-400 transition duration-700 ${fadeSearching ? 'opacity-0' : 'opacity-100'}  ${searching ? 'block' : 'hidden'} pulse`}
              >
                searching...
              </p>

              {checkInput ? (
                <p
                  className={`text-[15px] text-center text-orange-400 transition duration-700 ${fadeIntro ? 'opacity-0' : 'opacity-100'} ${hideIntro ? 'hidden' : 'block'} `}
                >
                  Enter a song name with the artist or the artist name only to
                  get a list of their songs.
                </p>
              ) : (
                <p
                  className={`text-[15px] text-center text-orange-400 transition duration-700 ${fadeIntro ? 'opacity-0' : 'opacity-100'} ${hideIntro ? 'hidden' : 'block'} `}
                >
                  please do not leave the artist field empty.
                </p>
              )}
              <div
                className={` flex flex-col relative items-center  justify-center ${hideResult ? 'block' : 'hidden'} transition duration-700 ${fadeResult ? 'opacity-100' : 'opacity-0'}`}
              >
                <p
                  className={`text-center text-orange-400 font-mono font-bold ${favMsg ? 'block' : 'hidden'}`}
                >
                  Added {song} by {artist} to favorites
                </p>
                <p
                  className={`text-center text-orange-400 font-mono font-bold ${listMsg ? 'block' : 'hidden'}`}
                >
                  you added {song} by {artist} to your playlist
                </p>
                {results.length === 0 ? (
                  <p
                    className={`text-orange-400 text-center ${results.length === 0 ? 'block' : 'hidden'}`}
                  >
                    couldnt find your song enter the artist name only and see if
                    you can find it their
                  </p>
                ) : (
                  ''
                )}
                <div
                  className={`flex ${favMsg ? 'hidden' : 'block'} ${listMsg ? 'hidden' : 'block'} relative ${results.length === 0 ? 'hidden' : 'block'}`}
                >
                  <div
                    style={{ backgroundImage: `url(${poster})` }}
                    className={` bg-center bg-cover bg-repeat-y w-[100px] h-[100px] object-cover  trapezoid mask-b-from-20% mask-b-to-93% ml-[10px]  mr-[10px]`}
                  ></div>
                  <div className="absolute bottom-[0px] ">
                    <HeartIcon
                      onClick={addToFavorites}
                      className={`w-[20px] cursor-pointer absolute bottom-[-50px] h-[20px] text-orange-400 left-[0px] mb-[5px] ${favMsg ? 'hidden' : 'block'} ${listMsg ? 'hidden' : 'block'}`}
                    />
                    <Bars3Icon
                      onClick={addToPlaylist}
                      className={`w-[20px] absolute cursor-pointer bottom-[-50px] h-[20px] text-orange-400 ml-[30px] mb-[5px] left-[0px] ${favMsg ? 'hidden' : 'block'}  ${listMsg ? 'hidden' : 'block'}`}
                    />
                  </div>

                  <div className="h-[100px]">
                    <p
                      className={` text-center text-[12px] font-mono font-bold text-orange-400 transition duration-700  ${nowPlaying ? 'opacity-100' : 'opacity-0'}`}
                    >
                      Now Playing:
                    </p>
                    <div
                      className={`flex flex-col items-center justify-center w-[150px]`}
                    >
                      <p
                        className={` text-center text-[13px] font-mono font-bold text-orange-400 `}
                      >
                        {artist} -
                      </p>

                      <p
                        className={` text-center text-[13px] font-mono font-bold text-orange-400 `}
                      >
                        {song}.
                      </p>
                      <p className=" text-[13px] text-center font-mono font-bold text-orange-400">
                        {genre}
                      </p>
                      <p className="text-[10px] font-bold font-mono text-orange-400">
                        {skip + 1} of {length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
