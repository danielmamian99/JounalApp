import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
  test('debe regresar el estado inicial y llamarse "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("debe de realizar la autenticacion", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated", //'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("debe de realizar el logout sin argumentos", () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({ ...notAuthenticatedState , errorMessage: undefined });
  });

  test("debe de realizar el logout y mostrar un mensaje de error", () => {
    const errorMessage = 'Credenciales no son correctas'
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage})
    );
    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('debe de cambiar el estado a checking', () => { 
    const state = authSlice.reducer(authenticatedState, checkingCredentials())
    expect( state.status ).toBe('checking');
   })
});
