import { useCallback } from "react";

const useCraftableAsset = ({ craftingData }: { craftingData: any }) => {
  const craftingItemForAsset = useCallback(
    (asset: any) => {
      if (!craftingData) return null;
      return (craftingData?.crafts || []).find(
        (c: any) =>
          (c.inputs || []).map((x: any) => x.unit).includes(asset.unit) &&
          !c.claimedAt
      );
    },
    [craftingData]
  );

  const getCraftableAction = (item: any) => {
    const crafting = craftingItemForAsset(item);
    return {
      status: () => {
        if (!crafting) return "OK";
        if (crafting.claimsAt) return "Claimable";
        return "LOCKED";
      },
      action: (item: any) => {},
      label: (item: any) => {
        const crafting = craftingItemForAsset(item);
        if (!crafting) return "Craft";
        // TODO: Work out date
        if (crafting.claimsAt) return "Claim";
        return "Crafting..";
      },
    };
  };

  return { getCraftableAction };
};

export { useCraftableAsset };
