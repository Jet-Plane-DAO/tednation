const Hero = ({ title }: { title: string }) => {
  return (
    <div className="h-60 flex flex-col justify-end py-5">
      <h1 className="text-6xl">{title}</h1>
    </div>
  );
};
export { Hero };
