import {Routes,Route} from "react-router-dom";
import HomePage from  "./pages/HomePage"
import About from  "./pages/About"
import Contact from  "./pages/Contact"
import Policy from  "./pages/Policy"
import Pagenotfound from  "./pages/Pagenotfound"

//helmet is used for Search engine optimaztion (SEO)


//app component me routes likhte hai
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<Pagenotfound/>}/>   {/*if no route matches then this route is executed*/}
    </Routes>
    </>
  );
}

export default App;
