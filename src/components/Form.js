import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export default function Form({ controls }) {

    const { mealControls: [, setMeals] } = controls;

    const [{
        name,
        description,
        ingredients,
        photo
    }, setValues] = React.useState({
        name: '',
        ingredients: '',
        description: '',
        photo: ''
    });

    const [dataURL, setDataURL] = React.useState(null);

    const changeHandler = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const fileChangeHandler = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setDataURL(reader.result);
            }
            changeHandler(event);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const recipe = {
            name,
            description,
            ingredients,
            thumbnail: dataURL,
        }

        setMeals(prev => ([recipe, ...prev]));
    }

    return (
        <Wrapper>
            <Typography variant="h5" >
                Add new recipe
            </Typography>
            <Box component="form" className="box-form" onSubmit={submitHandler}>
                <TextField
                    name="name"
                    value={name}
                    onChange={changeHandler}
                    placeholder="Name of meal"
                    className="input"
                    required
                    size="small"
                    inputProps={{
                        maxLength: 100
                    }}
                />
                <TextField
                    name="description"
                    value={description}
                    onChange={changeHandler}
                    placeholder="Description"
                    className="input"
                    required
                    size="small"
                    multiline
                    rows={4}
                    inputProps={{
                        maxLength: 2000
                    }}
                />
                <TextField
                    name="ingredients"
                    value={ingredients}
                    onChange={changeHandler}
                    placeholder="Ingredients"
                    className="input"
                    required
                    size="small"
                    multiline
                    rows={4}
                    inputProps={{
                        maxLength: 2000
                    }}
                />
                <Input
                    type="file"
                    name="photo"
                    size="small"
                    className="input"
                    required
                    placeholder="photo"
                    value={photo}
                    onChange={fileChangeHandler}
                    inputProps={{
                        accept: 'image/*'
                    }}
                />
                <Button
                    size="large"
                    variant="contained"
                    type="submit"
                    className="submit"
                >
                    Save
                </Button>
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 32px;

    .box-form {
        padding: 1rem 0;

        .input {
            width: 100%;
            margin-bottom: 1rem;
        }

        .submit {
            margin: auto;
            display: flex;
        }
    }
`;