import Hero from "./Components/Hero";
import Civilisation from "./Components/Civilisation";
import RoadmapSection from "./Components/Roadmap";
import TokenomicsSection from "./Components/Tokenomics";

export default function Home() {
    return (
        <>
            <Hero />
            <Civilisation />
            <RoadmapSection />
            <TokenomicsSection />
        </>
    );
}
