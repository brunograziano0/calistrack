# Guia Git e GitHub para iniciantes — CalisTrack

Este guia assume que voce nunca usou Git. Siga na ordem, copiando e colando os comandos.

## Parte 1 — Instalar o que falta

1. **Instalar o Git**
   - Windows: baixe em https://git-scm.com/download/win e instale com as opcoes padrao (clique "Next" em tudo).
   - Mac: abra o Terminal e digite `git --version`; se nao tiver, o proprio macOS oferece para instalar.
   - Linux: `sudo apt install git` (Ubuntu/Debian) ou equivalente da sua distro.
   - Confirme a instalacao com:
     ```bash
     git --version
     ```

2. **Criar uma conta no GitHub**
   - Acesse https://github.com e crie sua conta gratuita, se ainda nao tiver.

3. **Configurar seu nome e e-mail no Git** (uma vez so, no computador)
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seuemail@exemplo.com"
   ```
   Use o mesmo e-mail da sua conta do GitHub.

## Parte 2 — Criar o repositorio no GitHub

1. No GitHub, clique no botao **+** no canto superior direito → **New repository**.
2. Preencha:
   - **Repository name**: `calistrack`
   - **Description**: "Sistema de treinos de calistenia"
   - Deixe como **Public** (ou Private, se preferir que so voce veja).
   - **NAO** marque "Add a README file", "Add .gitignore" ou "Choose a license" — o projeto ja tem esses arquivos prontos.
3. Clique em **Create repository**.
4. O GitHub vai te mostrar uma URL parecida com:
   `https://github.com/SEU_USUARIO/calistrack.git`
   Guarde essa URL, voce vai usar no proximo passo.

## Parte 3 — Autenticacao (fazer uma vez)

O GitHub nao aceita mais login por senha comum ao usar `git push` pelo terminal. Escolha uma opcao:

- **Opcao mais facil: GitHub Desktop** (interface grafica, sem comandos)
  1. Baixe em https://desktop.github.com e instale.
  2. Abra o GitHub Desktop e faca login com sua conta do GitHub.
  3. Va em **File → Add Local Repository**, selecione a pasta `calistrack` no seu computador.
  4. Se perguntar para inicializar um repositorio Git ali, confirme.
  5. Escreva uma mensagem tipo "Primeira versao do CalisTrack" no campo de commit, clique em **Commit to main**.
  6. Clique em **Publish repository** (ou **Push origin**, se ja tiver criado o repositorio no site).
  7. Pronto — pode pular direto para a Parte 5.

- **Opcao via terminal com token de acesso pessoal**
  1. No GitHub, clique na sua foto → **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
  2. **Generate new token (classic)**, marque a permissao `repo`, gere e copie o token (ele so aparece uma vez, salve em local seguro).
  3. Quando o terminal pedir usuario e senha no `git push`, use seu usuario do GitHub como login e o **token** como senha.

## Parte 4 — Subir o projeto pelo terminal

Abra o terminal **dentro da pasta `calistrack`** (a pasta que contem `package.json`) e rode, um comando por vez:

```bash
git init
```
Cria o repositorio Git local dentro da pasta.

```bash
git add .
```
Adiciona todos os arquivos do projeto para serem enviados (o `.gitignore` ja evita subir `node_modules` e senhas).

```bash
git commit -m "feat: primeira versao do CalisTrack"
```
Salva um "ponto de restauracao" com todos os arquivos adicionados.

```bash
git branch -M main
```
Garante que a branch principal se chama `main` (padrao atual do GitHub).

```bash
git remote add origin https://github.com/SEU_USUARIO/calistrack.git
```
Conecta seu projeto local ao repositorio que voce criou no site (troque `SEU_USUARIO` pelo seu usuario real).

```bash
git push -u origin main
```
Envia tudo para o GitHub. Se pedir login, use seu usuario e o token de acesso pessoal (Parte 3).

Depois disso, atualize a pagina do repositorio no GitHub — todos os arquivos devem aparecer la.

## Parte 5 — Proximas atualizacoes (sempre que voce mudar algo)

Sempre que editar o codigo e quiser salvar a nova versao no GitHub, repita apenas estes 3 comandos:

```bash
git add .
git commit -m "descreva o que voce mudou"
git push
```

## Parte 6 — Publicar o site (deploy) na Vercel

1. Acesse https://vercel.com e entre com sua conta do GitHub.
2. Clique em **Add New → Project**.
3. Selecione o repositorio `calistrack` na lista (a Vercel pede permissao para acessar seus repositorios do GitHub — autorize).
4. Em **Environment Variables**, adicione (copiando do seu `.env.local`):
   - `NEXT_PUBLIC_USE_SUPABASE`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_DEFAULT_TIMEZONE`
   - (quando for usar Supabase) `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
5. Clique em **Deploy**. Em 1-2 minutos a Vercel te da uma URL publica, tipo `https://calistrack.vercel.app`.
6. A partir de agora, todo `git push` que voce fizer no `main` atualiza o site automaticamente.

## Erros comuns

- **"git: command not found"** → o Git nao foi instalado corretamente; reinicie o terminal apos instalar.
- **"remote origin already exists"** → rode `git remote remove origin` e depois repita o comando `git remote add origin ...`.
- **Pedindo senha e nao aceita a senha normal do GitHub** → use o token de acesso pessoal (Parte 3), nao a senha da conta.
- **"failed to push some refs"** → normalmente e porque o repositorio remoto ja tem um arquivo (ex: README criado pelo GitHub). Rode `git pull origin main --allow-unrelated-histories` e resolva conflitos se aparecerem, depois `git push` novamente. Por isso a Parte 2 pede para NAO marcar "Add a README" ao criar o repositorio.
