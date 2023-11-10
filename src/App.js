import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";


function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
      <p style={{fontFamily:"'Noto Nastaliq Urdu', serif"}}>عدد كبير من الشهداء.. القصف الإسرائيلي يستهدف منزلين في مخيم جباليا</p>
      <p style={{fontFamily:"'Cairo', sans-serif"}}>عدد كبير من الشهداء.. القصف الإسرائيلي يستهدف منزلين في مخيم جباليا</p>
      <p style={{fontFamily:"'Reem Kufi Fun', sans-serif"}}>عدد كبير من الشهداء.. القصف الإسرائيلي يستهدف منزلين في مخيم جباليا</p>
    </div>
  );
}

export default App;
