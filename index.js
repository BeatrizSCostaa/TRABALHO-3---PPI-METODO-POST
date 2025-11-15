import express from "express";

const host = "localhost";
const port = 3000;
var listaFornecedores = [];

const server = express();
server.use(express.urlencoded({ extended: true }));

server.get("/menuinicial", (req, resp) => {
  resp.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Menu Inicial</title>

        
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
    </head>

    <body> 
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">

          <a class="navbar-brand" href="/">MENU</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">

      
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>

            
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Cadastros
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/cadastroFornecedor">Cadastrar Fornecedor</a></li>
                  <li><a class="dropdown-item" href="/listarFornecedores">Listar Fornecedores</a></li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="/logout">Logout</a>
              </li>

            </ul>
          </div>

        </div>
      </nav>

      <div class="container mt-4">
        <h1>Bem-vindo ao sistema!</h1>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

server.get("/login", (req, resp) => {
  resp.send(`

  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>

      <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
      
      <style>
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f7f7f7;
        }
        .card {
          width: 380px;
        }
      </style>
  </head>

  <body>

    <div class="card shadow">
      <div class="card-body">
        <h3 class="text-center mb-4">Login</h3>

        <form action="/efetuarLogin" method="POST">

          <div class="form-group">
            <label for="login">Usuário</label>
            <input type="text" id="login" name="login" class="form-control" placeholder="Digite o usuário">
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" name="senha" class="form-control" placeholder="Digite a senha">
          </div>

          <button type="submit" class="btn btn-primary btn-block mt-3">
            Entrar
          </button>

        </form>

      </div>
    </div>

  </body>
  </html>
  `);
});

server.post("/efetuarLogin", (req, resp) => {
  const login = req.body.login;
  const senha = req.body.senha;

  if (login && senha) {
    resp.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                <title>Login</title>
            </head>
            <body class="bg-light">

                <div class="container mt-5">
                    <div class="alert alert-success text-center">
                        Login efetuado com sucesso!
                    </div>

                    <a href="/menuinicial" class="btn btn-primary w-100">Voltar ao menu</a>
                </div>

            </body>
            </html>
        `);
  } else {
    let conteudologin = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>

      <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
      
      <style>
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f7f7f7;
        }
        .card {
          width: 380px;
        }
      </style>
  </head>

  <body>

    <div class="card shadow">
      <div class="card-body">
        <h3 class="text-center mb-4">Login</h3>

        <form action="/efetuarLogin" method="POST">
`;

    conteudologin += `
  <div class="form-group">
    <label for="login">Usuário</label>
    <input type="text" id="login" name="login" class="form-control" value="${login}" placeholder="Digite o usuário">
  </div>
`;

    if (!login) {
      conteudologin += `
    <p class="text-danger">Por favor, insira o login.</p>
  `;
    }

    conteudologin += `
  <div class="form-group">
    <label for="senha">Senha</label>
    <input type="password" id="senha" name="senha" class="form-control" value="${senha}" placeholder="Digite a senha">
  </div>
`;

    if (!senha) {
      conteudologin += `
    <p class="text-danger">Por favor, insira a senha.</p>
  `;
    }

    conteudologin += `
  <button type="submit" class="btn btn-primary btn-block mt-3">
    Entrar
  </button>

  </form>

      </div>
    </div>

  </body>
  </html>
`;

    resp.send(conteudologin);
  }
});

server.get("/logout", (req, resp) => {
  resp.send(`
    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

    <div class="container mt-5">
      <h3>Você saiu do sistema.</h3>
      <a href="/menuinicial" class="btn btn-primary mt-3">Voltar ao Menu</a>
    </div>
  `);
});

server.get("/cadastroFornecedor", (req, resp) => {
  resp.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastro de Fornecedor</title>

      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
    </head>

    <body class="bg-light">

      <div class="container mt-5">
        <div class="card shadow-lg p-4">
          <h2 class="text-center mb-4">Cadastro de Fornecedor</h2>

          <form action="/fornecedorescadastrados" method="POST">

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Razão Social</label>
                <input type="text" class="form-control" name="razaoSocial">
              </div>

              <div class="col-md-6">
                <label class="form-label">CNPJ</label>
                <input type="text" class="form-control" name="cnpj">
              </div>
            </div>

            <div class="mt-3">
              <label class="form-label">Nome Fantasia</label>
              <input type="text" class="form-control" name="nomeFantasia">
            </div>

            <div class="mt-3">
              <label class="form-label">E-mail</label>
              <input type="email" class="form-control" name="email">
            </div>

            <div class="row g-3 mt-1">
              <div class="col-md-6">
                <label class="form-label">Telefone</label>
                <input type="tel" class="form-control" name="telefone">
              </div>

              <div class="col-md-6">
                <label class="form-label">CEP</label>
                <input type="text" class="form-control" name="cep">
              </div>
            </div>
            <div class="mt-3">
              <label class="form-label">Endereço</label>
              <input type="text" class="form-control" name="endereco">
            </div>


            <div class="row g-3 mt-1">
              <div class="col-md-8">
                <label class="form-label">Cidade</label>
                <input type="text" class="form-control" name="cidade">
              </div>

              <div class="col-md-4">
                <label class="form-label">UF</label>
                <input type="text" maxlength="2" class="form-control" name="uf">
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-6">
              <button type="submit" class="btn btn-primary w-100"> Cadastrar </button>
            </div>

            <div class="col-md-6">
              <a href="/menuinicial" class="btn btn-secondary w-100"> Voltar </a>
            </div>
      </div>


          </form>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

server.post("/fornecedorescadastrados", (req, resp) => {
  const razaoSocial = req.body.razaoSocial;
  const cnpj = req.body.cnpj;
  const nomeFantasia = req.body.nomeFantasia;
  const endereco = req.body.endereco;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const cep = req.body.cep;
  const email = req.body.email;
  const telefone = req.body.telefone;

  if (
    razaoSocial &&
    cnpj &&
    nomeFantasia &&
    endereco &&
    cidade &&
    uf &&
    cep &&
    email &&
    telefone
  ) {
    listaFornecedores.push({
      razaoSocial,
      cnpj,
      nomeFantasia,
      endereco,
      cidade,
      uf,
      cep,
      email,
      telefone,
    });

    console.log("Fornecedor cadastrado com sucesso:", razaoSocial);
    resp.redirect("/listarFornecedores");
  } else {
    let conteudo = `
      <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastro de Fornecedor</title>

      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
    </head>

    <body class="bg-light">

      <div class="container mt-5">
        <div class="card shadow-lg p-4">
          <h2 class="text-center mb-4">Cadastro de Fornecedor</h2>

          <form action="/fornecedorescadastrados" method="POST">

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Razão Social</label>
                <input type="text" class="form-control" name="razaoSocial" value = "${razaoSocial}">
              </div>`;

    if (!razaoSocial) {
      conteudo += `
            <div>
                <p class="text-danger">Por favor, informe a razão social.</p>
            </div>
        `;
    }

    conteudo += `
              <div class="col-md-6">
                <label class="form-label">CNPJ</label> 
                <input type="text" class="form-control" name="cnpj" value = "${cnpj}">
              </div>`;

    if (!cnpj) {
      conteudo += ` 
              <div>
                <p class="text-danger">Por favor, informe o CNPJ.</p>
              </div>
        `;
    }

    conteudo += `
            <div class="mt-3">
              <label class="form-label">Nome Fantasia</label>
              <input type="text" class="form-control" name="nomeFantasia" value = "${nomeFantasia}">
            </div>
`;

    conteudo += `
              <div>
                <p class = "text-danger">Por favor, informe o nome fantasia.</p>
              </div>
        `;

    conteudo += `
            <div class="mt-3">
              <label class="form-label">E-mail</label>
              <input type="email" class="form-control" name="email" value = "${email}">
            </div>
        `;

    if (!email) {
      conteudo += `
          <div>
            <p class = "text-danger">Por favor, informe o EMAIL.</p>
          </div>
          `;
    }

    conteudo += `

            <div class="row g-3 mt-1">
              <div class="col-md-6">
                <label class="form-label">Telefone</label>
                <input type="tel" class="form-control" name="telefone" value = "${telefone}">
              </div>
            `;

    if (!telefone) {
      conteudo += `
            <div>
              <p class = "text-danger">Por favor, informe o telefone.</p>
            </div>
          `;
    }

    conteudo += `

              <div class="col-md-6">
                <label class="form-label">CEP</label>
                <input type="text" class="form-control" name="cep" value = "${cep}">
              </div>
            </div>

            `;

    if (!cep) {
      conteudo += `
              <div>
                <p class = "text-danger">Por favor, informe o CEP.</p>
              </div>
              `;
    }

    conteudo += `
            <div class="mt-3">
              <label class="form-label">Endereço</label>
              <input type="text" class="form-control" name="endereco" value = "${endereco}">
            </div>
            `;

    if (!endereco) {
      conteudo += `
              <div>
                <p class = "text-danger">Por favor, informe o endereço.</p>
              </div>
              `;
    }

    conteudo += `

            <div class="row g-3 mt-1">
              <div class="col-md-8">
                <label class="form-label">Cidade</label>
                <input type="text" class="form-control" name="cidade" value = "${cidade}">
              </div>

              `;

    if (!cidade) {
      conteudo += `
                <div>
                  <p class = "text-danger">Por favor, informe a cidade.</p>
                </div>
                `;
    }

    conteudo += `

              <div class="col-md-4">
                <label class="form-label">UF</label>
                <input type="text" maxlength="2" class="form-control" name="uf" value = "${uf}">
              </div>
            </div>

            `;

    if (!uf) {
      conteudo += `
              <div>
                <p class = "text-danger">Por favor, infoprme a uf.</p>
              </div>  
            `;
    }

    conteudo += `

            <div class="row mt-4">
              <div class="col-md-6">
              <button type="submit" class="btn btn-primary w-100"> Cadastrar </button>
            </div>

            <div class="col-md-6">
              <a href="/menuinicial" class="btn btn-secondary w-100"> Voltar </a>
            </div>
      </div>
          </form>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;

    resp.send(conteudo);
  }
});

server.get("/listarFornecedores", (req, resp) => {
  let conteudo = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Lista de Fornecedores</title>
    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
  </head>

  <body>
  <div class="container mt-5">
    <h2>Fornecedores Cadastrados</h2>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Razão Social</th>
          <th>CNPJ</th>
          <th>Nome Fantasia</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>CEP</th>
          <th>Endereço</th>
          <th>Cidade</th>
          <th>UF</th>
        </tr>
      </thead>
      <tbody>`;

  for (let i = 0; i < listaFornecedores.length; i++) {
    conteudo += `
      <tr>
        <td>${listaFornecedores[i].razaoSocial}</td>
        <td>${listaFornecedores[i].cnpj}</td>
        <td>${listaFornecedores[i].nomeFantasia}</td>
        <td>${listaFornecedores[i].email}</td>
        <td>${listaFornecedores[i].telefone}</td>
        <td>${listaFornecedores[i].cep}</td>
        <td>${listaFornecedores[i].endereco}</td>
        <td>${listaFornecedores[i].cidade}</td>
        <td>${listaFornecedores[i].uf}</td>
      </tr>`;
  }

  conteudo += `
      </tbody>
    </table>
  </div>
  </body>
  </html>`;

  resp.send(conteudo);
});

server.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}/menuinicial`);
});
