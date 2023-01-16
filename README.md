# Journal App


Link: https://jeferson-daniel-mamian-notas.netlify.app/ . Esta app sirve para guardar notas e imagenes. Esta creado con VITE e implementado con el framework React, usando el patron de diseño redux, implementado con redux toolkit. Se utilizaron thunks, forms, customHooks, para el almacenamiento de imagenes se usó Cloudinary, la base de datos esta implementada en FireStore, la autenticación fue implementada con los servicios de firebase Google SingIn y como framework css Material UI. 


## Para iniciar usar:

-yarn install

-yarn dev

## Testing

El testing fue implementado con jest y react-testing-library, se probaron algunos reducers, thunks y componentes.

Para ejecutar el testing usar:

yarn test

### Environment

Las variables de entorno se dejaron a disposición para que sea más fácil probar la app, sin embargo lo ideal sería solo dejar el template y que configuren sus variables personalizadas en firebase, ya que estas podrían ser modificadas en un futuro.
