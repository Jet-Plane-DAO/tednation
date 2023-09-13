import { useWallet } from "@meshsdk/react";
import {
  CraftingStatusEnum,
  useCraftingCampaign,
} from "@jetplane/velocity-tools";
import { useEffect } from "react";
import Layout from "../shared/Layout";

const Wallet = () => {
  const { wallet, connected } = useWallet();
  const { campaignConfig, check, status } = useCraftingCampaign();

  useEffect(() => {
    console.log(wallet, connected, status);
    if (wallet && connected && status === CraftingStatusEnum.INIT) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connected]);

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

export default Wallet;
