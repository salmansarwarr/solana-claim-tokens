

const TokenomicsSection = () => {
    const tokenomicsData = [
        {
            title: 'Supply',
            items: [
                { label: 'Supply', value: '21m' },
                { label: 'Blockchain', value: 'Sol' },
                { label: 'Liq Locked', value: '' },
                { label: 'Max Wallet', value: '2%' },
            ],
            gradientClass: 'bg-gradient-to-br from-pink-100 to-purple-100',
        },
        {
            title: 'LP & Tax',
            items: [
                { label: 'LP', value: '48%' },
                { label: 'V1', value: '10%' },
                { label: 'Burned', value: '9%' },
                { label: 'Team', value: '10%' },
                { label: 'Treasury', value: '23%' },
            ],
            gradientClass: 'bg-gradient-to-br from-purple-100 to-blue-100',
        },
        {
            title: 'Tax Info',
            items: [
                { label: 'Tax', value: '3/3' },
                { label: 'LP', value: '1%' },
                { label: 'Dev', value: '1%' },
                { label: 'Prize Pool', value: '1%' },
            ],
            gradientClass: 'bg-gradient-to-br from-red-50 to-pink-100',
        },
    ];

    const CategoryCard = ({ title, items, gradientClass }) => (
        <div className={`${gradientClass} rounded-3xl p-6 shadow-lg backdrop-blur-sm`}>
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">{title}</h3>
            <div className="space-y-2">
                {items.map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                        <span className="text-sm md:text-base text-gray-600">{label}</span>
                        <span className="text-sm md:text-base font-medium text-gray-800">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full bg-white py-8 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Tokenomics</h2>
                <p className="text-sm md:text-lg text-center mb-8 text-gray-600">0x0012345232323223</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {tokenomicsData.map(({ title, items, gradientClass }) => (
                        <CategoryCard key={title} title={title} items={items} gradientClass={gradientClass} />
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 bg-[#f1f4f7] p-6 sm:p-10 w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        Dextools
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        Website Chart
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        CMC
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TokenomicsSection;
