const Stats = () => {
  return (
    <div className="w-full my-4 space-x-5 grid grid-cols-4">
      <div className="card bg-base-100 shadow-xl w-auto">
        <div className="card-body text-center">
          <p className="text-4xl">0</p>
          <p>Crafts in progress</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl w-auto">
        <div className="card-body text-center">
          <p className="text-4xl">0</p>
          <p>Crafted items</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl w-auto">
        <div className="card-body text-center">
          <p className="text-4xl">0</p>
          <p>Items stolen</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl w-auto">
        <div className="card-body text-center">
          <p className="text-4xl">0</p>
          <p>Failed crafts</p>
        </div>
      </div>
    </div>
  );
};
export { Stats };
