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
      playerSubtitle: "Performed by The Evans Choir, 2024 Denver, CO",
      genre: "choral",
      poem: `Adapted from Love (I) and Love(II) by George Herbert:
      Immortal Love, author of this great frame,
Sprung from that beauty which can never fade,
How hath man parcel'd out Thy glorious name,
And thrown it on that dust which Thou hast made,
While mortal love doth all the title gain!
Immortal Heat, O let Thy greater flame
Attract the lesser to it; let those fires
Which shall consume the world first make it tame,
And kindle in our hearts such true desires.`,
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
        "Performed by St. Martin's Chamber Choir, 2024 Denver, CO",
      about: `Celebrating the decades of images from the Hubble and James Webb telescopes, the poetry (by F. Taylor Atkinson) delves deep into humanity's unyielding quest to unravel the mysteries of the cosmos. Through soaring melodies and intricate harmonies, the piece paints a vivid portrait of our collective pursuit of understanding, punctuated by moments of triumph and revelation. Each musical "problem" presented is met with resolute determination as the choir navigates through intricacies and complexities, steadily inching closer to the end goal of capturing awe-inspiring images of our cosmos. As the crescendo builds, "We Reach" achieves its climactic zenith, culminating in a jubilant groove section that will set your choristers' hearts ablaze.`,
      genre: "choral",
      poem: `We Reach by F. Taylor Atkinson:
      The Heavens call,
And so we reach–
Slow, now, as babes
Learning to stand,
Yearning to run
To all we see.
Propelled by a need to know
The clouds of formation,
Storms of creation - beckon
Us outward, all humanity in tow.
We leap through stellar waves,
Hands plying through the spray
Of cosmic rays.
We fly back to childhood,
Wondering at the play of colors
On clouds passing by–
Fingers trying to touch, but remain
So far away.
The Webbs we cast
Delve into history
Revealing ghosts
Of stars as they once were–
Sky-lodged diamonds,
Once a blur,
Come into focus with a snap.
Stretched high on tiptoes–
In wonder of the universe around us,
We reach.`,
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
      poem: `Silent Noon by Dante Gabriel Rossetti:
      Your hands lie open in the long fresh grass, -
The finger-points look through like rosy blooms:
Your eyes smile peace. The pasture gleams and glooms
'Neath billowing skies that scatter and amass.

All round our nest, far as the eye can pass,
Are golden kingcup fields with silver edge
Where the cow-parsley skirts the hawthorn hedge.
'Tis visible silence, still as the hour glass.

Deep in the sunsearched growths the dragon-fly
Hangs like a blue thread loosened from the sky: -
So this winged hour is dropt to us from above.
Oh! clasp we to our hearts, for deathless dower,
This close-companioned inarticulate hour
When twofold silence was the song of love.
      `,
      theme: "theme-SN",
    },
  ];

  const [loadedSong, setLoadedSong] = useState({});

  return (
    <div className={`background ${loadedSong.theme}`}>
      <Player
        loadedSong={loadedSong}
        setLoadedSong={setLoadedSong}
        tracks={tracks}
      />
    </div>
  );
}
