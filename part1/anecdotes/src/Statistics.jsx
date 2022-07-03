import StatisticList from "./StatisticList";

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + bad + neutral;
  const avg = sum ? (good * 1 + neutral * 0 + bad * -1) / sum : 0;
  const positive = (good * 100) / sum;
  return (
    <div>
      <h1>statistics</h1>
      <br />
      {sum ? (
        <table>
          <StatisticList text="good" value={good} />
          <StatisticList text="neutral" value={neutral} />
          <StatisticList text="bad" value={bad} />
          <StatisticList text="all" value={sum} />
          <StatisticList text="average" value={avg} />
          <StatisticList text="positve" value={positive} />
        </table>
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  );
};

export default Statistics;
