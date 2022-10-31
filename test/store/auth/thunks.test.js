import { singInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSingIn } from "../../../src/store/auth";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', ()=>{
    const dispatch = jest.fn();

    beforeEach( ()=> jest.clearAllMocks() )

   test('debe de invocar el chekingCredentials', async()=>{
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

   });

   test('startGoogleSingIn debe llamar checkingCredentials y login - Exito', async() => { 
        const loginData= {ok:true, ...demoUser};
        await singInWithGoogle.mockResolvedValue(loginData);
        //thunk
        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

   test('startGoogleSingIn debe llamar checkingCredentials y logout - Error', async() => { 
    const loginData= {ok:false, errorMessage:'Un error en google'};
    await singInWithGoogle.mockResolvedValue(loginData);
    //thunk
    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

})

});