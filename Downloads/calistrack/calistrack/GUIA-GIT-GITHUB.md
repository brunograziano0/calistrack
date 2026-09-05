# Guia rapido - atualizar o GitHub com a versao completa

Voce ja tem o repositorio `calistrack` publicado. Agora vamos substituir os arquivos pela versao
completa (agenda, rotina, treino, exercicios, progresso e perfil).

## Passo 1 - Copiar os arquivos novos

1. Extraia o novo `.zip` que recebi.
2. Copie TODO o conteudo da pasta extraida `calistrack` para dentro da sua pasta de projeto atual
   (a que contem o `package.json`, por exemplo `Downloads\calistrack\calistrack`), substituindo os
   arquivos existentes quando o Windows perguntar.

## Passo 2 - Testar localmente (opcional mas recomendado)

Abra o terminal dentro da pasta do projeto:
```cmd
npm install
npm run dev
```
Acesse http://localhost:3000 e teste o fluxo: Comecar agora -> Cadastro -> Onboarding -> Rotina -> Agenda -> Iniciar treino.

## Passo 3 - Enviar para o GitHub

Ainda no terminal, dentro da pasta do projeto:
```cmd
git add .
git commit -m "feat: telas completas do CalisTrack (agenda, rotina, treino, exercicios, progresso, perfil)"
git push
```

Se pedir login, use seu usuario do GitHub e o token de acesso pessoal (o mesmo de antes).

## Passo 4 - Conferir o deploy

A Vercel detecta o push automaticamente e atualiza o site em 1-2 minutos.
Acesse a URL que ja funcionou antes (ex: `calistrack-gamma.vercel.app/dashboard`) e atualize a pagina
para ver a nova versao no ar.
