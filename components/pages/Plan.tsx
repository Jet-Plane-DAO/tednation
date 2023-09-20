import Image from "next/image";
import { PlanInput } from "../plans/PlanInput";
import { useEffect, useState } from "react";

interface PlanProps {
    plan: any;
    campaignInputs: any[];
    mintCampaign: {
        quote: any;
        campaignConfig: any;
        mint: any;
    };
}

const Plan = ({ plan, campaignInputs, mintCampaign: { quote, campaignConfig, mint } }: PlanProps) => {
    const [selected, setSelected] = useState<any>(null);
    const [fetchedQuote, setQuote] = useState<any>(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        setFetching(true);
        const promise = async () => {
            if (selected) setQuote(await quote(plan.id, [selected.unit], 1));
            setFetching(false);
        };
        promise();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <div key={plan.id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <Image src={plan.image.downloadURL} alt="Shoes" width={500} height={500} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{plan.name}</h2>
                {error && <p className="text-error">{error}</p>}
                {campaignInputs?.length > 0 && <p>Select a Jelly (it won&t leave your wallet)</p>}
                <div className="flex overflow-x-auto overflow-y-hidden w-full">
                    {campaignInputs.map((asset: any) => {
                        return (
                            <div className=" bg-base-100 m-3 shadow-xl w-20 flex flex-shrink-0 rounded-xl select-none" key={asset.unit}>
                                <PlanInput item={asset} selected={selected} setSelected={setSelected}></PlanInput>
                            </div>
                        );
                    })}
                </div>
                <p>{plan.description}</p>
                <div className="card-actions justify-between">
                    {fetching && <progress className="progress w-full"></progress>}
                    {fetchedQuote && !fetching && (
                        <>
                            <p>
                                {fetchedQuote?.quote?.price} ${campaignConfig.tokenName} + {fetchedQuote?.quote?.fee}A
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={async () => {
                                    try {
                                        setFetching(true);
                                        await mint(plan.id, [selected], 1);
                                    } catch (error: any) {
                                        setError(error.message);
                                    } finally {
                                        setFetching(false);
                                    }
                                }}
                            >
                                Mint
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Plan };
