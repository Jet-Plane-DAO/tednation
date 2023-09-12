import { useWallet } from "@meshsdk/react";
import { Nav } from "../shared/Nav";
import { CraftingStatusEnum, useCraftingCampaign } from "@jetplane/velocity-tools";
import { useEffect } from "react";

const Home = () => {
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
        <>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>
            <div>
                <h1>Home</h1>
            </div>
        </>
    );
};

export default Home;
