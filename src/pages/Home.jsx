import introGraphic from "../assets/intro graphic.jpg";
import FadeInSection from "../components/FadeInSection";
import TextComponents from "../components/TextComponents";

export default function Home() {
  return (
    <>
      <FadeInSection>
        <TextComponents
          graphic={introGraphic}
          callToAction={"Start the quiz"}
          title={"Build a self care routine suitable for you"}
          paragraph={
            "Take our test to get a personalised self care routine based on your needs."
          }
        />
      </FadeInSection>
    </>
  );
}
