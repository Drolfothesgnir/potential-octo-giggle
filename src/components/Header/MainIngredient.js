import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getIngredients, getMealsById, getMealsByMainIngredient } from '../../requests';
import { parseMeal } from '../../utils';

export default function MainIngredient({ controls }) {
    const {
        ingredientControls: [ingredients, setIngredients],
        loadingControls: [loading, setLoading],
        mealControls: [, setMeals],
        errorControls: [, setError]
    } = controls;

    const [error, setLocalError] = React.useState(null);

    React.useEffect(() => {
        if (!ingredients.length) {
            getIngredients().then(res => res.json())
                .then(data => {
                    const list = data.meals.map(item => ({ label: item.strIngredient }));
                    setIngredients(list);
                    setLocalError(null);
                })
                .catch(setLocalError)
        }
    }, [])

    const changeHandler = (_, selected) => {
        const value = selected?.label;
        if (!value) {
            return;
        }

        setLoading(true);
        getMealsByMainIngredient(value).then(res => res.json())
        .then(data => {
            return Promise.all(data.meals.map(meal => getMealsById(meal.idMeal).then(res => res.json())))
        })
        .then(arr => arr.map(data => data.meals[0]))
        .then(data => {
            setMeals((data || []).map(parseMeal));
            setError(null);
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }

    if (ingredients.length) {
        return (
            <Autocomplete
                size="small"
                options={ingredients}
                renderInput={params => <TextField {...params} placeholder="Choose ingredient" />}
                sx={{ width: 300 }}
                onChange={changeHandler}
                disabled={loading}
            />
        )
    }

    if (error) {
        return (
            error.message
        )
    }

    return (
        <Box sx={{ display: 'flex', minWidth: 100, justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}