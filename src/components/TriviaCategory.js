import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TriviaQuiz from './TriviaQuiz';

const TriviaCategory = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [difficulty, setDifficulty] = useState("");
    const [createCount, setCreateCount] = useState(0);

    const handleCategorySelection = (e) => {
        setCategoryId(e.target.value);
    };

    const handleLevelSelection = (e) => {
        setDifficulty(e.target.value);
    };

    const handleCreateQuiz = (e) => {
        setCreateCount(createCount + 1);
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://opentdb.com/api_category.php');
                const data = await response.json();
                setCategories(data.trivia_categories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">

                    {loading ? (
                        <p>Loading categories...</p>
                    ) : (
                        <select id="categorySelect" className="form-select" onChange={handleCategorySelection}>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}

                </div>
                <div className="col">
                    <select id="difficultySelect" className="form-select" onChange={handleLevelSelection}>
                        <option >Select</option>
                        <option value="easy" >Easy</option>
                        <option value="medium" >Medium</option>
                        <option value="hard" >Hard</option>
                    </select>
                </div>
                <div className="col">
                    <button id="createBtn" onClick={handleCreateQuiz} className="btn btn-primary">Create</button>
                </div>
            </div>
            <div className='row'>
                <TriviaQuiz categoryId={categoryId} difficulty={difficulty} createCount={createCount}></TriviaQuiz>
            </div>
        </div>
    );
}

export default TriviaCategory;
