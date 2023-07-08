import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Button
          handleClick={() => {
            console.log("clicked");
          }}
          text="Button"
          className="rounded-full"
          type="submit"
          rounded={true}
        />
      </div>
    </>
  );
};

export default Home;
