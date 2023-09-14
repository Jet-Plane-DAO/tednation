import Image from "next/image";
import { activity } from "../../helpers/mockData";

const Activity = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="card-title">Activity</h2>
      <div className=" space-x-5 w-full">
        <div className="flex space-x-5 overflow-x-auto overflow-y-hidden scrollbar-hide">
          {activity.map((item, index) => (
            <div
              className=" bg-base-100 shadow-xl w-80 flex flex-shrink-0 rounded-xl select-none"
              key={index}
            >
              <figure className="w-25 h-25 ">
                <Image
                  className="rounded-l-xl"
                  src={item.image}
                  width={100}
                  height={100}
                  alt="Shoes"
                ></Image>
              </figure>
              <div className="flex flex-col justify-center ml-4 text-sm text-neutral-content">
                <p>{item.name}</p>
                <p className="text-white">{item.action}</p>
                <p>{item.time}</p>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { Activity };
