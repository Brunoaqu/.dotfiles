![Alt text](https://pixlog.com.br/email_images/banner.png)
# API

A API é responsável por gerenciar o armazenamento de informações do usuário, relatórios e pagamentos. O sistema é projetado para ser usado em conjunto com um aplicativo que faz uso da tecnologia de realidade aumentada para medir e gerar informações. A API se comunica com um banco de dados MariaDB para armazenar e recuperar as informações do sistema.

## Entidades

### users: Usuários

A entidade Usuários armazena informações dos nossos clientes registrados no sistema. Cada cliente é identificado por um ID único e possui as seguintes informações:

* Nome completo
* Endereço de e-mail
* Senha
* Documento de identificação
* Nome da empresa
* Telefone
* Endereço

Essas informações são usadas para identificar e autenticar o cliente no sistema. A entidade Usuários é usada para gerenciar o perfil do cliente, bem como informações de pagamento, como a compra de créditos para o uso do aplicativo. Cada cliente pode gerar relatórios de escaneamento de pilhas de madeira para si mesmo, que incluem informações como volume e diâmetro de cada tora. Esses relatórios são armazenados na API para consultas futuras e podem ser usados pelos clientes para avaliar o desempenho de sua empresa no gerenciamento de suas pilhas de madeira.

### scanReport: Relatórios de escaneamento

A entidade Relatórios de Escanamento armazena as informações das medições realizadas pelo aplicativo Pixlog. Cada relatório de escanamento é identificado por um ID único e possui as seguintes informações:

* ID do usuário
* Data de criação
* Data de criação original
* Fuso horário
* Numero do relatório
* Tipo de relatório
* Duração do escaneamento
* Latitude
* Longitude
* Volume
* Volume formula
* Especie de madeira
* Comprimento
* Lista de toras:
  * Altura
  * Largura
  * Posição X
  * Posição Y

Esses relatórios são gerados a partir da tecnologia de realidade aumentada do aplicativo Pixlog, que mede pilhas de madeira e gera informações sobre as toras. A entidade Relatórios de Escanamento é usada para armazenar essas informações para consultas futuras, bem como para fins de análise e geração de relatórios gerais.

### scanReportWrapped: Relatórios gerais

A entidade Relatórios Gerais armazena um resumo das informações coletadas a partir dos relatórios de escaneamento gerados pelos usuários. Cada relatório geral é identificado por um ID único e possui as seguintes informações:

* ID do usuário
* Data de criação
* Data de criação original
* Fuso horário
* Numero do relatório
* Tipo de relatório
* Lista de relatórios de escaneamento

Essas informações são usadas para fornecer aos usuários um resumo das medições realizadas em um determinado período de tempo, permitindo que eles acompanhem o progresso e tomem decisões informadas sobre a gestão de suas operações.

### payments: Pagamentos

A entidade Pagamentos armazena as informações dos pagamentos realizados pelos clientes. Cada pagamento é identificado por um ID único e possui as seguintes informações:

* ID do usuário
* Data de criação
* Débito
* Crédito
* Balanço
* Recibo gerado pela apple

Essas informações são usadas para gerenciar os pagamentos dos clientes e garantir que os serviços sejam fornecidos de forma adequada. A entidade Pagamentos é usada para registrar todos os pagamentos realizados no sistema e fornecer informações de pagamento para relatórios financeiros.

## Endpoints

### Usuários

* `GET    /v1/user`                       - Retorna informações do usuário logado.
* `POST   /v1/user`                       - Cria um novo usuário no sistema.
* `PUT    /v1/user`                       - Atualiza informações do usuário logado.
* `DELETE /v1/user`                       - Desativa o usuário logado.
* `POST   /v1/confirmEmail`               - Confirma o e-mail do usuário.
* `POST   /v1/verifyEmail`                - Verifica se o e-mail já está cadastrado no sistema.
* `POST   /v1/generateConfirmEmailToken`  - Gera um token para confirmar o e-mail do usuário.
* `POST   /v1/generateResetPasswordToken` - Gera um token para redefinir a senha do usuário.
* `POST   /v1/validateResetPasswordToken` - Valida o token para redefinir a senha do usuário.
* `POST   /v1/changePasswordWithToken`    - Altera a senha do usuário com o token de redefinição.
* `POST   /v1/changePasswordUsingCurrent` - Altera a senha do usuário.
* `POST   /v1/feedback`                   - Recebe feedback do usuário.
* `POST   /v1/auth`                       - Autentica o usuário no sistema.
* `POST   /v1/refreshAccessToken`         - Gera um novo token de acesso.
* `POST   /v1/signout?all=[boolean]`      - Desloga o usuário do sistema.

### Relatórios

* `GET  /v1/report`             - Retorna todos os relatórios de escaneamento do usuário logado.
* `GET  /v1/report/:id`         - Retorna um relatório de escaneamento específico do usuário logado.
* `POST /v1/report`             - Cria um novo relatório de escaneamento para o usuário logado.
* `GET  /v1/reportWrapped`      - Retorna todos os relatórios gerais do usuário logado.
* `GET  /v1/reportWrapped/:id`  - Retorna um relatório geral específico do usuário logado.
* `POST /v1/reportWrapped`      - Cria um novo relatório geral para o usuário logado.
* `POST /v1/sendFile`           - Envia um arquivo para o email do usuário logado.

### Pagamentos

* `GET  /v1/payment`      - Retorna todos os pagamentos do usuário logado.
* `GET  /v1/payment/:id`  - Retorna um pagamento específico do usuário logado.
* `POST /v1/payment`      - Cria um novo pagamento para o usuário logado.
* `POST /v1/startTrial`   - Inicia um período de teste para o usuário logado.

### Debug

* `POST /v1/debug` - Salva um arquivo de log no servidor.

## Autenticação

A API utiliza autenticação baseada em tokens JWT (JSON Web Tokens) para proteger os endpoints. Cada solicitação para um endpoint protegido deve incluir um token JWT válido no cabeçalho de autorização. O token JWT é gerado quando um usuário faz login no sistema e expira após um determinado período de tempo.


## Rodando a aplicação localmente

### 1. Instalação docker

Para executar a aplicação localmente usando o Docker Compose, você precisará instalar o Docker em sua máquina. O Docker é suportado em diferentes plataformas, incluindo Linux, macOS e Windows. Siga as instruções abaixo para instalar o Docker em sua plataforma.

#### Linux

Para instalar o Docker no Linux, siga as instruções na [documentação oficial do Docker](https://docs.docker.com/desktop/install/linux-install/).

#### macOS

Para instalar o Docker no macOS, baixe o instalador do Docker em [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/) e siga as instruções na tela.

#### Windows

Para instalar o Docker no Windows, baixe o instalador do Docker em [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/) e siga as instruções na tela.

### 2. Configuração do arquivo .env

Após instalar o Docker, você precisará configurar as variáveis de ambiente necessárias para executar o Docker Compose. Copie o arquivo **.env.template** para **.env** e edite as variáveis de ambiente conforme necessário. Certifique-se de preencher todos os campos obrigatórios.

```javascript
NODE_ENV= // Ambiente que o node ira rodar [development, stage, production].
EMAIL_DELIVERY= // Serviço de email ligado [true, false].
LOG_LEVEL= // Nível de log [error, warn, info, debug].

TKN_EXP_ACCESS_TOKEN= // Tempo de expiração do token de acesso.
PIXLOG_API_NODE_SECRET= // Segredo para gerar tokens e refresh tokens.
MAX_SESSIONS= // Número máximo de sessões simultâneas.

TKN_EXP_RESET_PASSWORD= // Tempo de expiração do token de redefinição de senha.
TKN_EXP_CONFIRM_EMAIL= // Tempo de expiração do token de confirmação de email.

DB_USER= // Nome de usuário para logar no banco de dados.
DB_PASS= // Senha do banco de dados para logar no banco de dados.
DB_HOST= // Host do banco de dados.
DB_PORT= // Porta do banco de dados.

DEV_DB_NAME= // Banco de dados para ambiente de desenvolvimento.
STAGE_DB_NAME= // Banco de dados para ambiente de homologação.
PROD_DB_NAME= // Banco de dados para ambiente de produção.

CLOUD_MAPS= // Chave de acesso para API do GoogleMaps.
```

### 3. Executando o Docker Compose

Após configurar o arquivo **.env**, você pode executar o Docker Compose. Navegue até a pasta raiz do projeto e execute o seguinte comando:

```bash
docker compose up
```

Isso iniciará a construção dos containers do Docker necessários para executar a aplicação. Quando a construção estiver concluída, você poderá acessar a aplicação em seu navegador em [http://localhost:5000](http://localhost:5000), caso a variável de ambiente API_PORT não seja configurada. Se a variável de ambiente API_PORT for configurada para um valor diferente de 3000, você deve acessar a aplicação no endereço [http://localhost:{API_PORT}](http://localhost:{API_PORT}). Certifique-se de verificar o valor correto da variável de ambiente antes de acessar a aplicação.

Para interromper a execução do Docker Compose, execute o seguinte comando na linha de comando:

```bash
docker compose down
```

## Vulnerabilidades

| Nome | Versão | Commit | Desenvolvedor | Descrição |
| --- | --- | --- | --- | --- |
| Redis + Backup De Relatório + DDOS | >= 2.0.1 | [8e0b771](https://github.com/project-pixlog/main-api-node/commit/8e0b77150197ef745866339a76c3ae7f0cb754b6) | Bruno Aquino | Seguindo a necessidade de ter uma cópia original das requisições de relatório, foi implementado um sistema de backup, que é um middleware que guarda o corpo da requisição sem nenhum cheque ou alteração por parte da API. Embora o servidor possua suas estratégias para lidar com alto fluxo de requisições maliciosas ainda há um perigo de explodir a memória disponível na máquina que roda o servidor do Redis. |
