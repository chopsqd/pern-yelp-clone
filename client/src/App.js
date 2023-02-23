import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import UpdatePage from "./pages/UpdatePage";
import DetailPage from "./pages/DetailPage";
import {RestaurantsContextProvider} from "./context/RestaurantsContext";

const App = () => {
    return (
        <BrowserRouter>
            <RestaurantsContextProvider>

                <div className={"container"}>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/restaurants/:id" element={<DetailPage/>}/>
                        <Route exact path="/restaurants/:id/update" element={<UpdatePage/>}/>
                    </Routes>
                </div>
                
            </RestaurantsContextProvider>
        </BrowserRouter>
    );
}

export default App;
