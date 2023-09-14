import Image from "next/image";
import { craftableItems, myInventory } from "../../helpers/mockData";

const Inventory = () => {
  return (
    <div className="card bg-base-100 shadow-xl w-auto my-4 ">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">My Inventory</h2>
        <div className="overflow-y-auto max-h-[580px] grid grid-cols-4 gap-4 pr-4">
          {myInventory.map((item, index) => (
            <div className="card glass" key={index}>
              <figure>
                <Image src={item.image} alt="car!" width={300} height={300} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { Inventory };
