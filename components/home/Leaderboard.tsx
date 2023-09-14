import { leaderboard } from "../../helpers/mockData";

const Leaderboard = () => {
  return (
    <div className="card bg-base-100 shadow-xl w-auto ">
      <div className="card-body">
        <h2 className="card-title text-3xl">Leaderboard</h2>
        <div className="overflow-y-auto max-h-[580px]">
          <table className="table">
            <tbody>
              {leaderboard.map((item, index) => (
                <tr key={index}>
                  <td>{item.row}</td>
                  <td>{item.name}</td>
                  <td>{item.info1}</td>
                  <td>{item.info2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export { Leaderboard };
