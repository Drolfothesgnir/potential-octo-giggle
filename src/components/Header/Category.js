import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getCategories, getMealsByCategory, getMealsById } from '../../requests';
import { parseMeal } from '../../utils';

export default function Category({ controls }) {
    const {
        categoryControls: [categories, setCategories],
        loadingControls: [loading, setLoading],
        mealControls: [, setMeals],
        errorControls: [, setError]
    } = controls;

    const [error, setLocalError] = React.useState(null);

    React.useEffect(() => {
        if (categories.length) return;

        getCategories().then(res => res.json())
            .then(data => {
                const list = data.meals.map(item => ({ label: item.strCategory }));
                setCategories(list);
                setLocalError(null);
            })
            .catch(setLocalError)
    }, [categories.length, setCategories]);

    const changeHandler = (_, selected) => {
        const value = selected?.label;
        if (!value) return;

        setLoading(true);
        getMealsByCategory(value).then(res => res.json())
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

    if (categories.length) return (
        <Autocomplete
            size="small"
            options={categories}
            renderInput={params => <TextField {...params} placeholder="Choose category" />}
            sx={{ width: 300 }}
            onChange={changeHandler}
            disabled={loading}
        />
    )

    if (error) return error.message;

    return (
        <Box sx={{ display: 'flex', minWidth: 100, justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}