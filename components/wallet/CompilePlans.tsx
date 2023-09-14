import Image from "next/image";
import { compilePlans } from "../../helpers/mockData";

const CompilePlans = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="card-title">Schematics</h2>
      <div className=" space-x-5 w-full">
        <div className="flex space-x-5 overflow-x-auto overflow-y-hidden pb-4 mb-4 rounded-2xl">
          {compilePlans.map((item, index) => (
            <div
              className=" bg-base-100 shadow-xl w-80 flex flex-col flex-shrink-0 rounded-xl select-none"
              key={index}
            >
              <figure className="w-25 h-25 ">
                <Image
                  className="rounded-t-xl"
                  src={item.image}
                  width={400}
                  height={400}
                  alt="Shoes"
                ></Image>
              </figure>
              <div className="flex flex-col justify-center text-sm text-neutral-content p-5 space-y-2">
                <div className="flex w-full justify-between text-2xl text-white">
                  <p>{item.name}</p>
                  <p>{item.attr}</p>
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
export { CompilePlans };
