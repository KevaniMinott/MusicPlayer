import { useEffect } from 'react';

type Playlist = {
  song: string;
  artist: string;
  poster: string;
  audio: string;
  genre: string;
};
interface Prop {
  playlist: Playlist[];
  length: number;
  audio: string;
  skipList: number;
  genre: string;
  nowPlaying: boolean;
  song: string;
  artist: string;
  setListAudio: (ListAudio: string) => void;
  poster: string;
  listLength: number;
}
export function PlayList({
  skipList,
  nowPlaying,
  setListAudio,

  playlist,
}: Prop) {
  useEffect(() => {
    if (playlist.length === 0) return;
    setListAudio(playlist[skipList].audio);
  }, [setListAudio, skipList, playlist]);
  return (
    <div className={` flex items-center flex-col`}>
      <p className="text-orange-400">Playlist</p>
      <div
        className={`w-[250px] flex  ${playlist.length === 0 ? 'justify-center' : ''} mt-[10px] `}
      >
        {playlist.length === 0 ? (
          <div>
            <p className="text-orange-400 text-center font-mono mt-[10px] font-bold">
              your playlist is empty.
            </p>
            <p className="text-orange-400 text-center font-mono font-bold">
              click on the bars to add one.
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <div
              style={{ backgroundImage: `url(${playlist[skipList].poster})` }}
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
                  {playlist[skipList].artist} -
                </p>

                <p
                  className={` text-center text-[13px] font-mono font-bold text-orange-400 `}
                >
                  {playlist[skipList].song}.
                </p>
                <p className=" text-[13px] font-mono font-bold text-orange-400">
                  {playlist[skipList].genre}
                </p>
                <p className="text-[10px] font-bold font-mono text-orange-400">
                  {skipList + 1} of {playlist.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
