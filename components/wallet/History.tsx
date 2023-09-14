import Image from "next/image";
import { leaderboard, myHistory } from "../../helpers/mockData";

const History = () => {
  return (
    <div className="card bg-base-100 shadow-xl w-auto mt-4">
      <div className="card-body">
        <h2 className="card-title text-3xl">History</h2>
        <div className="overflow-y-auto max-h-full flex flex-col space-y-4">
          {myHistory.map((item, index) => (
            <div key={index} className="flex space-x-4">
              <Image
                src={item.image}
                width={50}
                height={50}
                className="rounded-xl"
                alt={item.action}
              ></Image>
              <div>
                <p>{item.action}</p>
                <p>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { History };
