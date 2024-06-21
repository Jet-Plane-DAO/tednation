import Image from "next/image";

const WaletAsset = ({ item, action }: { item: any; action: { action: any; status: any; label: any } | null }) => {
    const metadata = item?.onchain_metadata;
    return (
        <div className=" bg-base-100 shadow-xl w-80 flex flex-col flex-shrink-0 rounded-xl select-none " id={`${item?.unit}`}>
            <figure className="w-25 h-25 relative h-[300px]">
                {metadata ? (
                    <Image unoptimized={true} className="rounded-t-xl" src={`https://ipfs.blockfrost.dev/ipfs/${(metadata?.image || "").replace("ipfs://", "")}`} width={400} height={400} alt="Shoes"></Image>
                ) : (
                    <div className="flex h-full w-full justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
            </figure>
            <div className="flex flex-col justify-center text-sm text-neutral-content p-5 space-y-2">
                <div className="flex w-full justify-between text-2xl text-white">
                    <p>{metadata?.name || "???"}</p>
                    {metadata && <p>{metadata?.role}</p>}
                </div>
                <p>{metadata?.stat}</p>
                <button onClick={() => action?.action(item)} className="btn">
                    {action && action.label(item)}
                </button>
            </div>
        </div>
    );
};
export { WaletAsset };
