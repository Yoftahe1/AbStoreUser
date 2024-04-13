import Offer from "./Offer";
import About from "./About";
import CardCarousel from "./CardCarousel";
import HomeCarousel from "./HomeCarousel";
import Categories from "./Categories";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <br />
      <Offer />
      <br />
      <CardCarousel title="New Products" />
      <br />
      <Categories />
      <br />
      <Banner/>
      <br />
      <CardCarousel title="Top Rated" />
      <br />
      <About />
    </div>
  );
};

export default Home;
