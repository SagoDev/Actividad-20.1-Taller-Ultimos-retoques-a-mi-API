const express = require('express');

const index = express();
const puerto = 3000;

index.get('/',(req,res)=>{
  res.send('Hola! Bienvenido')
})

index.listen(puerto,()=>{
  console.log('Servidor Funcionando')
})