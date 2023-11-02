import "./style.css";

export const LeaderBoard = ({ players }) => {
  return (
    <div className="container">
      <h3 className="title">Leader Board</h3>
      <ol className="list">
        {players.length > 0 &&
          players.map(({ id, name, point }) => {
            return (
              <li key={id}>
                <div>{name}</div>
                <div>{point}</div>
                <button>X</button>
              </li>
            );
          })}
      </ol>
    </div>
  );
};
