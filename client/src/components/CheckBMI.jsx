import React, { useState } from 'react';

function CheckBMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState('');

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // Convert height from cm to meters
    const bmiValue = weightInKg / (heightInM * heightInM);
    setBMI(bmiValue.toFixed(2)); // Round BMI to two decimal places
  };

  return (
    <div className='flex justify-between  items-center ml-[500px]'>
    <div >
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div>
          <h2>Your BMI: {bmi}</h2>
        </div>
      )}
    </div>
    </div>
  );
}

export default CheckBMI;
