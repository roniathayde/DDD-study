# DDD-Study
Este e um projeto de estudo para pratica.
Um espaco para praticar conceitos de testes e principalmente o DDD.

## DDD é uma forma de conseguirmos manter uma comunicação clara e padronizada do desenvolvimento

## O que e DDD
DDD significa Domain-Driven-Design ou Design dirigido à dominio

### Design
Design é como vamos transformar o problema do cliente a algo palpavel no mundo real

### Dominio
Dominio e o problema real traduzido no codigo que precisamos resolver e nele existe alguns conceitos importantes como:

- Entidades
- Objetos de valor
- Servicos de dominio
- Agregados
- Repositorios

### src/core
Contem codigos/classes que sao compartilhados entre a aplicacao, sem valor semantico com relacao ao negocio.
Tudo ali deve ser possivel copiar e reaproveitar para quaisquer outro projeto/microservico.

em termos de comparacao podemos ter codigos compartilhados entre todas as entidades porem que contem valor semantico para o projeto.
e fora dele nao faria sentido. esse tipo de codigo faz sentido estar dentro do domain.

