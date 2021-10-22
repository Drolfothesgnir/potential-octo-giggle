import React from 'react';

import Header from './components/Header/index';
import Table from './components/Table/Index';
import Form from './components/Form';
import ErrorMessage from './components/ErrorMessage';

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
    ingredientControls,
  };

  const [error, setError] = errorControls;

  const handleClose = () => {
    setError(null);
  };

  return (
    <>
      <Header controls={controls} />
      <Table controls={controls} />
      <Form controls={controls} />
      <ErrorMessage open={!!error} handleClose={handleClose} message={error?.message} />
    </>
  );
}

export default App;
