# Estratégia de ambientes e CI/CD (HostGator/cPanel)

Este documento descreve a estratégia de 3 ambientes do projeto, o passo a passo que o Victor
precisa executar no GitHub e no cPanel, e o passo a passo do que o Claude vai implementar no
código quando for pedido para colocar isso em prática.

**Status atual:** branches `dev`/`homolog`/`main`, branch protection, GitHub Environments e
secrets já configurados. Os workflows em `.github/workflows/` (seção 5) já existem no repositório.

## 1. Visão geral da estratégia de ambientes

| Branch    | Ambiente   | Domínio                              | Script de build | Deploy automático? | Quem comita direto        |
|-----------|-----------|----------------------------------------|------------------|---------------------|----------------------------|
| `dev`     | local     | nenhum (não sobe pra lugar nenhum)     | `build:dev`      | não                 | Victor + feature branches  |
| `homolog` | staging   | `homolog-victor.originaal.com.br`      | `build:hml`      | sim, a cada push    | ninguém (só via PR)        |
| `main`    | produção  | `victor.originaal.com.br`              | `build:prd`      | sim, a cada push    | ninguém (só via PR)        |

Os scripts `build:dev`, `build:hml` e `build:prd` já existem em [package.json](package.json) —
não é preciso criar nada novo ali, só usá-los nos workflows.

## 2. Fluxo do dia a dia

```
feature/* ou dev (local, commit livre)
        │  PR
        ▼
     homolog  ──push──▶ Actions builda (build:hml) e publica em
        │                 homolog-victor.originaal.com.br
        │  Victor valida no domínio de homolog
        │  PR (homolog → main)
        ▼
      main    ──push──▶ Actions builda (build:prd) e publica em
                          victor.originaal.com.br
```

Regra chave: `homolog` e `main` só recebem código via Pull Request. Ninguém — nem o Victor —
dá `git push` direto nelas; isso é reforçado por branch protection no GitHub (seção 3).

## 3. Passo a passo — GitHub (Victor executa)

### 3.1 Criar as branches

```bash
git checkout main
git pull
git checkout -b homolog
git push -u origin homolog

git checkout main
git checkout -b dev
git push -u origin dev
```

### 3.2 Branch protection (Settings → Branches → Add rule)

Para `main` e para `homolog`, criar uma regra cada com:
- **Require a pull request before merging** (marcado).
- **Do not allow bypassing the above settings** (marcado) — isso impede até admin de dar push direto.
- **Restrict who can push to matching branches**: deixar vazio/ninguém, já que o item acima já bloqueia push direto.
- **Allow force pushes**: desmarcado.
- **Allow deletions**: desmarcado.

`dev` fica **sem** proteção — commit livre, é o ambiente de trabalho.

### 3.3 GitHub Environments (Settings → Environments → New environment)

Criar dois: `homolog` e `production`. Isso permite:
- Guardar secrets específicos de cada ambiente (o caminho de deploy muda entre eles).
- Opcionalmente, marcar **Required reviewers** no environment `production`, criando uma segunda
  trava de aprovação manual antes do deploy final rodar (além da revisão do PR).

### 3.4 Secrets a cadastrar

Repository secrets (comuns aos dois ambientes, pois é a mesma conta cPanel/mesma chave SSH):
- `SFTP_HOST` — host SSH mostrado no cPanel.
- `SFTP_PORT` — porta SSH mostrada no cPanel.
- `SFTP_USERNAME` — usuário do cPanel.
- `SFTP_PRIVATE_KEY` — chave privada gerada no passo 4.1.

Secret por-ambiente (Settings → Environments → `homolog` / `production` → Environment secrets):
- `SFTP_REMOTE_PATH` — Document Root do subdomínio correspondente (diferente em cada ambiente).

## 4. Passo a passo — cPanel (Victor executa)

### 4.1 Chave SSH dedicada ao deploy

1. cPanel → **SSH Access** → **Manage SSH Keys** → **Generate a New Key**.
   - Nome: `github-actions-deploy`. Tipo: RSA 4096 (ou ED25519 se disponível).
2. **View/Download** a chave privada gerada — vai virar o secret `SFTP_PRIVATE_KEY`.
3. Voltar em **Manage SSH Keys** → localizar a chave pública correspondente → **Authorize**.

### 4.2 Host e porta

Na mesma tela **SSH Access**, o cPanel mostra algo como
`ssh usuario@servidor.hostgator.com -p 2222`. Anotar host e porta — viram `SFTP_HOST` e `SFTP_PORT`.

### 4.3 Subdomínio de homolog

Em **Domains** (ou **Subdomains**, dependendo da versão do cPanel):
1. Confirmar se `homolog-victor.originaal.com.br` já existe. Se não, criar.
2. Anotar o **Document Root** desse subdomínio → vira `SFTP_REMOTE_PATH` do environment `homolog`.
3. Anotar também o Document Root de `victor.originaal.com.br` → vira `SFTP_REMOTE_PATH` do
   environment `production`.

## 5. Workflows do GitHub Actions

Já existem em [.github/workflows/](.github/workflows/):

### 5.1 `.github/workflows/deploy-homolog.yml`

```yaml
name: Deploy to Homolog

on:
  push:
    branches: [homolog]
  workflow_dispatch: {}

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: homolog
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build (homolog)
        run: npm run build:hml

      - name: Deploy via SFTP
        uses: wlixcc/SFTP-Deploy-Action@v1.2.4
        with:
          username: ${{ secrets.SFTP_USERNAME }}
          server: ${{ secrets.SFTP_HOST }}
          port: ${{ secrets.SFTP_PORT }}
          ssh_private_key: ${{ secrets.SFTP_PRIVATE_KEY }}
          local_path: 'dist/*'
          remote_path: ${{ secrets.SFTP_REMOTE_PATH }}
          sftpArgs: '-o ConnectTimeout=10'
```

### 5.2 `.github/workflows/deploy-production.yml`

Igual ao anterior, trocando:
- `branches: [main]`
- `environment: production`
- `run: npm run build:prd`
- nome do job/arquivo para produção.

## 6. Verificação

- Depois de um push em `homolog`: aba **Actions** do GitHub mostra o workflow `Deploy to Homolog`
  passando; `homolog-victor.originaal.com.br` reflete a última alteração.
- Depois de um merge em `main`: workflow `Deploy to Production` passando;
  `victor.originaal.com.br` reflete a última alteração.
- Confirmar que um push em `dev` **não** dispara nenhum deploy (só os dois workflows acima têm
  trigger, e nenhum escuta `dev`).
- Tentar dar `git push` direto em `homolog` ou `main` deve ser rejeitado pelo GitHub por causa da
  branch protection — validação de que a proteção está ativa.
- Erros comuns no deploy: host/porta errados, chave privada colada sem as linhas
  `-----BEGIN/END ... KEY-----`, ou chave pública ainda não "Authorized" no cPanel.
