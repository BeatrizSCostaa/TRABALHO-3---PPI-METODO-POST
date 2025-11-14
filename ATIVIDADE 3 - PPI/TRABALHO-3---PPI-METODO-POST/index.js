import express from "express";

const host = "localhost";
const port = 3000;
var listaFornecedores = [];

const server = express();
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, resp) => {
  resp.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Menu Inicial</title>

        <style>
            /* Container do menu */
            .menu {
                background: #333;
                padding: 10px;
            }

            /* Links principais */
            .menu a {
                color: white;
                text-decoration: none;
                padding: 10px;
                display: inline-block;
            }

            /* Dropdown */
            .dropdown {
                display: inline-block;
                position: relative;
            }

            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #f1f1f1;
                min-width: 180px;
                box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
                z-index: 1;
            }

            .dropdown-content a {
                color: black;
                padding: 10px;
                text-decoration: none;
                display: block;
            }

            /* Aparecer ao passar o mouse */
            .dropdown:hover .dropdown-content {
                display: block;
            }

            .dropdown:hover > a {
                background-color: #444;
            }
        </style>
    </head>

    <body>

        <div class="menu">
            <a href="/">Home</a>

            <div class="dropdown">
                <a href="#">Cadastros</a>
                <div class="dropdown-content">
                    <a href="/cadastroFornecedor">Cadastrar Fornecedor</a>
                    <a href="/listarFornecedores">Listar Fornecedores</a>
                </div>
            </div>

            <a href="/login">Login</a>
            <a href="/logout">Logout</a>
        </div>

        <h1>Bem-vindo ao sistema!</h1>

    </body>
    </html>
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

    <style>
      * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:"Poppins",sans-serif;
      }
      body {
        background:linear-gradient(135deg,#dfe9f3,#ffffff);display:flex;align-items:center;
        justify-content:center;
        height:100vh;padding:20px;
      }
      .container {
        background:#fff;
        padding:2.5rem;
        border-radius:1rem;
        box-shadow:0 10px 25px rgba(0,0,0,0.1);
        width:100%;
        max-width:500px;
      }
      h2 {
        text-align:center;
        color:#333;
        margin-bottom:1.5rem;
      }

      form {
        display:flex;
        flex-direction:column;
        gap:1rem;
      }

      label {
        font-weight:600;
        color:#333;
        font-size:0.95rem;
      }
      input {
        padding:0.8rem;
        border:1px solid #ccc;
        border-radius:0.5rem;
        font-size:1rem;
        input:focus{border-color:#4a90e2;
        outline:none;
      }

      .row {
        display:flex;
        gap:1rem;
      }
      .row>div {
        flex:1;
      }
      button {
      padding:0.9rem;
      background:#4a90e2;
      color:#fff;
      border:none;
      border-radius:
      0.5rem;font-size:1rem;
      cursor:pointer;
      }
      button:hover{
      background:#357abd;
      }
      @media(max-width:500px){
      .row{
      flex-direction:column;
      }
      }
      .erro{
      background:#ffe5e5;
      color:#b30000;
      padding:10px;
      border-left:5px solid #ff4d4d;margin-bottom:8px;
      }
    </style>
    </head>

    <body>
      <div class="container">
        <h2>Cadastro de Fornecedor</h2>

        <form id="formFornecedor" action="/fornecedorescadastrados" method="POST">
          <div class="row">
            <div>
              <label for="razaoSocial">Razão Social</label>
              <input type="text" id="razaoSocial" name="razaoSocial">
            </div>

            <div>
              <label for="cnpj">CNPJ</label>
              <input type="text" id="cnpj" name="cnpj">
            </div>
          </div>

          <label for="nomeFantasia">Nome Fantasia</label>
          <input type="text" id="nomeFantasia" name="nomeFantasia">

          <label for="email">E-mail</label>
          <input type="email" id="email" name="email">

          <div class="row">
            <div>
              <label for="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone">
            </div>

            <div>
              <label for="cep">CEP</label>
              <input type="text" id="cep" name="cep">
            </div>
          </div>

          <label for="endereco">Endereço</label>
          <input type="text" id="endereco" name="endereco">

          <div class="row">
            <div>
              <label for="cidade">Cidade</label>
              <input type="text" id="cidade" name="cidade">
            </div>

            <div>
              <label for="uf">UF</label>
              <input type="text" id="uf" name="uf">
            </div>
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

server.post("/fornecedorescadastrados", (req, resp) => {
  const {
    razaoSocial,
    cnpj,
    nomeFantasia,
    endereco,
    cidade,
    uf,
    cep,
    email,
    telefone,
  } = req.body;

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
        <title>Erros no cadastro</title>
        <style>
          body{font-family:Poppins;padding:20px;}
          .erro{background:#ffe5e5;color:#b30000;padding:12px;border-left:5px solid #ff4d4d;margin-bottom:10px;}
          a{display:inline-block;margin-top:20px;font-size:18px;}
        </style>
      </head>
      <body>
        <h2>Erros encontrados:</h2>
    `;

    if (!razaoSocial)
      conteudo += `<p class="erro">Por favor, informe a razão social.</p>`;
    if (!cnpj) conteudo += `<p class="erro">Por favor, informe o CNPJ.</p>`;
    if (!nomeFantasia)
      conteudo += `<p class="erro">Por favor, informe o nome fantasia.</p>`;
    if (!endereco)
      conteudo += `<p class="erro">Por favor, informe o endereço.</p>`;
    if (!cidade) conteudo += `<p class="erro">Por favor, informe a cidade.</p>`;
    if (!uf) conteudo += `<p class="erro">Por favor, informe a UF.</p>`;
    if (!cep) conteudo += `<p class="erro">Por favor, informe o CEP.</p>`;
    if (!email) conteudo += `<p class="erro">Por favor, informe o email.</p>`;
    if (!telefone)
      conteudo += `<p class="erro">Por favor, informe o telefone.</p>`;

    conteudo += `<a href="/cadastroFornecedor">Voltar ao formulário</a>
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

  for (let fornecedor of listaFornecedores) {
    conteudo += `
      <tr>
        <td>${fornecedor.razaoSocial}</td>
        <td>${fornecedor.cnpj}</td>
        <td>${fornecedor.nomeFantasia}</td>
        <td>${fornecedor.email}</td>
        <td>${fornecedor.telefone}</td>
        <td>${fornecedor.cep}</td>
        <td>${fornecedor.endereco}</td>
        <td>${fornecedor.cidade}</td>
        <td>${fornecedor.uf}</td>
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
  console.log(`Servidor rodando em http://${host}:${port}/cadastroFornecedor`);
});
