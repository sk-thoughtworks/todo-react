import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';

function App() {
    return (
        <Router>
            <Header />
            <TodoList />
        </Router>
    );
}

export default App;
