import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../layout/Navigator';

const HomePage = (): JSX.Element => (
  <>
    <Header />
    <Navigator />
    <main style={{ flex: 1 }}>
      <h1>Home</h1>
    </main>
    <Footer />
  </>
);

export default HomePage;
