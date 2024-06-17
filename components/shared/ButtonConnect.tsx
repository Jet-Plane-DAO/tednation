import { BrowserWallet, Wallet } from "@meshsdk/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectedWallet, selectWallet } from "../../store/features/wallet/walletSlice";
import { useWallet } from "@meshsdk/react";
import Button from "./Button";

const ButtonConnect: React.FC = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const connectedWallet = useAppSelector(selectedWallet);
    const { connected, connect, disconnect } = useWallet();
    const [connectedWalletData, setConnectedWalletData] = useState<Wallet | undefined>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const wallets = BrowserWallet.getInstalledWallets();
        setWallets(wallets);
    }, []);

    useEffect(() => {
        if (!connected && connectedWallet) {
            connect(connectedWallet);
        }
        if (connected && !connectedWallet) {
            disconnect();
        }
        if (connected && connectedWallet && !connectedWalletData) {
            setConnectedWalletData(wallets.find((x) => x.name === connectedWallet));
        }
    }, [connect, connected, connectedWallet, disconnect, connectedWalletData, wallets]);

    const connectWallet = (walletName: string | null) => {
        const elem: any = document.activeElement;
        if (elem) {
            elem?.blur();
        }
        dispatch(selectWallet(walletName));
    };

    return (
        <div className="gap-2">
            <div className="dropdown dropdown-end w-full">
                {!connected || !connectedWallet || !connectedWalletData ? (
                    <Button className="w-full">Connect</Button>
                ) : (
                    <button>
                        <div className="w-8 h-8">
                            <Image src={connectedWalletData.icon} width={20} height={20} alt={connectedWalletData.name} />
                        </div>
                    </button>
                )}

                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 space-y-2">
                    {!connected ? (
                        wallets?.map((wallet) => {
                            return (
                                <li key={wallet.name} className="flex">
                                    <div
                                        onClick={() => {
                                            return connectWallet(wallet.name);
                                        }}
                                    >
                                        <Image className="w-5 h-5" src={wallet.icon} width={20} height={20} alt={wallet.name} />
                                        {wallet.name}
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <li>
                            <a onClick={() => connectWallet(null)}>Disconnect</a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default ButtonConnect;
