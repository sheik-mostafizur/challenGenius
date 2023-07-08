import Container from "../../components/Container";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
        <Container>
          <h1 className="mt-24 text-center text-5xl font-bold">Home</h1>
        </Container>
      </header>
    </div>
  );
};

export default Home;
