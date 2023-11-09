import Footer from "./components/footer";
import Header from "./components/header";


function App() {
  return (
    <div className="App">
      <Header/>
      <p style={{fontFamily:"'Noto Nastaliq Urdu', serif"}}>عدد كبير من الشهداء.. القصف الإسرائيلي يستهدف منزلين في مخيم جباليا</p>
      <p style={{fontFamily:"'Cairo', sans-serif"}}>عدد كبير من الشهداء.. القصف الإسرائيلي يستهدف منزلين في مخيم جباليا</p>
      <p style={{fontFamily:"'Reem Kufi Fun', sans-serif"}}>عدد كبير من الشهداء.. القصف الإسرائيلي يستهدف منزلين في مخيم جباليا</p>
      <Footer/>
    </div>
  );
}

export default App;
