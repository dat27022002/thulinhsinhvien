import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { DefaultLayout } from './layouts';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    const [username, setUsername] = useState('a');

    useEffect(() => {});
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path=""
                        element={
                            <DefaultLayout>
                                <Login setUsername={setUsername} />
                            </DefaultLayout>
                        }
                    ></Route>
                    <Route
                        path="/binh-chon"
                        element={
                            <DefaultLayout>
                                <Home username={username} />
                            </DefaultLayout>
                        }
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
