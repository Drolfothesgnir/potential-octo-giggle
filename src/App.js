import React from 'react';

import Header from './components/Header/index';
import Table from './components/Table/Index';
import Form from './components/Form';

function App() {

  const ingredientControls = React.useState([]);

  const categoryControls = React.useState([]);
 
  const mealControls = React.useState([]);

  const loadingControls = React.useState(false);

  const errorControls = React.useState(null);

  const controls = {
    mealControls,
    loadingControls,
    errorControls,
    categoryControls,
    ingredientControls
  }

  return (
    <>
      <Header controls={controls} />
      <Table controls={controls} />
      <Form controls={controls} />
      {errorControls[0]?.message}
    </>
  );
}

export default App;
