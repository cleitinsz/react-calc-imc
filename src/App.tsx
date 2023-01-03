import React, { useState } from 'react'
import './App.css'
import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateImc, Level } from './helpers/imc'
import GridItem from './components/GridItem'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null >(null)

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField))
    }
    else{
      alert('Digite todos os campos.')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className='main'>
      <header>
        <div className="headerContainer">
          <img src={poweredImage} alt="logo" width={150}/>
        </div>
      </header>
      <div className="container">
        <div className="leftSide">
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number" 
            placeholder='Digite a sua altura. Ex 1.8 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />
            <input 
            type="number" 
            placeholder='Digite o seu peso. Ex 75 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />

            <button onClick={handleCalculateButton}disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className="rightSide">
          {!toShow &&
            <div className="grid">
            {levels.map((item, index)=>(
              <GridItem key={index} item={item}/>
            ))}
          </div>
          }
          {toShow &&
            <div className="rightBig">
              <div className="rightArrow" onClick={handleBackButton}>
                <img src={leftArrowImage} alt="back" width={25}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App