import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";

const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
    // preloadedState:{

    // }
})

describe('Pruebas en <LoginPage/>', () => {

    test('debe de mostrar el componente correctamente', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)

    });

});