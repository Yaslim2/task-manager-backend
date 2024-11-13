# Usar uma imagem Node.js como base
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de configuração e de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Expor a porta do aplicativo
EXPOSE 3000

# Rodar o aplicativo
CMD ["npm", "run", "start:dev"]
