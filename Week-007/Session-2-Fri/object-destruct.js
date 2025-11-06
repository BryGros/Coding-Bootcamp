const location = {
  city: "Aurora",
  state: "Colorado",
  zip: 80031,
};

const { city, state, zip } = location;

console.log(state);

function nameStuff({ city }) {
  console.log(city);
}

nameStuff(location);
