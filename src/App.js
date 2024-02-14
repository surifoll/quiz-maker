import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TriviaCategory from './components/TriviaCategory';
import QuizEvaluation from './components/QuizEvaluation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TriviaCategory></TriviaCategory>} />
        <Route path="/quiz-evaluation" element={<QuizEvaluation></QuizEvaluation>} />
      </Routes>
    </Router>
  );
}


export default App;
