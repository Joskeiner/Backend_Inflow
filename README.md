# Backend_Inflow
este repositorio contiene todo el condigo que esta orientado al backend 

Inflow Users lambdas
Teniendo creada la Api-Gateway, se crean las siguientos 5 endpoints de las cuales estan manejadas por funciones lambdas:

Endpoints
//GetallUsers
Para obtener todos los usuarios registrados
[GET/users]
[https://p8avxljn32.execute-api.us-east-1.amazonaws.com/users]

//GetUserbyDni
Para obtener a un unico usuario, se le debe pasar el dni como parametro en la url:
[GET/users/{dni}]
[https://p8avxljn32.execute-api.us-east-1.amazonaws.com/users]

//PostUser
Para crear un nuevo usuario:
[POST/users]
[https://p8avxljn32.execute-api.us-east-1.amazonaws.com/users]

//UpdateUser
Modificar un usuario existente, se debe pasar el dni como parametro en la url:
[PUT/users/{dni}]
[https://p8avxljn32.execute-api.us-east-1.amazonaws.com/users]

//DeleteUser
Borra un usuario existente, se debe pasar el dni como parametro en la url:
[DELETE/users/{dni}]
[https://p8avxljn32.execute-api.us-east-1.amazonaws.com/users]
