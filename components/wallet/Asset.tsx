import classNames from "classnames";
import Image from "next/image";

const WaletAsset = ({ item, action, locked }: { item: any; locked?: any; action: { action: any; status: any; label: any } | null }) => {
    const metadata = item?.onchain_metadata;
    return (
        <div className=" bg-base-100 shadow-xl w-80 flex flex-col flex-shrink-0 rounded-xl select-none " id={`${item?.unit}`}>
            <figure className="w-25 h-25 relative h-[300px]">
                {metadata ? (
                    <Image className={classNames("rounded-t-xl", locked !== undefined && 'grayscale', 'object-fill')}
                        style={{ objectFit: "cover" }} src={`https://ipfs.blockfrost.dev/ipfs/${(metadata?.image || "").replace("ipfs://", "")}`} width={400} height={400} alt="Teds"></Image>
                ) : (
                    <div className="flex h-full w-full justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
            </figure>
            <div className="flex flex-col justify-center text-sm text-neutral-content p-5 space-y-2">
                <div className="flex w-full justify-between text-2xl text-black">
                    <p>{metadata?.name || ""}</p>
                    {metadata && <p>{metadata?.role}</p>}
                </div>
                <p>{metadata?.stat}</p>
                <button onClick={() => action?.action(item)} className="btn" disabled={locked !== undefined}>
                    {action && action.label(locked)}
                </button>
            </div>
        </div>
    );
};
export { WaletAsset };
