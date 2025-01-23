import React from "react"
import Hero from "../Components/Hero"
import Civilisation from "../Components/Civilisation"
import TokenomicsSection from "../Components/Tokenomics"
import RoadmapSection from "../Components/Roadmap"


const Home = () => {
    return (
        <React.Fragment>
            <Hero />
            <Civilisation />
            <RoadmapSection />
            <TokenomicsSection />
        </React.Fragment>
    )
}

export default Home
