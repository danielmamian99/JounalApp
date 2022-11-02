import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSingIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de invocar el chekingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSingIn debe llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);
    //thunk
    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSingIn debe llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMessage: "Un error en google" };
    await singInWithGoogle.mockResolvedValue(loginData);
    //thunk
    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Exito', async() => { 
    const loginData = { ok:true, ...demoUser }
    const formData = {email: demoUser.email, password: '123456'};

    await loginWithEmailPassword.mockResolvedValue( loginData ); 

    await startLoginWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login(loginData) );

   });

   test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y logout - Error', async() => { 
    const loginData = { ok:false, errorMessage:'Error' }
    const formData = {email: demoUser.email, password: '123456'};

    await loginWithEmailPassword.mockResolvedValue( loginData ); 

    await startLoginWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout(loginData) );

   });

   test('startLogout debe de llamar clearNotesLogout y logout', async() => { 

    await startLogout()(dispatch);

    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout({errorMessage:null}) );

   });

   test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
    const loginData = { ok:true, ...demoUser }
    const formData = {email: demoUser.email, password: '123456', displayName: demoUser.displayName};

    await registerUserWithEmailPassword.mockResolvedValue( loginData ); 

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login(loginData) );

   });

   test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() => { 
    const loginData = { ok:false, errorMessage:'Error' }
    const formData = {email: demoUser.email, password: '123456'};

    await registerUserWithEmailPassword.mockResolvedValue( loginData ); 

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );

   });

});
