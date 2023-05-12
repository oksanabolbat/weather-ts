import Footer from './components/Footer';
import MainView from './components/MainView';
function App() {
  return (
    <div
      className="container bg-light pt-5 pb-2 px-3 my-0 mx-auto rounded"
      style={{ maxWidth: '800px' }}
    >
      <h1 className="mb-5">Weather Forecast</h1>
      <MainView />
      <Footer />
    </div>
  );
}

export default App;
