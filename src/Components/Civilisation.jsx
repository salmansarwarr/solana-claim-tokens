import MethaLogo1 from '../assets/Images/MethaLogo1.png';
import bg3 from '../assets/Images/bg3.jpg';


const Civilisation = () => {
    return (
        <section className="relative w-full h-[60vh] flex justify-center items-center gap-32 overflow-hidden">
            {/* Text and Logo */}
            <img src={MethaLogo1} alt="MethaLogo1" className="w-[200px] z-10" />
            <p className="text-2xl text-gray-700 font-[500] z-10">
                Civilization goes down. <br />
                $METH goes up.
            </p>

            {/* Background Image */}
            <img
                src={bg3}
                alt="Background"
                className="absolute top-[14%] right-0 w-[100px] object-contain z-0 transition-transform duration-500 ease-in-out"

            />

        </section>
    );
};

export default Civilisation;
