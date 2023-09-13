import { useWallet } from "@meshsdk/react";
import {
  CraftingStatusEnum,
  useCraftingCampaign,
} from "@jetplane/velocity-tools";
import { useEffect } from "react";
import { Activity } from "../home/Activity";
import { Leaderboard } from "../home/Leaderboard";
import { CraftableMaterials } from "../home/CraftableMaterials";
import { Stats } from "../home/Stats";
import Layout from "../shared/Layout";

const Modifiers = () => {
  const { wallet, connected } = useWallet();
  const { campaignConfig, check, status } = useCraftingCampaign();

  useEffect(() => {
    console.log(wallet, connected, status);
    if (wallet && connected && status === CraftingStatusEnum.INIT) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connected]);

  console.log(campaignConfig);
  return (
    <Layout>
      {/* <Activity /> */}
      <div className="grid grid-cols-12 gap-5">
        {/* <Leaderboard />
        <CraftableMaterials />
        <Stats /> */}
      </div>
    </Layout>
  );
};

export default Modifiers;
