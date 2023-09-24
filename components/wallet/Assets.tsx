import Image from "next/image";
import { myAssets } from "../../helpers/mockData";
import { useCraftingCampaign } from "@jetplane/velocity-tools";
import { useAssets } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { Asset } from "@meshsdk/core";
import useAsset from "../hooks/useAsset";
import { WaletAsset } from "./Asset";

const Assets = ({
  policyId,
  title,
  action: { action, status, label },
}: {
  policyId: string;
  title: string;
  action: any;
}) => {
  const assets = useAssets();
  const { fetchAsset } = useAsset();

  const [myAssets, setMyAssets] = useState<any>(null);

  useEffect(() => {
    if (assets && !myAssets?.length) {
      Promise.all(
        assets
          .filter((item: Asset) => item.unit.includes(policyId))
          .map((item: Asset) => fetchAsset(item))
      ).then((data) => {
        setMyAssets(data);
      });
    }
  }, [assets, fetchAsset, myAssets?.length, policyId]);

  return (
    <div className="w-full space-y-4">
      <h2 className="card-title">{title}</h2>
      <div className=" space-x-5 w-full">
        <div className="flex space-x-5 overflow-x-auto overflow-y-hidden pb-4 mb-4  rounded-2xl">
          {myAssets === null && (
            <WaletAsset item={null} action={null}></WaletAsset>
          )}
          {myAssets?.length === 0 && <p>No items found.</p>}
          {(myAssets || []).map(
            (
              { onchain_metadata: item }: { onchain_metadata: any },
              index: any
            ) => (
              <WaletAsset
                item={item}
                key={index}
                action={{ action, status, label }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
export { Assets };
