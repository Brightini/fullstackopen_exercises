import { useState } from "react";

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.goodCount} />
        <StatisticLine text="neutral" value={props.neutralCount} />
        <StatisticLine text="bad" value={props.badCount} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine
          text="positive"
          value={props.percentage}
          isPercent={true}
        />
      </tbody>
    </table>
  );
};

const StatisticLine = (props) => {
  const displayValue = props.isPercent ? `${props.value} %` : props.value;
  return (
    <tr>
      <td>{props.text}</td>
      <td>{displayValue}</td>
    </tr>
  );
};

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [total, setTotal] = useState(0);

  const updateFeedbackCount = (type) => {
    let newGoodCount = goodCount;
    let newNeutralCount = neutralCount;
    let newBadCount = badCount;

    if (type === "good") setGoodCount((newGoodCount += 1));
    else if (type === "neutral") setNeutralCount((newNeutralCount += 1));
    else if (type === "bad") setBadCount((newBadCount += 1));

    const total = newGoodCount + newNeutralCount + newBadCount;

    setTotal(total);
    setAverage(
      (newGoodCount * 1 + newNeutralCount * 0 + newBadCount * -1) / total
    );
    setPercentage((newGoodCount / total) * 100);
  };

  return (
    <>
      <Header text="give feedback" />
      <Button onClick={() => updateFeedbackCount("good")} text="Good" />
      <Button onClick={() => updateFeedbackCount("neutral")} text="Neutral" />
      <Button onClick={() => updateFeedbackCount("bad")} text="Bad" />
      <Header text="statistics" />
      {total > 0 ? (
        <Statistics
          goodCount={goodCount}
          neutralCount={neutralCount}
          badCount={badCount}
          total={total}
          average={average}
          percentage={percentage}
        />
      ) : (
        <div>No feedback given</div>
      )}
    </>
  );
}

export default App;
