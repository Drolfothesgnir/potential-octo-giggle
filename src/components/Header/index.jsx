import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

import PartialMatch from './PartialMatch';
import Category from './Category';
import MainIngredient from './MainIngredient';

const PARTIAL_MATCH = 0;
const CATEGORY = 1;
const MAIN_INGREDIENT = 2;

export default function Header({ controls }) {
  const [filterType, setFilterType] = React.useState(PARTIAL_MATCH);
  const handleChange = (e) => setFilterType(+e.target.value);
  let filter = null;
  switch (filterType) {
    case PARTIAL_MATCH:
      filter = <PartialMatch controls={controls} />;
      break;

    case CATEGORY:
      filter = <Category controls={controls} />;
      break;

    case MAIN_INGREDIENT:
      filter = <MainIngredient controls={controls} />;
      break;

    default:
      break;
  }

  return (
    <AppBar sx={{ p: 2, bgcolor: 'common.white' }} position="static">
      <Wrapper>
        <Toolbar className="toolbar">
          <Typography color="primary" variant="h5" className="label">
            Filter meals by
          </Typography>
          <Box className="filter-select">
            <FormControl>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterType}
                onChange={handleChange}
              >
                <MenuItem value={PARTIAL_MATCH}>Name with partial match</MenuItem>
                <MenuItem value={CATEGORY}>Category</MenuItem>
                <MenuItem value={MAIN_INGREDIENT}>Main ingredient</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {filter}
        </Toolbar>
      </Wrapper>
    </AppBar>
  );
}

const Wrapper = styled.div`
    @media (max-width: 767px) {
        .toolbar {
            flex-wrap: wrap;

            > *, .MuiFormControl-root  {
                width: 100%;
            }

            .label, .filter-select {
                margin-bottom: 1.5rem;
            }
        }
    }

    @media (min-width: 768px) {
       .label, .filter-select {
           margin-right: 1.5rem;
       }
    }
`;
