import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `Transforming ideas into scalable, high-performance digital solutions using modern web technologies and AI-driven systems.`;

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <div className="w-full mt-4 flex flex-col items-center z-30">
        <AnimatedHeaderSection
          subTitle={"Where logic meets imagination, creation starts."}
          title={"Hari Haran"}
          text={text}
          textColor={"text-black"}
        />
      </div>
    </section>
  );
};

export default Hero;
