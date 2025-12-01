import immortalLove from "../assets/immortal-love.mp3";
import prelude from "../assets/prelude-no-1.m4a";
import weReach from "../assets/we-reach.m4a";
import gumshoe from "../assets/intro-signatures.m4a";
import silentNoon from "../assets/silent-noon.mp3";
import { useState } from "react";
import Player from "./Player";

export default function Background() {
  const tracks = [
    {
      id: 1,
      src: immortalLove,
      title: "Herbert's Love",
      about: `Through four movements using a narrative crafted from George Herbert's three "Love" poems, the choir ushers the audience through the ups and downs of the journey of finding your purpose, and presents how identity often interweaves with your chosen path for the better or worse. This is the first movement, when true purpose is discovered`,
      playerSubtitle: "Performed by Evans Choir, 2024 Denver, CO",
      genre: "choral",
      poem: `Adapted from Love (I) and Love(II) by George Herbert:BR/Immortal Love, author of this great frame,BR/Sprung from that beauty which can never fade,BR/How hath man parcel'd out Thy glorious name,BR/And thrown it on that dust which Thou hast made,BR/While mortal love doth all the title gain!BR/Immortal Heat, O let Thy greater flameBR/Attract the lesser to it; let those firesBR/Which shall consume the world first make it tame,BR/And kindle in our hearts such true desires.`,
      theme: "theme-IL",
    },
    {
      id: 2,
      src: prelude,
      title: "Prelude No. 1",
      playerSubtitle: "Performed by Ross Mosier, 2019 Lincoln, NE",
      genre: "piano",
      about: `Beginning with the serene beauty of a hillside afternoon, storm clouds swiftly gather, obscuring the tranquil scene. Through stirring melodies and crescendos, the music triumphs as sunbeams pierce through, unveiling a majestic panorama transformed by the tempest.`,
      theme: "theme-P1",
    },
    {
      id: 3,
      src: weReach,
      title: "We Reach",
      playerSubtitle:
        "Performed by Vokalensemble St. Matthaus, 2025 Erlangen, Germany",
      about: `Celebrating the decades of images from the Hubble and James Webb telescopes, the poetry (by F. Taylor Atkinson) delves deep into humanity's unyielding quest to unravel the mysteries of the cosmos. Through soaring melodies and intricate harmonies, the piece paints a vivid portrait of our collective pursuit of understanding, punctuated by moments of triumph and revelation. Each musical "problem" presented is met with resolute determination as the choir navigates through intricacies and complexities, steadily inching closer to the end goal of capturing awe-inspiring images of our cosmos. As the crescendo builds, "We Reach" achieves its climactic zenith, culminating in a jubilant groove section that will set your choristers' hearts ablaze.`,
      genre: "choral",
      poem: `We Reach by F. Taylor Atkinson:BR/The Heavens call,BR/And so we reach–BR/Slow, now, as babesBR/Learning to stand,BR/Yearning to runBR/To all we see.BR/Propelled by a need to knowBR/The clouds of formation,BR/Storms of creation - beckonBR/Us outward, all humanity in tow.BR/We leap through stellar waves,BR/Hands plying through the sprayBR/Of cosmic rays.BR/We fly back to childhood,BR/Wondering at the play of colorsBR/On clouds passing by–BR/Fingers trying to touch, but remainBR/So far away.BR/The Webbs we castBR/Delve into historyBR/Revealing ghostsBR/Of stars as they once were–BR/Sky-lodged diamonds,BR/Once a blur,BR/Come into focus with a snap.BR/Stretched high on tiptoes–BR/In wonder of the universe around us,BR/We reach.`,
      theme: "theme-WR",
    },
    {
      id: 4,
      src: gumshoe,
      title: "Gumshoe Theme",
      playerSubtitle: 'Created for "Gumshoe" by Marsden Media, 2019 Denver, CO',
      genre: "film",
      about: `This track accompanied the opening scene of a movie entered into the Denver 48-hour film festival called "Gumshoe." The entirety of the film, including the music, was created in the span of 48 hours.  This track was the first one written for the film, before the scene was fully scripted and filmed.`,
      theme: "theme-GS",
    },
    {
      id: 5,
      src: silentNoon,
      title: "Silent Noon",
      playerSubtitle:
        "Performed by St. Martin's Chamber Choir, 2019 Denver, CO",
      about: `Through fluid, meterless phrasing, each choir uniquely shapes the pacing, making every performance a singular experience. Lush quartal harmonies swirl in an ethereal soundscape, reflecting the hazy, dreamlike quality of remembrance, while poignant moments of clarity emerge through structured meter and familiar tertian sonorities.`,
      genre: "choral",
      poem: `Silent Noon by Dante Gabriel Rossetti:BR/Your hands lie open in the long fresh grass,BR/The finger-points look through like rosy blooms:BR/Your eyes smile peace. The pasture gleams and gloomsBR/'Neath billowing skies that scatter and amass.BR/All round our nest, far as the eye can pass,BR/Are golden kingcup fields with silver edgeBR/Where the cow-parsley skirts the hawthorn hedge.BR/'Tis visible silence, still as the hour glass.BR/Deep in the sunsearched growths the dragon-flyBR/Hangs like a blue thread loosened from the sky:BR/So this winged hour is dropt to us from above.BR/Oh! clasp we to our hearts, for deathless dower,BR/This close-companioned inarticulate hourBR/When twofold silence was the song of love.
      `,
      theme: "theme-SN",
    },
  ];

  const [loadedSong, setLoadedSong] = useState({});

  return (
    <div key={loadedSong.theme} className={`background ${loadedSong.theme}`}>
      <Player
        loadedSong={loadedSong}
        setLoadedSong={setLoadedSong}
        tracks={tracks}
      />
    </div>
  );
}
