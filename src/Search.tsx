import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
type Results = {
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
  primaryGenreName: string;
};
interface Prop {
  setCheckInput: (checkInput: boolean) => void;
  setFadeIntro: (fadeIntro: boolean) => void;
  setFadeSearching: (fadeSearching: boolean) => void;
  setHideIntro: (hideIntro: boolean) => void;
  setSongQuery: (song: string) => void;
  setArtistQuery: (artist: string) => void;
  setSearching: (searching: boolean) => void;
  setFadeResult: (fadeResult: boolean) => void;
  setHideResult: (hideResult: boolean) => void;
  setSkip: (skip: number) => void;
  artist: string;
  song: string;
  poster: string;
  results: Results[];
}
export function Search({
  setCheckInput,
  setFadeIntro,
  setHideIntro,
  setSongQuery,
  setArtistQuery,
  setSkip,
  setSearching,
  setFadeSearching,
  setFadeResult,
  setHideResult,
  results,
}: Prop) {
  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  function search() {
    if (artistRef.current?.value === '') {
      setCheckInput(false);

      setTimeout(() => {
        setFadeIntro(false);
        setFadeSearching(false);
      }, 100);
      setTimeout(() => {
        setHideIntro(false);
      }, 800);
      setSearching(false);
    } else {
      setFadeIntro(true);
      setFadeSearching(false);

      if (results.length === 0) {
        console.log('failed');
      } else {
        console.log('pass');
      }

      setSearching(true);
      setHideResult(false);
      setTimeout(() => {
        setSearching(false);
        setHideResult(true);
      }, 3000);
      setTimeout(() => {
        setFadeResult(true);
      }, 3100);
      setHideIntro(true);

      setSkip(0);
      if (artistRef.current) {
        setArtistQuery(artistRef.current.value);
      }
      if (songRef.current) {
        setSongQuery(songRef.current.value);
      }
    }
  }

  return (
    <div className="flex w-full items-center justify-center mt-[10px] gap-[10px] font-mono font-bold pb-[5px]">
      <input
        ref={songRef}
        type="text"
        placeholder="song"
        className="bg-black p-[15px] border-solid border-b-[1px] outline-none border-orange-400 w-[120px] h-[25px] text-orange-400 placeholder:text-orange-400"
      />
      <input
        ref={artistRef}
        type="text"
        placeholder="artist"
        className="bg-black p-[15px] border-solid border-b-[1px] outline-none border-orange-400 w-[136px] h-[25px] text-orange-400 placeholder:text-orange-400"
      />
      <MagnifyingGlassCircleIcon
        onClick={search}
        className="cursor-pointer w-[40px] h-[40px] text-orange-400"
      />
    </div>
  );
}
