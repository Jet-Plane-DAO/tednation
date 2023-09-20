import { useAssets, useWallet } from "@meshsdk/react";
import { CraftingStatusEnum, MintStatusEnum, useCraftingCampaign, useMintCampaign } from "@jetplane/velocity-tools";
import { useCallback, useEffect, useState } from "react";
import { Activity } from "../home/Activity";
import { Leaderboard } from "../home/Leaderboard";
import { CraftableMaterials } from "../home/CraftableMaterials";
import { Stats } from "../home/Stats";
import Layout from "../shared/Layout";
import { config } from "../../helpers/config";
import Image from "next/image";
import { PlanInput } from "../plans/PlanInput";
import { Plan } from "./Plan";

const Plans = () => {
    const { wallet, connected } = useWallet();
    const assets = useAssets();
    const { campaignConfig, check, status, quote: fetchQuote, mint } = useMintCampaign("schematics");

    useEffect(() => {
        if (wallet && connected && status === MintStatusEnum.INIT) {
            check();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    const campaignInputs = useCallback(() => {
        if (!assets?.length || !campaignConfig?.inputs) return [];
        const inputs = [];

        for (const input of campaignConfig.inputs) {
            inputs.push(...assets.filter((asset: any) => asset.policyId === input.policyId));
        }
        return inputs;
    }, [assets, campaignConfig?.inputs]);

    const plans = useCallback(() => {
        if (status === MintStatusEnum.INIT) {
            return <p>Warming up..</p>;
        }
        if (status === MintStatusEnum.CHECKING) {
            return <progress className="progress w-56"></progress>;
        }
        if (status === MintStatusEnum.READY) {
            if (campaignConfig?.plans.length === 0) {
                return <h1 className="text-2xl font-bold">No schematics available.</h1>;
            }
            return campaignConfig.plans.map((plan: any) => {
                return <Plan key={plan.id} plan={plan} campaignInputs={campaignInputs()} mintCampaign={{ quote: fetchQuote, campaignConfig, mint }} />;
            });
        }
    }, [status, campaignConfig, campaignInputs, fetchQuote, mint]);
    return (
        <Layout title={config.plansTitle}>
            <div className="p-10 w-full flex justify-center">{plans()}</div>
        </Layout>
    );
};

export default Plans;
