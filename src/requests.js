const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

export function getMealsByPartialMatch(str) {
    return fetch(`${baseUrl}search.php?s=${str}`);
}

export function getCategories() {
    return fetch(`${baseUrl}list.php?c=list`);
}

export function getMealsByCategory(category) {
    return fetch(`${baseUrl}filter.php?c=${category}`);
}

export function getIngredients() {
    return fetch(`${baseUrl}list.php?i=list`);
}

export function getMealsByMainIngredient(ingredient) {
    return fetch(`${baseUrl}filter.php?i=${ingredient}`);
}

export function getMealsById(id) {
    return fetch(`${baseUrl}lookup.php?i=${id}`);
}