import { HomeIcon } from '@heroicons/react/24/outline';
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ForwardIcon,
  PlayPauseIcon,
  QueueListIcon,
} from '@heroicons/react/24/solid';
import { BackwardIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import clickSound from './sounds/506052__mellau__button-click-3.wav';
import enterSound from './sounds/836450__feraly__simple-or-cute-ui-ux-interface-confirm-sound.wav';
import defaultSound from './sounds/506054__mellau__button-click-1.wav';
import menuSound from './sounds/50557__broumbroum__sf3-sfx-menu-back.wav';
interface Prop {
  setSkip: (skip: number) => void;
  setSkipFav: (skipFav: number) => void;
  setSkipList: (skipList: number) => void;
  skip: number;
  length: number;
  audio: string;
  setNowPlaying: (nowPlaying: boolean) => void;
  setNav: React.Dispatch<React.SetStateAction<number>>;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menu: boolean;
  nav: number;
  setDes: (des: boolean) => void;
  setList: (list: boolean) => void;
  setFav: (fav: boolean) => void;
  des: boolean;
  list: boolean;
  fav: boolean;
  favAudio: string;
  listAudio: string;
  skipFav: number;
  skipList: number;
  listLength: number;
  favLength: number;
}

export function Buttons({
  setSkip,
  skip,
  length,
  audio,
  setNowPlaying,
  setMenu,
  menu,
  setNav,
  nav,
  setDes,
  setList,
  setFav,
  des,
  fav,
  list,
  favAudio,
  skipFav,
  skipList,
  setSkipFav,
  setSkipList,
  listLength,
  listAudio,
  favLength,
}: Prop) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickRef = useRef<HTMLAudioElement>(null);
  const enterRef = useRef<HTMLAudioElement>(null);
  const defaultRef = useRef<HTMLAudioElement>(null);
  const menuRef = useRef<HTMLAudioElement>(null);
  const listRef = useRef<HTMLAudioElement>(null);
  const favRef = useRef<HTMLAudioElement>(null);

  function porp() {
    if (!audio && !favAudio && !listAudio) return;

    console.log(fav);
    console.log(favRef.current);

    console.log(audio);
    console.log(favAudio);
    console.log(listAudio);

    if (fav) {
      setIsPlaying((prev) => {
        if (!favRef.current) return prev;
        if (defaultRef.current) {
          defaultRef.current.currentTime = 0;
          defaultRef.current.play();
        }

        if (isPlaying) {
          setNowPlaying(false);
        } else {
          setNowPlaying(true);
        }
        if (prev) {
          favRef.current.pause();
        } else {
          favRef.current.currentTime = 0;
          favRef.current.play();
        }

        return !prev;
      });
    } else if (list) {
      setIsPlaying((prev) => {
        if (!listRef.current) return prev;
        if (defaultRef.current) {
          defaultRef.current.currentTime = 0;
          defaultRef.current.play();
        }

        if (isPlaying) {
          setNowPlaying(false);
        } else {
          setNowPlaying(true);
        }
        if (prev) {
          listRef.current.pause();
        } else {
          listRef.current.currentTime = 0;
          listRef.current.play();
        }

        return !prev;
      });
    } else {
      setIsPlaying((prev) => {
        if (!audioRef.current) return prev;
        if (defaultRef.current) {
          defaultRef.current.currentTime = 0;
          defaultRef.current.play();
        }

        if (isPlaying) {
          setNowPlaying(false);
        } else {
          setNowPlaying(true);
        }
        if (prev) {
          audioRef.current.pause();
        } else {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }

        return !prev;
      });
    }
  }

  function forward() {
    if (defaultRef.current) {
      defaultRef.current.currentTime = 0;
      defaultRef.current.play();
    }
    console.log(isPlaying);

    if (fav) {
      if (skipFav === favLength) {
        return;
      } else {
        setSkipFav(skipFav + 1);
        setIsPlaying(false);
        setNowPlaying(false);
      }
    } else if (list) {
      if (skipList === listLength) {
        return;
      } else {
        setSkipList(skipList + 1);
        setIsPlaying(false);
        setNowPlaying(false);
      }
    } else {
      if (skip + 1 === length) {
        return;
      } else {
        setSkip(skip + 1);
        setIsPlaying(false);
        setNowPlaying(false);
      }
    }
  }

  function backward() {
    setIsPlaying((prev) => (prev === false ? true : false));
    if (defaultRef.current) {
      defaultRef.current.currentTime = 0;
      defaultRef.current.play();
    }
    console.log(isPlaying);

    if (fav) {
      if (skipFav === 0) {
        return;
      } else {
        setSkipFav(skipFav - 1);
        setIsPlaying(false);
        setNowPlaying(false);
      }
    } else if (list) {
      if (skipList === 0) {
        return;
      } else {
        setSkipList(skipList - 1);
        setIsPlaying(false);
        setNowPlaying(false);
      }
    } else if (skip === 0) {
      return;
    } else {
      setSkip(skip - 1);
      setIsPlaying(false);
      setNowPlaying(false);
    }
  }

  function showMenu() {
    if (menuRef.current) {
      menuRef.current.currentTime = 0;
      menuRef.current.play();
    }

    setMenu(true);
    if (audioRef.current) {
      if (menu) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();

        setIsPlaying(false);
      }
    }
  }

  function back() {
    if (defaultRef.current) {
      defaultRef.current.currentTime = 0;
      defaultRef.current.play();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    if (favRef.current) {
      favRef.current.pause();
      setIsPlaying(false);
    }

    if (listRef.current) {
      listRef.current.pause();
      setIsPlaying(false);
    }

    if (list || fav || des) {
      setMenu(true);
      setDes(false);
      setFav(false);
      setList(false);
    } else {
      setMenu(false);
    }
  }

  function down() {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
    if (nav === 2) return;

    if (list || fav || des) {
      return;
    }
    setNav((prev) => prev + 1);
  }

  function up() {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
    if (list || fav || des) return;
    if (Math.max(nav) === 0) return;
    setNav((prev) => prev - 1);
  }
  function enter() {
    if (enterRef.current) {
      enterRef.current.currentTime = 0;
      enterRef.current.play();
    }
    if (nav === 0) {
      setDes(true);
      setFav(false);
      setList(false);
    } else if (nav === 1) {
      setFav(true);
      setDes(false);
      setList(false);
    } else if (nav === 2) {
      setList(true);
      setFav(false);
      setDes(false);
    }
  }
  function home() {
    if (defaultRef.current) {
      defaultRef.current.currentTime = 0;
      defaultRef.current.play();
    }
    setNowPlaying(false);
    setIsPlaying(false);
    setMenu(false);
    setDes(false);
    setFav(false);
    setList(false);
    setNav(0);
  }

  return (
    <>
      <div
        className={` flex flex-col w-full items-center relative justify-center  transition duration-700`}
      >
        <p className="font-bold font-mono text-[30px] text-orange-400">iPod</p>
        {audio && <audio ref={audioRef} src={audio} />}
        {favAudio && <audio ref={favRef} src={favAudio} />}
        {listAudio && <audio ref={listRef} src={listAudio} />}
        <audio ref={clickRef} src={clickSound} preload="auto" />
        <audio ref={enterRef} src={enterSound} preload="auto" />
        <audio ref={defaultRef} src={defaultSound} preload="auto" />
        <audio ref={menuRef} src={menuSound} preload="auto" />

        <div className="w-[170px] mt-[10px h-[170px] rounded-[200px] border-[4px] flex justify-center items-center border-orange-400  bg-black  mt-[50px]">
          <div className="w-[50px] h-[50px] flex-row rounded-[300px] bg-orange-400 flex justify-center relative items-center ">
            <div
              className={`${menu ? 'block' : 'hidden'} flex items-center justify-center`}
            >
              {fav || list ? (
                <div className={`flex items-center justify-center `}>
                  <ArrowUturnLeftIcon
                    onClick={back}
                    className="absolute top-[-50px] cursor-pointer text-orange-400 w-[30px] h-[30px]"
                  />
                  <BackwardIcon
                    onClick={backward}
                    className="w-[30px]  absolute left-[-50px] cursor-pointer h-[30px] text-orange-400"
                  />

                  <PlayPauseIcon
                    onClick={porp}
                    className={`w-[30px] cursor-pointer absolute bottom-[-50px] h-[30px] z-10 text-orange-400 ${isPlaying ? '' : ''}`}
                  />
                  <ForwardIcon
                    onClick={forward}
                    className="w-[30px] absolute right-[-50px] cursor-pointer h-[30px] text-orange-400"
                  />
                </div>
              ) : (
                <>
                  <ChevronUpIcon
                    onClick={up}
                    className="absolute cursor-pointer top-[-50px] text-orange-400 w-[30px] h-[30px]"
                  />
                  <ChevronDownIcon
                    onClick={down}
                    className="absolute bottom-[-50px] cursor-pointer text-orange-400 w-[30px] h-[30px]"
                  />
                  <ArrowUturnLeftIcon
                    onClick={back}
                    className="absolute left-[-50px] cursor-pointer text-orange-400 w-[30px] h-[30px]"
                  />
                  <HomeIcon
                    onClick={home}
                    className="absolute right-[-50px] cursor-pointer text-orange-400 w-[30px] h-[30px]"
                  />
                  <button
                    onClick={enter}
                    className="text-black absolute cursor-pointer font-mono font-bold"
                  >
                    enter
                  </button>
                </>
              )}
            </div>

            <div
              className={`flex items-center justify-center ${menu ? 'hidden' : 'block'}`}
            >
              <button
                onClick={showMenu}
                className="absolute top-[-50px] cursor-pointer text-orange-400 font-mono font-bold flex items-center"
              >
                MENU <QueueListIcon className="w-[15px] h-[15px]" />
              </button>
              <BackwardIcon
                onClick={backward}
                className="w-[30px]  absolute left-[-50px] cursor-pointer h-[30px] text-orange-400"
              />
              <PlayPauseIcon
                onClick={porp}
                className="w-[30px] cursor-pointer absolute bottom-[-50px] h-[30px] z-10 text-orange-400"
              />
              <ForwardIcon
                onClick={forward}
                className="w-[30px] absolute right-[-50px] cursor-pointer h-[30px] text-orange-400"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
