import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    startLoginWithEmailPassword: ({email, password}) => () => mockStartLoginWithEmailPassword({email, password}),
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));


const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage/>', () => {

    beforeEach( () => jest.clearAllMocks() );

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

    test('boton de google debe de llamar el startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        
        expect(mockStartGoogleSingIn).toHaveBeenCalled();
        
    });

    test('submit debe de llamar startLoginWithEmailPassword', () => { 

        const email = 'danimaster99@gmail.com';
        const password = 'daniel99'

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        
        const emailField = screen.getByRole('textbox',{name: 'Correo'});
        fireEvent.change(emailField, {target:{name: 'email', value:email}});

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target:{name: 'password', value:password}});
        
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password
        })
     });

});