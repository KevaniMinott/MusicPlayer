import { Description } from './Description';
import { Favorites } from './Favorites';
import { PlayList } from './PlayList';

type Favorites = {
  song: string;
  artist: string;
  poster: string;
  audio: string;
  genre: string;
};
type Playlist = {
  song: string;
  artist: string;
  poster: string;
  audio: string;
  genre: string;
};
interface Prop {
  nav: number;
  des: boolean;
  list: boolean;
  fav: boolean;
  favorites: Favorites[];
  playlist: Playlist[];
  nowPlaying: boolean;
  length: number;
  skipFav: number;
  skipList: number;
  genre: string;
  song: string;
  artist: string;
  audio: string;
  poster: string;
  setFavAudio: (favAudio: string) => void;
  setListAudio: (listAudio: string) => void;
  listLength: number;
}

export function Menu({
  nav,
  des,
  list,
  fav,
  favorites,
  playlist,
  nowPlaying,
  length,
  skipFav,
  skipList,
  genre,
  song,
  artist,
  poster,
  audio,
  setFavAudio,
  setListAudio,
  listLength,
}: Prop) {
  return (
    <div
      className={`bg-black flex flex-col pt-[20px]  items-center w-[300px] h-[200px] rounded-l-[10px]`}
    >
      {des ? (
        <div className={` flex items-center flex-col`}>
          <Description />
        </div>
      ) : list ? (
        <div
          className={` flex items-center h-full w-[250px] flex-col ${poster && song && artist ? '' : 'justify-center'}`}
        >
          {!poster && !song && !artist ? (
            <div>
              <p className="text-orange-400 text-center font-mono font-bold">
                your playlist is empty.
              </p>
              <p className="text-orange-400 text-center font-mono font-bold">
                click on the bars to add one.
              </p>
            </div>
          ) : (
            <PlayList
              nowPlaying={nowPlaying}
              genre={genre}
              skipList={skipList}
              length={length}
              playlist={playlist}
              song={song}
              poster={poster}
              artist={artist}
              audio={audio}
              setListAudio={setListAudio}
              listLength={listLength}
            />
          )}
        </div>
      ) : fav ? (
        <div
          className={` flex items-center h-full w-[250px] flex-col ${poster && song && artist ? '' : 'justify-center'}`}
        >
          {!poster && !song && !artist ? (
            <div>
              <p className="text-orange-400 text-center  font-mono mt-[10px] font-bold">
                you have no favorited songs.
              </p>
              <p className="text-orange-400 text-center  font-mono  font-bold">
                click on the heart to add one.
              </p>
            </div>
          ) : (
            <Favorites
              nowPlaying={nowPlaying}
              audio={audio}
              genre={genre}
              skipFav={skipFav}
              favorites={favorites}
              song={song}
              poster={poster}
              artist={artist}
              setFavAudio={setFavAudio}
            />
          )}
        </div>
      ) : (
        ''
      )}

      <div className={` ${des || fav || list ? 'hidden' : 'block'} w-full`}>
        <div className=" w-full h-[30px] flex flex-col  items-center justify-center">
          <p className="text-orange-400 w-full h-full flex text-[20px] font-mono font-bold  items-center justify-center">
            Menu
          </p>
        </div>
        <div
          className={`${nav === 0 ? 'bg-orange-400' : 'bg-black'} w-full h-[30px] flex flex-col  items-center justify-center`}
        >
          <p
            className={` w-full h-full ${nav === 0 ? 'text-black' : 'text-orange-400'} cursor-pointer flex   items-center justify-center`}
          >
            Description
          </p>
        </div>
        <div
          className={`${nav === 1 ? 'bg-orange-400' : 'bg-black'} w-full h-[30px] flex flex-col  items-center justify-center`}
        >
          <p
            className={` w-full h-full ${nav === 1 ? 'text-black' : 'text-orange-400'} cursor-pointer flex   items-center justify-center`}
          >
            favorites
          </p>
        </div>
        <div
          className={`${nav === 2 ? 'bg-orange-400' : 'bg-black'} w-full h-[30px] flex flex-col  items-center justify-center`}
        >
          <p
            className={` w-full h-full ${nav === 2 ? 'text-black' : 'text-orange-400'} cursor-pointer flex   items-center justify-center`}
          >
            playlist
          </p>
        </div>
      </div>
    </div>
  );
}
