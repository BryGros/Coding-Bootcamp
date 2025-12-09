import { useState } from "react";

export default function Part2UpdatingNestedObjects() {
  const [userProfile, setUserProfile] = useState({
    personal: {
      name: "Alice",
      age: 25,
      email: "alice@example.com",
    },
    preferences: {
      theme: "dark",
      notifications: true,
      language: "en",
    },
    settings: {
      privacy: "public",
      newsletter: false,
    },
    profileId: 123,
    anotherProperty: "This is another primitive",
  });
  const [count, setCount] = useState(0);

  //Shallow spread doesn't help with nested mutations
  const updateThemeWrong = () => {
    console.log("WRONG: Shallow spread with nested mutation");
    userProfile.preferences.theme = "light"; // Still a mutation!
    setUserProfile({ ...userProfile }); // Shallow spread doesn't help
  };

  //  RIGHT WAY - Spread all levels that change
  const updateThemeRight = () => {
    console.log("RIGHT: Spreading all nested levels");
    setUserProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: prev.preferences.theme === "dark" ? "light" : "dark",
      },
    }));
  };

  return (
    <div className="step-container">
      <h2> Nested Objects</h2>
      <div className="wrong-section">
        <h4>Wrong Way</h4>
        <button onClick={updateThemeWrong} className="btn-wrong">
          Mutate Theme (Won't Work)
        </button>
        <p className="warning">
          This uses shallow spread with nested mutation - won't trigger
          re-render!
        </p>
        <button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
          className="btn-wrong"
        >
          Increment Count will force an update and Now "light" will show up on
          the theme
        </button>
      </div>

      <div className="right-section">
        <h4> Right Way using multiple spread</h4>
        <button onClick={updateThemeRight} className="btn-right">
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
