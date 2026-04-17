import { Routes, Route, Link } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">🍽️ MyRecipe</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      </Routes>
    </>
  );
}

export default App;