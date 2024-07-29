import { Asset } from "@meshsdk/core";
import { useAppDispatch, useAppSelector, useMutated } from "../../store/hooks";
import { refreshBalances, setError, setQuote, walletAssets, walletBalances } from "../../store/features/wallet/walletSlice";
import { useWallet } from "@meshsdk/react";

const useProjectWallet = () => {
    const { tedsPolicyId, portalPolicyId, fluffAssetId } = useMutated();
    const assets = useAppSelector(walletAssets) as Asset[];
    const balances = useAppSelector(walletBalances) as Asset[];
    const walletError = useAppSelector((state) => state.wallet.error);
    const quote = useAppSelector((state) => state.wallet.quote);
    const dispatch = useAppDispatch();
    const { wallet, connected } = useWallet();

    const fetchAsset = async (item: Asset) => {
        const asset = await fetch(`/api/assets/${item.unit}`);
        const response = await asset.json();

        if (response.status === "address-not-found" || response.data?.status_code === 404) {
            return null;
        }
        return response.data;
    };

    const fetchCachedAsset = async (item: Asset) => {
        const asset = await fetch(`/api/cache/${item.unit}`);
        const response = await asset.json();
        if (response.status === "address-not-found" || response.data?.status_code === 404) {
            return null;
        }
        return response.data;
    };

    const refresh = async () => {
        const promise = new Promise<void>(async (resolve) => {
            if (connected && wallet?.getBalance) {
                const balances = await wallet.getBalance();
                await dispatch(refreshBalances(balances));
                return resolve();
            }
        });

        return promise;
    };

    const verifyQuote = async (quote: any) => {
        if (!connected || !quote) return;
        const balances = await wallet.getBalance();
        if (quote?.price) {
            const angelsAssetId = "285b65ae63d4fad36321384ec61edfd5187b8194fff89b5abe9876da414e47454c53";
            if (quote?.currency === angelsAssetId) {
                const tokenBalance = parseInt(balances.find((x: any) => x.unit === angelsAssetId)?.quantity || "0");
                if (tokenBalance < quote.price / 6) {
                    throw new Error(`Insufficient $${"Angels"}`);
                }
            } else {
                const tokenBalance = parseInt(balances.find((x: any) => x.unit === fluffAssetId)?.quantity || "0");
                if (tokenBalance < quote.price) {
                    throw new Error(`Insufficient $${"Fluff"}`);
                }
            }
        }
        if (quote?.fee) {
            const adaBalance = parseInt(balances.find((x: any) => x.unit === "lovelace")?.quantity || "0");
            if (adaBalance < (quote.fee + 2) * 1000000) {
                throw new Error("Insufficient ADA");
            }
        }
        const collateralUtxos = await wallet.getCollateral();
        if (collateralUtxos.length === 0) {
            throw new Error("Please set up collateral first");
        }
    };

    const setWalletError = (error: any, quote?: any) => {
        dispatch(setError(error?.message || `${error}`));
        dispatch(setQuote(quote ?? null));
        if (error) (document?.getElementById("error_modal") as any)?.showModal();
    };

    return { fetchAsset, assets, balances, refresh, verifyQuote, walletError, quote, setWalletError, fetchCachedAsset };
};

export default useProjectWallet;
