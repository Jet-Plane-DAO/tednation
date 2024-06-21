import { useWallet } from "@meshsdk/react";
import { MintStatusEnum, UTXOStrategy, useMintCampaign } from "@jetplane/velocity-tools";
import { useCallback, useEffect, useState } from "react";
import Layout from "../shared/Layout";
import ButtonConnect from "../shared/ButtonConnect";
import { useAppDispatch, useMutated } from "../../store/hooks";
import { initMutated } from "../../store/features/mutateds/mutatedSlice";
import { Assets } from "../wallet/Assets";
import { LoadingState } from "../shared/LoadingState";
import { WaletAsset } from "../wallet/Asset";
import { Quote } from "../shared/Quote";
import useProjectWallet from "../hooks/useProjectWallet";
import WalletError from "../shared/WalletError.tsx";

enum MintStepEnum {
    INIT = "INIT",
    TED = "TED",
    PORTAL = "PORTAL",
    PAYMENT = "PAYMENT",
    CONFIRM = "CONFIRM",
    DONE = "DONE",
}

const Mutateds = ({ summary }: { summary: any }) => {
    const [quoteResponse, setQuoteResponse] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [fetching, setFetching] = useState(false);
    const [useFluff, setUseFluff] = useState(false);
    const [buildingTxn, setBuildingTxn] = useState(false);
    const { wallet, connected, connecting, connect } = useWallet();
    const [step, setStep] = useState<MintStepEnum>(MintStepEnum.INIT);
    const { campaignConfig, check, status, quote, mint } = useMintCampaign("mutateds");
    const dispatch = useAppDispatch();
    const { tedsPolicyId, portalPolicyId, fluffAssetId } = useMutated();
    const { verifyQuote, setWalletError, walletError } = useProjectWallet();
    const [ted, setTed] = useState<any>(null);
    const [portal, setPortal] = useState<any>(null);

    useEffect(() => {
        dispatch(initMutated(summary?.custom?.mutateds));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [summary?.custom]);

    useEffect(() => {
        if (connected && tedsPolicyId) {
            setStep(MintStepEnum.TED);
        }
    }, [connected, tedsPolicyId]);

    useEffect(() => {
        if (wallet && connected && status === MintStatusEnum.INIT) {
            check();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    useEffect(() => {
        if (!!ted && !!portal) {
            setQuoteResponse(null);
            setFetching(true);
            setError(null);
            quote("mutateds", [ted.asset, portal.asset], 1, useFluff ? 1 : 0)
                .then((response: any) => {
                    setQuoteResponse(response?.quote);
                    setFetching(false);
                })
                .catch((e: any) => {
                    setError(e.message || e);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ted, portal, useFluff]);

    const selectTed = useCallback(
        (ted: any) => {
            setTed(ted);
            if (!portal) setStep(MintStepEnum.PORTAL);
            else setStep(MintStepEnum.PAYMENT);
        },
        [setTed, setStep, portal]
    );

    const selectPortal = useCallback(
        (portal: any) => {
            setPortal(portal);
            setStep(MintStepEnum.PAYMENT);
        },
        [setPortal, setStep]
    );

    if (!connected && !connecting) {
        return (
            <Layout title="Connect Wallet">
                <div className="flex justify-center items-center h-[600px]">
                    <ButtonConnect />
                </div>
            </Layout>
        );
    }
    if (!connected && connecting) {
        return (
            <Layout title="Connecting Wallet">
                <div className="flex justify-center items-center h-[600px]">
                    <LoadingState />
                </div>
            </Layout>
        );
    }
    return (
        <Layout title="Mutateds">
            <div className="flex w-full">
                {step === MintStepEnum.TED && <Assets policyId={tedsPolicyId} title={"Select Ted to Mutate"} action={{ action: selectTed, status: "READY", label: () => "Select" }} />}
                {step === MintStepEnum.PORTAL && <Assets policyId={portalPolicyId} title={"Select Portal"} action={{ action: selectPortal, status: "READY", label: () => "Select" }} />}
            </div>
            <div className="flex w-full space-x-2 justify-center">
                {ted && (
                    <div className="card space-y-4">
                        <h2 className="card-title">Selected Ted</h2>
                        <WaletAsset
                            item={ted}
                            key={"ted"}
                            action={{
                                action: () => {
                                    setTed(null);
                                    setStep(MintStepEnum.TED);
                                },
                                status: "READY",
                                label: () => "Cancel",
                            }}
                        />
                    </div>
                )}
                {portal && (
                    <div className="card space-y-4">
                        <h2 className="card-title">Selected Portal</h2>
                        <WaletAsset
                            item={portal}
                            key={"portal"}
                            action={{
                                action: () => {
                                    setPortal(null);
                                    setStep(MintStepEnum.PORTAL);
                                },
                                status: "READY",
                                label: () => "Cancel",
                            }}
                        />
                    </div>
                )}
            </div>
            {step === MintStepEnum.PAYMENT && (
                <div className="flex justify-center items-center">
                    <div className="card min-w-[400px]">
                        <label className="cursor-pointer label">
                            <span className="label-text">
                                Pay 5A in <span className="text-green-500">$Fluff</span>
                            </span>
                            <input type="checkbox" className="toggle" checked={useFluff} onChange={() => setUseFluff(!useFluff)} />
                        </label>

                        <Quote
                            itemName={"Mutation"}
                            fetching={fetching}
                            quote={quoteResponse}
                            action={async () => {
                                setBuildingTxn(true);
                                try {
                                    await verifyQuote(quoteResponse);
                                    await mint(
                                        "mutateds",
                                        [
                                            {
                                                unit: ted?.asset,
                                                policyId: tedsPolicyId,
                                                quantity: "1",
                                            },
                                            {
                                                unit: portal?.asset,
                                                policyId: portalPolicyId,
                                                quantity: "1",
                                            },
                                        ],
                                        1,
                                        useFluff ? 1 : 0
                                    );
                                    setTed(null);
                                    setPortal(null);
                                } catch (e) {
                                    console.log(e);
                                    setWalletError(e, { ada: quoteResponse.fee, native: quoteResponse.price, assets: [{ ted, portal }] });
                                    return;
                                }

                                setStep(MintStepEnum.CONFIRM);
                            }}
                        />
                    </div>
                </div>
            )}
            {step === MintStepEnum.CONFIRM && (
                <div className="flex justify-center items-center">
                    <div className="card min-w-[400px]">
                        <p>Your ted has been sent through the portal - your Mutated will appear in your wallet in a few minutes.</p>
                        <button
                            className="btn"
                            onClick={() => {
                                setStep(MintStepEnum.TED);
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
            <WalletError error={walletError} quote={quote} />
        </Layout>
    );
};

export default Mutateds;
