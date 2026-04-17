import { useParams, Link } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../features/recipes/recipesApiSlice';

function RecipeDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetRecipeByIdQuery(id);

  if (isLoading) return <p className="status">Loading...</p>;
  if (isError) return <p className="status">Failed to load recipe.</p>;

  const meal = data?.meals?.[0];
  if (!meal) return <p className="status">Recipe not found.</p>;

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const name = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return name?.trim() ? `${measure?.trim()} ${name}` : null;
  }).filter(Boolean);

  return (
    <div className="container">
      <Link to="/" className="back">← Back</Link>

      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img" />

      <p><strong>Category:</strong> {meal.strCategory} &nbsp;|&nbsp; <strong>Area:</strong> {meal.strArea}</p>

      {meal.strYoutube && (
        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">▶ Watch on YouTube</a>
      )}

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>Instructions</h2>
      {meal.strInstructions?.split(/\r?\n/).filter(Boolean).map((step, i) => (
        <p key={i}>{step}</p>
      ))}
    </div>
  );
}

export default RecipeDetailPage;