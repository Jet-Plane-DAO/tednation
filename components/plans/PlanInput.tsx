import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";

const PlanInput = ({ item, selected, setSelected }: { item: any; selected: string; setSelected: any }) => {
    const [asset, setAsset] = useState<any>(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!asset && !fetching) {
            setFetching(true);
            const fetchAsset = async () => {
                const allocation = await fetch(`/api/assets/${item.unit}`);
                const response = await allocation.json();

                if (response.status === "address-not-found" || response.data?.status_code === 404) {
                    return;
                }
                setAsset(response.data);
            };
            fetchAsset();
        }
    }, [item, fetching, asset]);

    return (
        <div className={classNames("avatar hover:ring rounded-md cursor-pointer ring-primary ring-offset-base-100 ring-offset-2", selected === asset?.asset && "ring")} onClick={() => setSelected(item)}>
            {asset ? (
                <Image className="rounded-md" src={`https://ipfs.blockfrost.dev/ipfs/${(asset?.onchain_metadata?.image || "").replace("ipfs://", "")}`} width={100} height={100} alt="Loading" />
            ) : (
                <></>
                // <Image className="rounded-md" src="https://placekitten.com/100/100" width={100} height={100} alt="Loading" />
            )}
        </div>
    );
};

export { PlanInput };
