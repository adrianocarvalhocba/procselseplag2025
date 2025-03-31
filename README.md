# PROCESSO SELETIVO SEPLAG 2025 - Vaga FrontEnd Senior

### Nome: **Adriano Afonso de Almeida Carvalho**

### CPF: **452.844.901-34**

### E-Mail: adrianocarvalhocba@gmail.com

### Framework usado: **Angular 17**

### Bibliotecas:

- Tailwindcss
- ngx-toastr
- ngx-mask

---

# COMO TESTAR A APLICAÇÃO

- [1. Sem Docker Instalado](#1-sem-docker-instalado)
- [2. Com Docker instalado usando a imagem que esta salva no DockerHub](#2-com-docker-instalado-usando-a-imagem-que-esta-salva-no-dockerhub)
- [3. Com Docker instalado usando a imagem que esta salva no respositório do projeto](#3-com-docker-instalado-usando-a-imagem-que-esta-salva-no-respositório-do-projeto)

## 1. Sem Docker Instalado

Acesse o endereço http://adrianocarvalhocba.github.io

---

## 2. Com Docker instalado usando a imagem que esta salva no DockerHub

Com o Docker instalado em sua máquina, siga os passos abaixo:

### a. Baixe a imagem :

```
docker pull adrianocarvalhocba/procselseplag2025:latest
```

### b. Levante o container da imagem:

```
docker run -d -it -p 80:80 adrianocarvalhocba/procselseplag2025:latest
```

### c. Teste a aplicação

Com os passos acima feitos, clique em qualquer link abaixo para abrir um navegador na máquina e mostrar a aplicação rodando:

[http://localhost](http://localhost)  
**ou**  
[http://127.0.0.1](http://127.0.0.1)

---

## 3. Com Docker instalado usando a imagem que esta salva no respositório do projeto

### a. Clone o repositório

```
git clone https://github.com/adrianocarvalhocba/procselseplag2025.git
```

### b. Acesse o diretório do projeto

```
cd procselseplag2025
```

### c. Carregue a imagem do container

```
docker load -i procselseplag2025.tar
```

### d. Inicie o container

```
docker run -d -it -p 80:80 procselseplag2025
```

### e. Teste a aplicação

Com os passos acima feitos, clique em qualquer link abaixo para abrir um navegador na máquina e mostrar a aplicação rodando:

[http://localhost](http://localhost)  
**ou**  
[http://127.0.0.1](http://127.0.0.1)
