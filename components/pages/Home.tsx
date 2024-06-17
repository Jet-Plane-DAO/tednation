import { useWallet } from "@meshsdk/react";
import { MintStatusEnum, useMintCampaign } from "@jetplane/velocity-tools";
import { useEffect } from "react";
import { Activity } from "../home/Activity";
import { Leaderboard } from "../home/Leaderboard";
import { CraftableMaterials } from "../home/CraftableMaterials";
import { Stats } from "../home/Stats";
import Layout from "../shared/Layout";
import ButtonConnect from "../shared/ButtonConnect";
import { useAppDispatch, useMutated } from "../../store/hooks";
import { initMutated } from "../../store/features/mutateds/mutatedSlice";
import { Assets } from "../wallet/Assets";

const Home = ({ summary }: { summary: any }) => {
    const { wallet, connected, connecting, connect } = useWallet();
    const { campaignConfig, check, status } = useMintCampaign("mutateds");
    const dispatch = useAppDispatch();
    const { tedsPolicyId, portalPolicyId } = useMutated();
    console.log(summary?.custom?.mutateds);
    useEffect(() => {
        dispatch(initMutated(summary?.custom?.mutateds));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [summary?.custom]);

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
            {connected && tedsPolicyId && <Assets policyId={"f5e0ac102d340294b96d49e5b4e3ff83cb4c4bfacbd3fa1f15cec2a0"} title={"Teds"} action={{ action: "craft", status: "READY", label: () => "Select" }} />}
            {/* {connected && portalPolicyId && <Assets policyId={portalPolicyId} title={"Portals"} action={{ action: "craft", status: "READY", label: () => "Select" }} />} */}
            <Activity />
            <div className="grid grid-cols-12 gap-5 h-[600px]">
                <div className="col-span-8"></div>
                <div className="col-span-4"></div>
            </div>
        </Layout>
    );
};

export default Home;
