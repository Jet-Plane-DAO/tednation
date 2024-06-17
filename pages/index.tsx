import Home from "../components/pages/Home";
export default Home;

export async function getStaticProps() {
    /* Fetch data here */
    const requestHeaders: HeadersInit = new Headers();

    requestHeaders.set("jetplane-api-key", process.env.NEXT_PUBLIC_VELOCITY_API_KEY ?? "");
    const res = await fetch(`${process.env.NEXT_PUBLIC_VELOCITY_API}/summary`, {
        method: "GET",
        headers: requestHeaders,
    });
    const summary = await res.json();

    return {
        props: {
            summary,
        },
        revalidate: 5 * 60,
    };
}
