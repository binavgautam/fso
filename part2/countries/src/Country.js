import ForeCast from "./ForeCast";

export default function Country({ country }) {
  const getLanguages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital : {country.capital}</p>
      <p>Region : {country.region}</p>
      <div>
        <p>Languages :</p>
        <ul>
          {getLanguages.map((l) => {
            return <li key={l}>{l}</li>;
          })}
        </ul>
      </div>
      <h1>{country.flag}</h1>

      <ForeCast city={country.capital} />
    </div>
  );
}
