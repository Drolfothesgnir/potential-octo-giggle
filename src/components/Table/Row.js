import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import styled from '@emotion/styled';

export default function Row({ row }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Wrapper>
            <header>
                <div className="img-wrapper">
                    <img src={row.thumbnail} />
                </div>
                <IconButton
                    className="toggle"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Typography variant="h6" className="name">
                    {row.name}
                </Typography>
            </header>
            <Collapse in={open} className="collapse">
                <div className="description">
                    <Typography variant="h6" className="label">
                        Description
                    </Typography>
                    <Typography variant="body1">
                        {row.description}
                    </Typography>
                    <Typography variant="h6" className="label">
                        Ingredients
                    </Typography>
                    <Typography variant="body1">
                        {row.ingredients}
                    </Typography>
                </div>
            </Collapse>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 32px 32px;
    border-bottom: 1px solid #e0e0e0;

    header {
        .toggle {
            margin-right: 1rem;
            display: inline-block;
        }

        .name {
            display: inline-block;
        }

        .img-wrapper {
            width: 80vw;
            height: 80vw;
            margin: 0 auto 1rem;

            img {
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 50%;
                object-fit: cover;
            }
        }
    }

    .description  {
        padding: 0 1rem;

        .label {
            padding: 2rem 0 1rem;
        }
    }

    @media (min-width: 768px) {
        padding: 2rem 40px;

        header {
            display: flex;
            align-items: center;

            .img-wrapper {
                width: 100px;
                height: 100px;
                margin: 0 calc(5px + 1rem) 0 0;
                order: 1;
            }

            .togle {
                order: 0;
            }

            .name {
                order: 2;
            }
        }

        .description  {
            padding: 0 3rem;
        }
    }
`;