import { useState, useMemo } from 'react';
import { useGetSeafoodRecipesQuery } from '../features/recipes/recipesApiSlice';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const PER_PAGE = 8;

function RecipeListPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetSeafoodRecipesQuery();

  const filtered = useMemo(() => {
    const meals = data?.meals ?? [];
    return query.trim()
      ? meals.filter((m) => m.strMeal.toLowerCase().includes(query.toLowerCase()))
      : meals;
  }, [data, query]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (val) => {
    setQuery(val);
    setPage(1);
  };

  if (isLoading) return <p className="status">Loading...</p>;
  if (isError) return <p className="status">Failed to load recipes.</p>;

  return (
    <div className="container">
      <h1>Seafood Recipes</h1>
      <SearchBar value={query} onChange={handleSearch} />
      <p className="count">{filtered.length} results{query && ` for "${query}"`}</p>

      {visible.length === 0 ? (
        <p className="status">No recipes found.</p>
      ) : (
        <div className="grid">
          {visible.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default RecipeListPage;