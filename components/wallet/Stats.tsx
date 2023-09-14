const Stats = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-base-100 rounded-2xl flex justify-between px-10 py-8 text-4xl">
        <p>234</p>
        <p>XP</p>
      </div>
      <div className="flex w-full justify-stretch space-x-4">
        <div className="bg-base-100 rounded-2xl w-full flex flex-col text-center px-10 py-8 text-4xl">
          <p>2</p>
          <p className="text-sm">In progress</p>
        </div>
        <div className="bg-base-100 rounded-2xl w-full flex flex-col text-center px-10 py-8 text-4xl">
          <p>22</p>
          <p className="text-sm">Other stat</p>
        </div>
      </div>
    </div>
  );
};
export { Stats };
