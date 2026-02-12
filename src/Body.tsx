import { useEffect, useState } from 'react';
import { Buttons } from './Buttons.tsx';
import { Screen } from './Screen.tsx';
import { Search } from './Search.tsx';

type Results = {
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
  primaryGenreName: string;
};

export function Body() {
  const [checkInput, setCheckInput] = useState<boolean>(true);
  const [fadeIntro, setFadeIntro] = useState<boolean>(false);
  const [hideIntro, setHideIntro] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [songQuery, setSongQuery] = useState<string>('');
  const [artistQuery, setArtistQuery] = useState<string>('');
  const [results, setResults] = useState<Results[]>([]);
  const [nowPlaying, setNowplaying] = useState<boolean>(false);
  const [fadeSearching, setFadeSearching] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [fadeResult, setFadeResult] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [nav, setNav] = useState<number>(0);
  const [des, setDes] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(false);
  const [list, setList] = useState<boolean>(false);
  const [favAudio, setFavAudio] = useState<string>('');
  const [skipFav, setSkipFav] = useState<number>(0);
  const [listAudio, setListAudio] = useState<string>('');
  const [listLength, setListLength] = useState<number>(0);
  const [favLength, setFavLength] = useState<number>(0);
  const [skipList, setSkipList] = useState<number>(0);
  const [hideResult, setHideResult] = useState<boolean>(false);

  useEffect(() => {
    if (!artistQuery) return;

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(artistQuery + songQuery)}&entity=song`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResults(data.results);
        setSkip(0);
      });
  }, [artistQuery, songQuery]);

  const track = results[skip] ?? null;
  console.log(track);

  const song = track?.trackName ?? '';
  const artist = track?.artistName ?? '';
  const poster = track?.artworkUrl100 ?? '';
  const audio = track?.previewUrl ?? '';
  const genre = track?.primaryGenreName ?? '';
  const length = results.length;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-[40px]">
      <div className="hidden md:block w-[369px] flex flex-col">
        <Search
          setCheckInput={setCheckInput}
          setFadeIntro={setFadeIntro}
          setHideIntro={setHideIntro}
          setSongQuery={setSongQuery}
          setArtistQuery={setArtistQuery}
          setSkip={setSkip}
          setSearching={setSearching}
          setFadeSearching={setFadeSearching}
          setFadeResult={setFadeResult}
          setHideResult={setHideResult}
          poster={poster}
          artist={artist}
          song={song}
          results={results}
        />
      </div>

      <div className="md:hidden">
        <Search
          setSkip={setSkip}
          setCheckInput={setCheckInput}
          setFadeIntro={setFadeIntro}
          setHideIntro={setHideIntro}
          setSongQuery={setSongQuery}
          setArtistQuery={setArtistQuery}
          setSearching={setSearching}
          setFadeSearching={setFadeSearching}
          setFadeResult={setFadeResult}
          setHideResult={setHideResult}
          poster={poster}
          artist={artist}
          song={song}
          results={results}
        />
      </div>

      <div className="w-[350px] h-[540px] relative bg-black border-[5px] border-orange-400 rounded-[30px] overflow-y-scroll no-scrollbar flex justify-center">
        <div className="transition duration-700">
          <Screen
            checkInput={checkInput}
            hideIntro={hideIntro}
            fadeIntro={fadeIntro}
            song={song}
            artist={artist}
            poster={poster}
            nowPlaying={nowPlaying}
            length={length}
            skip={skip}
            genre={genre}
            searching={searching}
            fadeSearching={fadeSearching}
            fadeResult={fadeResult}
            menu={menu}
            nav={nav}
            des={des}
            list={list}
            fav={fav}
            audio={audio}
            setFavAudio={setFavAudio}
            skipFav={skipFav}
            setListAudio={setListAudio}
            skipList={skipList}
            setListLength={setListLength}
            listLength={listLength}
            setFavLength={setFavLength}
            hideResult={hideResult}
            results={results}
          />

          <Buttons
            setSkip={setSkip}
            setSkipFav={setSkipFav}
            skipFav={skipFav}
            setSkipList={setSkipList}
            skipList={skipList}
            setNowPlaying={setNowplaying}
            setMenu={setMenu}
            length={length}
            skip={skip}
            audio={audio}
            menu={menu}
            setNav={setNav}
            nav={nav}
            setDes={setDes}
            setList={setList}
            setFav={setFav}
            des={des}
            list={list}
            fav={fav}
            favAudio={favAudio}
            listAudio={listAudio}
            listLength={listLength}
            favLength={favLength}
          />
        </div>
      </div>
    </div>
  );
}
