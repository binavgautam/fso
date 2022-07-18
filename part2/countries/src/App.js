import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [viewOne, setViewOne] = useState(false);

  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setCountries(response);
      });
  }, []);

  const names = countries.map((r) => r.name.common);
  const toShow = names.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (s) => {
    const c = countries.find((c) => c.name.common === s);
    setCountry(c);
    setViewOne(true);
    console.log(c);
  };

  const clear = () => {
    setSearch("");
    setViewOne(false);
    setCountry(null);
  };

  return (
    <div>
      <h1>Countries</h1>
      Search{" "}
      <input
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <button type="button" onClick={clear}>
        clear
      </button>
      <div>
        {!viewOne ? (
          <>
            {toShow.length > 10 ? (
              <>
                <p>Please enter more characters</p>
              </>
            ) : toShow.length === 1 ? (
              <>
                <Country
                  country={countries.find((c) => c.name.common === toShow[0])}
                />
              </>
            ) : (
              <ul>
                {toShow.map((s) => {
                  return (
                    <li key={s}>
                      {s}
                      <button type="button" onClick={() => onClick(s)}>
                        view
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <>
            <Country country={country} />
            <button
              type="button"
              onClick={() => {
                setViewOne(false);
              }}
            >
              back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
