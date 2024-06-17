import { useWallet } from "@meshsdk/react";
import { MintStatusEnum, useMintCampaign } from "@jetplane/velocity-tools";
import { useEffect } from "react";
import { Activity } from "../home/Activity";
import { Leaderboard } from "../home/Leaderboard";
import { CraftableMaterials } from "../home/CraftableMaterials";
import { Stats } from "../home/Stats";
import Layout from "../shared/Layout";
import ButtonConnect from "../shared/ButtonConnect";

const Home = () => {
    const { wallet, connected, connecting, connect } = useWallet();
    const { campaignConfig, check, status } = useMintCampaign("mutateds");

    useEffect(() => {
        if (wallet && connected && status === MintStatusEnum.INIT) {
            check();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    if (!connected && !connecting) {
        return (
            <Layout title="Connect Wallet">
                <div className="flex justify-center items-center h-[600px]">
                    <ButtonConnect />
                </div>
            </Layout>
        );
    }
    return (
        <Layout title="Mutateds">
            <Activity />
            <div className="grid grid-cols-12 gap-5 h-[600px]">
                <div className="col-span-8"></div>
                <div className="col-span-4"></div>
            </div>
        </Layout>
    );
};

export default Home;
