
# DiarioAcademia

Para executar este projeto em seu potencial é necessário ter um servidor Node rodando na máquina.

#### Dependencias
Todas as dependencias podem ser opcionalmente instaladas através do [Chocolatey](https://chocolatey.org/).

#####NodeJS
* Obtenha o NodeJS pelo:
 * [Site oficial](https://nodejs.org/), ou use
 * `choco install nodejs`
 
#####Python
* Instale o Python por:
 * [Instalador](https://www.python.org/ftp/python/2.7.3/python-2.7.3.msi), ou use
 * `choco install python`


#####git
* Obtenha o git pelo:
 * [Site oficial](https://git-for-windows.github.io/), ou use
 * `choco install git`
 
#### Baixando o Projeto

O download do projeto pode ser feito de 3 formas:

1) Através do [download do zip](https://github.com/AlexandreRech/DiarioAcademia/archive/master.zip)

2) Através do github para desktop *(recomendado)*:

 - Baixe do [GitHub for desktop](https://desktop.github.com/)
 - Após instalar, clique em [Clone in Desktop](github-windows://openRepo/https://github.com/AlexandreRech/DiarioAcademia)

3) Através do `git` seguindo os passos:

        -aponte para a pasta da solução
     > git clone https://github.com/AlexandreRech/DiarioAcademia.git

#### Preparando o ambiente

##### Resumo dos comandos
    > npm install npm -g
        -reinicie o prompt
    > npm install gulp bower -g
        -reinicie o prompt
        -aponte para a pasta do projeto web
    > npm install
        -Avisos em relação ao phyton na instalação podem ser ignorados.
    > bower install
    > gulp start


##### Detalhes
* Inicie o prompt com permissões de administrador e apontando para a pasta do projeto web (onde está o `gulpfile.js`)
* Instale a versão mais atual do npm  `> npm install npm -g`
* Instale gulp e bower globalmente inserindo no prompt `> npm install gulp bower -g`
 * Será instalado na pasta de sistema `AppData` no caso do Windows
* Execute o comando `npm install`
 * O Node vai ler e baixar cada uma das dependencias listadas em `package.json`
* Instale todas as dependencias do client com `> bower install`
 * O Node vai ler e baixar cada uma das dependencia listadas em `bower.json`
* Insira simplesmente `> gulp`. 
 * Se tudo estiver ok, o prompt irá listar todas as tasks do gulp

#### Executando
Basicamente deve estar executando a API e um dos projetos web à escolha:

* Web Api
 * No Visual Studio, set o projeto `Distributed Services\Webapi`  `as StartUp Project` e o execute
* Web App ([layout](https://raw.githubusercontent.com/AlexandreRech/DiarioAcademia/master/media/webapp.png))
 * Projeto com arquitetura separados por tipos (*controllers, services, routes, etc.*)
 * Com o prompt apontado para a [pasta raíz](https://github.com/AlexandreRech/DiarioAcademia/tree/master/NDDigital.DiarioAcademia.Apresentacao.WebApp) do projeto web, insira `> gulp start`
* AngleTry ([layout](https://raw.githubusercontent.com/AlexandreRech/DiarioAcademia/master/media/angletry.PNG))
 * Projeto com arquitetura separados por features (*aluno, turma, login, etc.*)
 * Com o prompt apontado para a [pasta raíz](https://github.com/AlexandreRech/DiarioAcademia/tree/master/NDDigital.DiarioAcademia.Apresentacao.AngleTry) do projeto web, insira `> gulp start`
 
A aplicação já deve estar executando em  [http://localhost:3000](http://localhost:3000). Lembrando que para tudo funcionar corretamente, o projeto [Webapi](https://github.com/AlexandreRech/DiarioAcademia/tree/master/NDDigital.DiarioAcademia.WebApi) deve estar executando no IIS.

##### Troubleshooting
Caso dê algum problema relacionado ao `CL.exe`, certifique-se de ter o Visual Studio instalado e execute o comando:

    npm config set msvs_version yyyy --global

Substituindo `yyyy`pela versão do VS (exemplo: `2013`)

Para demais erros de variavel de ambiente, um simples reiniciar de prompt deve resolver.
