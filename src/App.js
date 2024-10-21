import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import { publicRoute } from './routes';
import { DefaultLayout } from './layouts';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    const [username, setUsername] = useState('');

    useEffect(() => {});
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path=""
                        element={
                            <Fragment>
                                <Login setUsername={setUsername} />
                            </Fragment>
                        }
                    ></Route>
                    <Route
                        path="/binh-chon"
                        element={
                            <Fragment>
                                <Home username={username}/>
                            </Fragment>
                        }
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
