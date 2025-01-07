
import { motion } from 'framer-motion';
import { Bomb, TrendingDown, Coins, Users, Globe } from 'lucide-react';

const RoadmapSection = () => {
    const phases = [
        {
            title: "Step 1",
            content: "Destroy humanity and collapse society.",
            icon: <Bomb className="w-6 h-6" />,
            color: "from-red-400 to-red-600"
        },
        {
            title: "Step 2",
            content: "Send everything to zero by crashing all global financial markets.",
            icon: <TrendingDown className="w-6 h-6" />,
            color: "from-orange-400 to-red-400"
        },
        {
            title: "Step 3",
            content: "Flip cash ($127 Trillion MC) with Methereum ($METH) to become new one world central digital currency.",
            icon: <Coins className="w-6 h-6" />,
            color: "from-blue-400 to-purple-600"
        },
        {
            title: "Step 4",
            content: "Replace global elite and world leaders with $METH head trillionaire clones.",
            icon: <Users className="w-6 h-6" />,
            color: "from-purple-400 to-pink-600"
        },
        {
            title: "Step 5",
            content: "Metha world domination",
            icon: <Globe className="w-6 h-6" />,
            color: "from-indigo-400 to-purple-600"
        }
    ];

    return (
        <div className=" min-h-screen py-16 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Roadmap
                    
                    </h2>
                    <p className='text-xl'>World Domination in 5 easy steps.
</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

                    {/* Phases */}
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative mb-12"
                        >
                            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8`}>
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-500 z-10" />

                                {/* Content card */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <motion.div
                                        className="bg-gray-300/40 backdrop-blur-lg rounded-xl border overflow-hidden"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="p-6">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${phase.color} mb-4`}>
                                                {phase.icon}
                                                <span className="ml-2">{phase.title}</span>
                                            </div>
                                            <p className="text-lg ">{phase.content}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadmapSection;