import moment from "moment";
import { useCallback } from "react";
import { ADA_SYMBOL } from "../../../helpers/ada";
import Button from "../Button";

export const Quote = ({ action, quote, fetching, itemName, option, token }: { action?: any; quote: any; fetching: boolean; itemName: string; option?: any; token?: { name: string; decimals: number } }) => {
    const price = useCallback(() => {
        let price = quote?.price;
        if (!price) return "?";
        if (token?.decimals) {
            price = price / Math.pow(10, token.decimals);
        }
        return Number(price.toFixed(price < 50 ? 2 : 0)).toLocaleString();
    }, [token?.decimals, quote?.price]);

    if (fetching)
        return (
            <div className="flex flex-col items-center justify-center h-40">
                <progress className="progress progress-accent w-[80%] h-4"></progress>
            </div>
        );
    return (
        <div className="simple-card text-lg min-w-[400px]">
            {!!option && option}
            {itemName !== "MUTATION" && (
                <div className="flex justify-between">
                    <div className="text-gray-3">Portal Lock Time</div>
                    <div>
                        {fetching ? <span className="loading loading-spinner loading-sm"></span> : `${((quote?.time && moment.duration(`${quote?.time}`, "hours").asHours()) || 0).toFixed(0)}`}
                        {" Hrs"}
                    </div>
                </div>
            )}
            {price() !== "?" && (
                <div className="flex justify-between">
                    <div className="text-gray-3">Native token Fee</div>
                    <div>
                        {fetching ? <span className="loading loading-spinner loading-sm"></span> : price()} ${token?.name}
                    </div>
                </div>
            )}
            <div className="flex justify-between">
                <div className="text-gray-3">Mutation Fee</div>
                <div>
                    {fetching ? <span className="loading loading-spinner loading-sm"></span> : (quote?.fee || 0).toFixed(quote?.fee < 30 ? 2 : 0)} {ADA_SYMBOL}
                </div>
            </div>
            <Button
                onClick={() => {
                    action();
                }}
            >
                Mutate
            </Button>
        </div>
    );
};
