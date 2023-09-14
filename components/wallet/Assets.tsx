import Image from "next/image";
import { myAssets } from "../../helpers/mockData";

const Assets = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="card-title">My Adventurers</h2>
      <div className=" space-x-5 w-full">
        <div className="flex space-x-5 overflow-x-auto overflow-y-hidden pb-4 mb-4  rounded-2xl">
          {myAssets.map((item, index) => (
            <div
              className=" bg-base-100 shadow-xl w-80 flex flex-col flex-shrink-0 rounded-xl select-none "
              key={index}
            >
              <figure className="w-25 h-25 relative h-[300px]">
                <Image
                  className="rounded-t-xl"
                  src={item.image}
                  fill={true}
                  alt="Shoes"
                ></Image>
              </figure>
              <div className="flex flex-col justify-center text-sm text-neutral-content p-5 space-y-2">
                <div className="flex w-full justify-between text-2xl text-white">
                  <p>{item.name}</p>
                  <p>{item.xp}XP</p>
                </div>
                <p>{item.stat}</p>
                <button className="btn">Craft</button>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { Assets };
