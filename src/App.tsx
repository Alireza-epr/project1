import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="app-wrapper">
        <header className="app-header">
          <Header />
        </header>
        <main className="app-main">
          <Sidebar />
          <Map />
        </main>
      </div>
    </>
  );
};

export default App;
