import moment from 'moment'
import { useCallback } from 'react'
import { ADA_SYMBOL } from '../../../helpers/ada';
import Button from '../Button';

export const Quote = ({ action, quote, fetching, itemName }: { action?: any; quote: any; fetching: boolean; itemName: string }) => {

    const faction = { decimals: 0, nativeTokenName: 'JFuel' }

    const price = useCallback(() => {
        let price = quote?.price
        if (!price) return '?'
        if (faction?.decimals) {
            price = price / Math.pow(10, faction.decimals)
        }
        return Number(price.toFixed(price < 50 ? 2 : 0)).toLocaleString()
    }, [faction.decimals, quote?.price])

    if (fetching)
        return (
            <div className="flex flex-col items-center justify-center h-40">
                <progress className="progress w-[80%] h-4"></progress>
            </div>
        )
    return (
        <div className="simple-card text-lg min-w-[400px]">
            {itemName !== 'MUTATION' && (
                <div className="flex justify-between">
                    <div className="text-gray-3">Portal Lock Time</div>
                    <div>
                        {fetching ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            `${((quote?.time && moment.duration(`${quote?.time}`, 'hours').asHours()) || 0).toFixed(1)}`
                        )}
                        {' Hrs'}
                    </div>
                </div>
            )}
            <div className="flex justify-between">
                <div className="text-gray-3">Native token Fee</div>
                <div>
                    {fetching ? <span className="loading loading-spinner loading-sm"></span> : price()} ${faction.nativeTokenName}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="text-gray-3">Mutation Fee</div>
                <div>
                    {fetching ? <span className="loading loading-spinner loading-sm"></span> : (quote?.fee || 0).toFixed(quote?.fee < 30 ? 2 : 0)} {ADA_SYMBOL}
                </div>
            </div>
            <Button onClick={() => { console.log('test') }}>Mutate</Button>
        </div>
    )
}
