import { useEffect } from 'react';

type Favorites = {
  song: string;
  artist: string;
  poster: string;
  audio: string;
  genre: string;
};
interface Prop {
  favorites: Favorites[];
  skipFav: number;
  genre: string;
  nowPlaying: boolean;
  song: string;
  artist: string;
  setFavAudio: (favAudio: string) => void;
  poster: string;
  audio: string;
}
export function Favorites({
  favorites,
  skipFav,
  nowPlaying,
  setFavAudio,
}: Prop) {
  useEffect(() => {
    if (favorites.length === 0) return;
    setFavAudio(favorites[skipFav].audio);
  }, [setFavAudio, favorites, skipFav]);
  return (
    <div className={` flex items-center flex-col`}>
      <p className="text-orange-400">Favorites</p>

      <div
        className={`w-[250px] flex  ${favorites.length === 0 ? 'justify-center' : ''} mt-[10px] `}
      >
        {favorites.length === 0 ? (
          <div>
            <p className="text-orange-400 text-center  font-mono mt-[10px] font-bold">
              you have no favorited songs.
            </p>
            <p className="text-orange-400 text-center  font-mono  font-bold">
              click on the heart to add one.
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <div
              style={{ backgroundImage: `url(${favorites[skipFav].poster})` }}
              className={` bg-center bg-cover bg-repeat-y w-[100px] h-[100px] object-cover trapezoid mask-b-from-20% mask-b-to-93%  mr-[10px]`}
            ></div>

            <div>
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
                  {favorites[skipFav].artist} -
                </p>

                <p
                  className={` text-center text-[13px] font-mono font-bold text-orange-400 `}
                >
                  {favorites[skipFav].song}.
                </p>
                <p className=" text-[13px] font-mono font-bold text-orange-400">
                  {favorites[skipFav].genre}
                </p>
                <p className="text-[10px] font-bold font-mono text-orange-400">
                  {skipFav + 1} of {favorites.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
