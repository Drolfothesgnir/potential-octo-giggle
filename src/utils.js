export function parseMeal(meal) {
    const ingredients = [];
    let i = 1;
    while (!!meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strMeasure${i}`] + ' of ' + meal[`strIngredient${i}`]);
        i += 1;
    }

    return {
        name: meal.strMeal,
        description: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        ingredients: ingredients.join(', ')
    }
}