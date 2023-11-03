import "./style.css";

export const LeaderBoard = ({ players }) => {
  const uniquePlayers = new Set(players);

  const sortedPlayers = [...uniquePlayers].sort(
    (firstPlayer, secondPlayer) => secondPlayer.point - firstPlayer.point
  );

  return (
    <div className="container">
      <h3 className="title">Leader Board</h3>
      <ol className="list">
        {sortedPlayers.length > 0 &&
          sortedPlayers.map(({ id, name, point }) => {
            return (
              <li key={id}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>{name}</div>
                  <div>score: {point}</div>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};
