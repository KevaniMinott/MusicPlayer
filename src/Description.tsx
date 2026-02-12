export function Description() {
  return (
    <div className={` flex items-center flex-col`}>
      <p className="text-orange-400">Description</p>
      <div className="w-[250px]">
        <p className="text-orange-400 text-[10px]">
          A music player, built with React and TypeScript, features an
          iPod-style UI with a audioMack inspired theme, styled using Tailwind
          CSS. It fetches real songs via the iTunes API and plays 30-second
          previews with the HTML5 audio element, while React hooks manage state
          and interactivity with audio feedback for a tactile experience.
        </p>
      </div>
    </div>
  );
}
