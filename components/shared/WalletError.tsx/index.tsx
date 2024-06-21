import { useWallet } from "@meshsdk/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { disconnect } from "../../../store/features/wallet/walletSlice";
import { useRouter } from "next/router";
import { Transaction } from "@meshsdk/core";
import { LOVELACE_MULTIPLIER, MIN_ADA } from "../../../helpers/ada";
import useProjectWallet from "../../hooks/useProjectWallet";
import { useMutated } from "../../../store/hooks";

export class QuoteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "QuoteError";
    }
}

const WalletError = ({ error, quote }: { error: any; quote: any }) => {
    const { setWalletError } = useProjectWallet();
    const dispatch = useDispatch();
    const router = useRouter();
    const { wallet, disconnect: disconnectWallet } = useWallet();
    const { tedsPolicyId, portalPolicyId, fluffAssetId } = useMutated();

    const unfrackWallet = useCallback(async () => {
        const tx = new Transaction({ initiator: wallet });
        if (!quote) return;

        const ada = quote.ada;
        const native = quote.native;
        const assets = (quote.assets || []).map((x: any) => x.asset);

        if (native > 0 || assets.length > 0) {
            const units = [
                ...(ada ? [{ unit: "lovelace", quantity: `${Math.round(ada * LOVELACE_MULTIPLIER) + MIN_ADA}` }] : [{ unit: "lovelace", quantity: `${MIN_ADA}` }]),
                ...(native ? [{ unit: fluffAssetId, quantity: `${native}` }] : []),
                ...(assets || []).map((asset: any) => ({ unit: asset, quantity: "1" })),
            ];
            tx.sendAssets(await wallet.getChangeAddress(), units);
        } else {
            tx.sendLovelace(await wallet.getChangeAddress(), `${Math.round(ada * LOVELACE_MULTIPLIER) + MIN_ADA}`);
        }

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        await wallet.submitTx(signedTx);

        setWalletError({ message: "The unfrack transaction has been sent - wait a few mins and try the transaction again" }, null);
    }, [wallet, quote, fluffAssetId, setWalletError]);

    const errorMessage = useCallback(() => {
        if (!error) return "";
        if (error.message) return error.message;
        if (`${error}`.includes("no account set")) return "No account set";
        if (`${error}`.includes("user declined tx")) return "You cancelled the transaction, are you sure?";
        return `${error}`;
    }, [error]);

    if (!error) return <></>;

    return (
        <dialog id="error_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Wallet Error</h3>
                <p className="py-4">{errorMessage()}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button
                            className="btn"
                            onClick={() => {
                                dispatch(disconnect());
                                disconnectWallet();
                                router.push("/");
                            }}
                        >
                            Disconnect
                        </button>
                        {!!quote && (
                            <button
                                className="btn"
                                onClick={() => {
                                    unfrackWallet();
                                }}
                            >
                                Unfrack
                            </button>
                        )}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
export default WalletError;
