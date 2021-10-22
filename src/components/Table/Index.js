
import React from 'react';
import styled from '@emotion/styled';
import Pagination from '@mui/material/Pagination';
import Row from './Row';

export default function Table({ controls }) {
    const { mealControls: [meals] } = controls;
    const pageSize = 10;
    const [page, setPage] = React.useState(0);
    const list = meals.slice(page * pageSize, pageSize * (page + 1));

    return (
        <Wrapper>
            {list.map(item => <Row row={item} key={item.name} />)}
            {list.length ? (
                <div className="pagination-wrapper">
                    <Pagination
                        className="pagination"
                        page={page + 1}
                        onChange={(_, value) => setPage(value - 1)}
                        count={Math.ceil(meals.length / pageSize)}

                    />
                </div>
            ) : null}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    flex: 1;
    padding-top: 3rem;

    .pagination-wrapper {
        padding: 1rem 0;
        display: flex;
        justify-content: center;
    }
`;