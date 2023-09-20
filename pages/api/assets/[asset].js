export const blockfrostAPIRequest = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BLOCKFROST_API_URL}/assets/${id}`, { method: "GET", headers: { project_id: `${process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY}` } });
        return await response.json();
    } catch (error) {
        return null;
    }
};

const assets = async function (req, res) {
    const { asset } = req.query;
    try {
        const data = await blockfrostAPIRequest(asset);
        return res.status(200).json({
            status: "Ok",
            data,
        });
    } catch (e) {
        return res.status(400).json({
            status: e.message,
            data: { duplicate: true },
        });
    }
};
export default assets;
