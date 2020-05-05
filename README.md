<h1 align="center">
  [Backend] FutureTube
</h1>

<p align="center">
    <img src="https://raw.githubusercontent.com/igoralvesantos/backend-futuretube/master/FutureTube.gif" width="550">
</p>

## Stack
Esse é um projeto de Backend inspirado no Youtube feito utilizando NodeJS, Express, Typescript e MySQL. Além disso, ele segue uma arquitetura em camadas simples:
1. Presentation: responsável pela comunicação com agentes externos (como o Frontend)
1. Data: responsável pela comunicação direta com o banco de dados
1. Business: responsável pela lógica de negócio
Por fim, ressalta-se que a comunicação da camada `Data` e a `Business` é feita através de interfaces denominadas `Gateway`, para possibilitar os testes unitários desta última camada (inversão de dependências)
## Sobre
Esse foi um projeto de Backend que utilizei para treinar os casos básicos de CRUD de uma API: Create, Read, Update e Delete. Para isso, utilizei um tema de videos: criar/ler/atualizar/deletar/comentar/like/dislike videos. Além disso, aproveitei para ver conceitos sobre buscas por termos utilizando um banco relacional e práticar o deploy em uma infraestrutura real, no caso na AWS, utilizando Lambda e API Gateway.
## Documentação
- Postman - https://documenter.getpostman.com/view/9731716/SzmcZdfR 
## Deploy
- AWS API Gateway - https://2gl2zhosnh.execute-api.us-east-1.amazonaws.com/v1
## Instruções para rodar
Pré-requisitos:  
Possuir um arquivo `.env` na raiz do projeto com as informações do banco de dados e com a chave secreta do jwt.    
```
HOST=<Nome do host do banco>
USER=<Nome do usuário do banco>
PASS=<Senha do seu banco>
DB=<Nome do seu banco>
SECRET_KEY=<Sua chave secreta do JWT>
```

As instruções são:
1. `npm install` para instalar todas as dependências
1. `npm run start:dev` para rodar localmente o projeto
1. `npm run build` para gerar uma versão possível de ser deployada com os arquivos transpilados para Javascript
## Contato  
[<img src="https://avatars2.githubusercontent.com/u/55074758?s=460&u=dceeb9d0aad05e49216632d0e956fff23ac8d70f&v=4" width=115 > <br>  Igor Alves ](https://github.com/igoralvesantos) |
| :---: |  
| [Email](mailto:igoralvesantos@gmail.com)  |
| [Linkedin](https://www.linkedin.com/in/igor-alves-santos/)   | 
