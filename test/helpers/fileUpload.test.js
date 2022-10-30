import {v2 as cloudinary} from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name:'dksiujvvo',
    api_key:'466744869289272',
    api_secret:'fNrrS9zenJsYlPbgndijUa_VLyI',
    secure: true,

})
describe("Pruebas en fileUpload", () => {
  
    test("debe de subir el archivo correctamente a cloudinary", async () => {
        const imageUrl =
        "https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], "foto.jpg");

        const url = await fileUpload(file);
        expect(typeof url).toBe("string");

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');
        
        await cloudinary.api.delete_resources(['journal/' + imageId],{
            resource_type: 'image'
        });
    });
    
    test("debe de retornar null si no se envia una imagen", async () => {
        const file = new File([], "foto.jpg");
        const url = await fileUpload(file);
        expect(url).toBe(null);


    });
});
