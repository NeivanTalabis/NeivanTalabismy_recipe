import { Link } from 'react-router-dom';

function RecipeCard({ meal }) {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>{meal.strMeal}</p>
    </Link>
  );
}

export default RecipeCard;