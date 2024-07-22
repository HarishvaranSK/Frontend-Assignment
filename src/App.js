import Font from './fonts.json';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [arr, setArr] = useState({});
  const [selectedFont, setSelectedFont] = useState("ABeeZee");
  const [nav, setNav] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("400");
  const [text, setText] = useState("");
  const [savedFont, setSavedFont] = useState("");
  const [savedWeight, setSavedWeight] = useState("");

  useEffect(() => {
    
    if(localStorage.getItem('font')){
      setSelectedFont(localStorage.getItem('font'));
    }
    if(localStorage.getItem('weight')){
      setSelectedWeight(localStorage.getItem('weight'));
    }
    if(localStorage.getItem('text')){
      setText(localStorage.getItem('text'));
    }
    if(localStorage.getItem('nav')){
      setNav(localStorage.getItem('nav'));
    }
    setArr(Font);
  }, []);

  const handleSave = async () => {
    localStorage.setItem('font', selectedFont);
    localStorage.setItem('weight', selectedWeight);
    localStorage.setItem('text', text);
    localStorage.setItem('nav', true);
    await setSavedFont(selectedFont);
    await setSavedWeight(selectedWeight);
    setNav(true);
    loadFont(selectedFont, selectedWeight);
  };

  const loadFont = (font, weight) => {
    const fontUrl = arr[font][weight];
    const fontName = font.replace(/ /g, '_');
    const fontFace = `
      @font-face {
        font-family: '${fontName}';
        src: url('${fontUrl}') format('woff2');
        font-weight: ${weight};
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = fontFace;
    document.head.appendChild(style);
  };

  const styleVal = {
    fontFamily: savedFont.replace(/ /g, '_'),
    fontWeight: savedWeight
  };

  return (

    <div className="App" id='one'>
      <h1 style = {{fontSize : '50px'}}>SIMPLE TEXT EDITOR</h1>
      <center>
      <p>Here, You can enter the text, change the font and weight with italic and click save to view the result. Onclicking reset it will clear everything</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyItems: 'center' }}>
            <h1>Font</h1>
            <select style = {{height : '30px', fontSize : '20px'}} onChange={(e) => setSelectedFont(e.target.value)} value={selectedFont}>
              {
                Object.keys(arr).map((font, index) => (
                  <option key={index} value={font}>{font}</option>
                ))
              }
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyItems: 'center' }}>
            <h1>Variant</h1>
            <select style = {{height : '30px', fontSize : '20px'}} onChange={(e) => setSelectedWeight(e.target.value)} value={selectedWeight}>
              {
                arr[selectedFont] && Object.keys(arr[selectedFont]).map((weight, index) => (
                  <option key={index} value={weight}>{weight}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
          <textarea maxLength={100} style={{ width: '550px', height : '100px',  fontSize : '20px' }} placeholder='Type within 100 characters' onChange={(e) => setText(e.target.value)} value={text}>
          </textarea>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
          <button style = {{backgroundColor:'crimson', color : 'white', fontSize : '20px', borderRadius : '10px', cursor:'pointer', padding : '8px', border : '0px'}} onClick={() => { setText(""); setSelectedFont("ABeeZee"); setSelectedWeight("400"); setNav(false); localStorage.removeItem('font', selectedFont);
    localStorage.removeItem('weight');
    localStorage.removeItem('text');
    localStorage.removeItem('nav'); }}>Reset</button>
          <button style = {{backgroundColor:'crimson', color : 'white', fontSize : '20px', borderRadius : '10px', cursor:'pointer', padding : '8px', border : '0px'}} onClick={handleSave}>Save</button>
        </div>
        {nav ?
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', fontSize: '20px' }}>The Entered Text with Font {savedFont} and style of {savedWeight} is  :<h1 style={styleVal}> {text}</h1></div> : ''
        }
      </center>
    </div>
  );
}

export default App;
