import { useWallet } from "@meshsdk/react";
import {
  CraftingStatusEnum,
  useCraftingCampaign,
} from "@jetplane/velocity-tools";
import { useEffect } from "react";
import Layout from "../shared/Layout";
import { Assets } from "../wallet/Assets";
import { Inventory } from "../wallet/Inventory";
import { History } from "../wallet/History";
import { CompilePlans } from "../wallet/CompilePlans";
import { Stats } from "../wallet/Stats";

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
    <Layout title="My Adventure">
      {/* <Activity /> */}
      <div className="grid grid-cols-12 gap-5 h-[600px]">
        <div className="col-span-9 mt-4">
          <Assets />
          <Inventory />
          <CompilePlans />
        </div>
        <div className="col-span-3 my-10">
          <Stats />
          <History />
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
