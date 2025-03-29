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

# COMO EXECUTAR O CONTAINER PARA TESTES

Com o Docker instalado em sua máquina, siga os passos abaixo:

### 1. Clone o repositório

```
git clone https://github.com/adrianocarvalhocba/procselseplag2025.git
```

### 2. Acesse o diretório do projeto

```
cd procselseplag2025
```

### 3. Carregue a imagem do container

```
docker load -i procselseplag2025.tar
```

### 4. Inicie o container

```
docker container run -d -it -p 80:80 procselseplag2025
```

### 5. Teste a aplicação

#### Abra um navegador na máquina que está executando o container e acesse:

**http://localhost**
ou
**http://127.0.0.1**
