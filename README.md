# PROCESSO SELETIVO SEPLAG 2025

### Nome: **Adriano Afonso de Almeida Carvalho**

### CPF: **452.844.901-34**

### Vaga: FrontEnd Senior

### Framework usado: **Angular 17**

### Bibliotecas:

- Tailwindcss
- ngx-toastr
- ngx-mask

---

# COMO RODAR O CONTAINER PARA TESTAR

### Com a ferramenta docker instalada na maquina, basta clonar o projeto na maquina:

```
git clone https://github.com/adrianocarvalhocba/procselseplag2025.git
```

### Assim que terminar de baixar, entre na pasta procselseplag2025 e execute o comando abaixo para carregar a imagem do container:

```
docker load -i procselseplag2025.tar
```

### Agora execute o comando abaixo para levantar o container:

```
docker container run -d -it -p 80:80 procselseplag2025
```

### Para testar, na maquina rodando o container, abra qualquer navegador é digite na Url:

**http://localhost**
ou
**http://127.0.0.1**
