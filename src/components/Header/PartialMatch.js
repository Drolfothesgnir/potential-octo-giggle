import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

import { getMealsByPartialMatch } from '../../requests';
import { parseMeal } from '../../utils';

export default function PartialMatch({ controls }) {
  const {
    loadingControls: [loading, setLoading],
    mealControls: [, setMeals],
    errorControls: [, setError],
  } = controls;

  const [searchStr, setSearchStr] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    getMealsByPartialMatch(searchStr)
      .then((res) => res.json())
      .then((res) => {
        setMeals((res.meals || []).map(parseMeal));
        setError(null);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const changeHandler = (event) => {
    setSearchStr(event.target.value);
  };

  return (
    <Wrapper>
      <Box component="form" onSubmit={handleSubmit} className="form">
        <TextField
          required
          size="small"
          value={searchStr}
          onChange={changeHandler}
          sx={{ mr: 2 }}
          className="searchbar"
        />
        <Button
          size="large"
          variant="contained"
          disabled={loading}
          type="submit"
        >
          Search
        </Button>
      </Box>
    </Wrapper>
  );
}
const Wrapper = styled.div`
    @media (max-width: 767px) {
        .form {
            justify-content: center;
            flex-wrap: wrap;
            display: flex;

            .searchbar {
                margin-right: 0;
                margin-bottom: 1.5rem;
            }
        }
    }

    @media (min-width: 768px) {
        .form {

            .searchbar {
                margin-right:  1.5rem;
            }
        }
    }
`;
