import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getIngredients, getMealsById, getMealsByMainIngredient } from '../../requests';
import { parseMeal } from '../../utils';
import ErrorMessage from '../ErrorMessage';

export default function MainIngredient({ controls }) {
  const {
    ingredientControls: [ingredients, setIngredients],
    loadingControls: [loading, setLoading],
    mealControls: [, setMeals],
    errorControls: [, setError],
  } = controls;

  const [error, setLocalError] = React.useState(null);
  const [localLoading, setlocalLoading] = React.useState(false);

  React.useEffect(() => {
    if (ingredients.length) return;

    setlocalLoading(true);
    getIngredients().then((res) => res.json())
      .then((data) => {
        const list = data.meals.map((item) => ({ label: item.strIngredient }));
        setIngredients(list);
        setLocalError(null);
      })
      .catch(setLocalError)
      .finally(() => setlocalLoading(false));
  }, [ingredients.length, setIngredients]);

  const changeHandler = (_, selected) => {
    const value = selected?.label;
    if (!value) return;

    setLoading(true);
    getMealsByMainIngredient(value).then((res) => res.json())
      .then((data) => Promise.all(data.meals.map((meal) => getMealsById(meal.idMeal).then((res) => res.json()))))
      .then((arr) => arr.map((data) => data.meals[0]))
      .then((data) => {
        setMeals((data || []).map(parseMeal));
        setError(null);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const closeErrorHandler = () => {
    setLocalError(null);
  };

  if (ingredients.length) {
    return (
      <Autocomplete
        size="small"
        options={ingredients}
        renderInput={(params) => <TextField {...params} placeholder="Choose ingredient" />}
        sx={{ width: 300 }}
        onChange={changeHandler}
        disabled={loading}
      />
    );
  }

  if (localLoading) {
    return (
      <Box sx={{ display: 'flex', minWidth: 100, justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ErrorMessage message={error?.message} open={!!error} handleClose={closeErrorHandler} />
  );
}
