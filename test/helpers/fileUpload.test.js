import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () =>{

    test('debe de subir el archivo correctamente a cloudinary', async()=>{
        const imageUrl = 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect( typeof url ).toBe('string')

    });

});