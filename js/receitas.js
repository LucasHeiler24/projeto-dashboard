import { dataAtual, formatarValor, formatarData } from "./dadosRequisicao.js";
import dadosUsuario from "./dadosRequisicao.js";

window.onload = function () {
    const divDespesas = document.getElementById('mostrarReceitas');
    let inputTextFiltro = document.getElementById('inFiltro');
    let opcaoFiltrar = document.getElementById('opFiltro');
    let inputDataFiltro = document.getElementById('inData');

    (async () => {
        const dados = await dadosUsuario();
        if (dados['receitas'].length == 0) {
            divDespesas.append('<h1>Você não possui registros!</h1>');
            return;
        }

        const transformaArray = Object.keys(dados).map(i => dados[i]);


        $('#dadoNome').text(`${transformaArray[0][0].nome}`);
        $('#dadoData').text(`${dataAtual}`);

        function filtrarDadosNome(valorPesquisado) {
            return transformaArray[1].filter(dados => {
                return dados.nomeReceita.toLowerCase().includes(valorPesquisado.toLowerCase());
            })
        }

        function filtrarDadosCategoria(valorPesquisado) {
            return transformaArray[1].filter(dados => {
                return dados.categoria.toLowerCase().includes(valorPesquisado.toLowerCase());
            })
        }

        function filtrarDadosData(dataPesquisado) {
            return transformaArray[1].filter(dados => {
                return dados.dataReceita.includes(dataPesquisado);
            })
        }

        opcaoFiltrar.onchange = function () {
            if (this.value == "0") return;

            if (this.value == "dataReceita") {
                inputTextFiltro.value = "";
                inputDataFiltro.value = "";
                inputTextFiltro.style.display = 'none';
                inputDataFiltro.style.display = 'block';

                inputDataFiltro.addEventListener('input', () => {
                    divDespesas.innerHTML = "";
                    const dadosFiltrados = filtrarDadosData(inputDataFiltro.value);
                    if (dadosFiltrados.length == 0) {
                        dadosPesquisaVazio();
                        return;
                    }
                    dadosFiltrados.forEach(valor => {
                        criarEMostrarDespesa(valor.corCategoria, valor.categoria, valor.nomeReceita,
                        valor.valorReceita, valor.descricao, valor.dataReceita);
                    });
                })
            }
            else if (this.value == "categoria") {
                inputTextFiltro.value = "";
                inputDataFiltro.value = "";
                inputTextFiltro.style.display = 'block';
                inputDataFiltro.style.display = 'none';

                inputTextFiltro.addEventListener('keyup', () => {
                    divDespesas.innerHTML = "";
                    const dadosFiltrados = filtrarDadosCategoria(inputTextFiltro.value);
                    if (dadosFiltrados.length == 0) {
                        dadosPesquisaVazio();
                        return;
                    }
                    dadosFiltrados.forEach(valor => {
                        criarEMostrarDespesa(valor.corCategoria, valor.categoria, valor.nomeReceita,
                        valor.valorReceita, valor.descricao, valor.dataReceita);
                    });
                });
            }
            else {
                inputTextFiltro.value = "";
                inputDataFiltro.value = "";
                inputTextFiltro.style.display = 'block';
                inputDataFiltro.style.display = 'none';

                inputTextFiltro.addEventListener('keyup', () => {
                    divDespesas.innerHTML = "";
                    const dadosFiltrados = filtrarDadosNome(inputTextFiltro.value);
                    if (dadosFiltrados.length == 0) {
                        dadosPesquisaVazio();
                        return;
                    }
                    dadosFiltrados.forEach(valor => {
                        criarEMostrarDespesa(valor.corCategoria, valor.categoria, valor.nomeReceita,
                        valor.valorReceita, valor.descricao, valor.dataReceita);
                    });
                });
            }
        }


        transformaArray[1].forEach(valor => {
            criarEMostrarDespesa(valor.corCategoria, valor.categoria, valor.nomeReceita,
                valor.valorReceita, valor.descricao, valor.dataReceita);
        });

        function dadosPesquisaVazio() {
            let h1SemItem = document.createElement('h1');
            h1SemItem.textContent = "Nenhuma receita encontrada!";
            divDespesas.appendChild(h1SemItem);
        }

        function criarEMostrarDespesa(corCategoria, nomeCategoria, nomeReceita, valorReceita, descricao, dataReceita) {
            let divConteudoRegistros = document.createElement('div');
            divConteudoRegistros.style = 'border-top: 1px solid #000; width: 100%; display:flex; justify-content: space-around; align-items:center; padding-top: 10px;';
            let divDetalhesRegistro = document.createElement('div');
            let divCirculo = document.createElement('div');
            divCirculo.style = `width: 50px; height: 50px; border-radius: 15px; background: ${corCategoria}`;
            let h1nomeCategoria = document.createElement('h1');
            let h1valorReceita = document.createElement('h1');
            let h1nomeReceita = document.createElement('h1');
            let h1descricao = document.createElement('p');
            let h1dataReceita = document.createElement('h1');

            divDetalhesRegistro.style = 'width: 100%; flex-direction: column; padding-bottom:10px; display:flex; justify-content: space-around; align-items:center; padding-top: 10px;';

            h1nomeReceita.textContent = `${nomeReceita}`;
            if (descricao == "") h1descricao.textContent = "Sem descrição!";
            else h1descricao.textContent = `Descrição: ${descricao}`;

            divDetalhesRegistro.appendChild(h1nomeReceita);
            divDetalhesRegistro.appendChild(h1descricao);

            h1nomeCategoria.textContent = `${nomeCategoria}`;
            h1valorReceita.textContent = `${formatarValor.format(valorReceita)}`;
            h1dataReceita.textContent = `${formatarData(dataReceita)}`;

            divConteudoRegistros.appendChild(divCirculo);
            divConteudoRegistros.appendChild(h1nomeCategoria);
            divConteudoRegistros.appendChild(h1valorReceita);
            divConteudoRegistros.appendChild(h1dataReceita);
            divDespesas.append(divConteudoRegistros);
            divDespesas.append(divDetalhesRegistro);
        }
    })()
}