import dadosUsuario from "./dadosRequisicao.js";
import { dataAtual, formatarValor } from "./dadosRequisicao.js";


window.onload = function () {

    const divGraficoBarras = $('.content-graficos-barras');
    const divGraficoPizzaReceita = $('.graficoPizza1');
    const divGraficoPizzaDespesa = $('.graficoPizza2');

    (async () => {
        const dados = await dadosUsuario();
        if (dados['receitas'].length == 0)
            divGraficoPizzaReceita.append('<h1>Você não possui registros!</h1>');

        if (dados['receitas'].length == 0 && dados['despesas'].length == 0)
            divGraficoBarras.append('<h1>Você não possui registros!</h1>');

        if (dados['despesas'].length == 0)
            divGraficoPizzaDespesa.append('<h1>Você não possui registros!</h1>');


        const transformaArray = await Object.keys(dados).map(i => dados[i]);

        $('#dadoNome').text(`${transformaArray[0][0].nome}`);
        $('#dadoData').text(`${dataAtual}`);

        const corCategoriaReceitas = [];
        const nomeCategoriaReceita = [];
        const corCategoriaDespesas = [];
        const nomeCategoriaDespesa = [];
        let totalDespesa = 0.0;
        let totalReceita = 0.0;

        transformaArray[1].forEach(valor => {
            corCategoriaReceitas.push(valor.corCategoria);
            nomeCategoriaReceita.push(valor.categoria);
            totalReceita += valor.valorReceita;
        });

        transformaArray[2].forEach(valor => {
            corCategoriaDespesas.push(valor.corCategoria);
            nomeCategoriaDespesa.push(valor.categoria);
            totalDespesa += valor.valorDespesa;
        });

        const qtdCategoriasReceitas = [];
        const qtdCategoriasDespesas = [];

        for (let i = 0; i < nomeCategoriaReceita.length; i++) {
            let cont = 1;
            for (let j = i + 1; j < nomeCategoriaReceita.length; j++) {
                if (nomeCategoriaReceita[i] == nomeCategoriaReceita[j]) cont++;
            }
            qtdCategoriasReceitas.push(cont);

            for (let j = i + 1; j < nomeCategoriaReceita.length; j++) {
                if (nomeCategoriaReceita[i] == nomeCategoriaReceita[j]) {
                    nomeCategoriaReceita.splice(j, cont - 1);
                    corCategoriaReceitas.splice(j, cont - 1);
                }
            }
        }

        for (let i = 0; i < nomeCategoriaDespesa.length; i++) {
            let cont = 1;
            for (let j = i + 1; j < nomeCategoriaDespesa.length; j++) {
                if (nomeCategoriaDespesa[i] == nomeCategoriaDespesa[j]) cont++;
            }
            qtdCategoriasDespesas.push(cont);

            for (let j = i + 1; j < nomeCategoriaDespesa.length; j++) {
                if (nomeCategoriaDespesa[i] == nomeCategoriaDespesa[j]) {
                    nomeCategoriaDespesa.splice(j, cont - 1);
                    corCategoriaDespesas.splice(j, cont - 1);
                }
            }
        }

        new Chart(document.getElementById('graficoBarras').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    label: "Total: R$",
                    data: [totalReceita, totalDespesa],
                    backgroundColor: ['#1daf10cb', '#ad0c0c'],
                    borderColor: ['#1daf10cb', '#ad0c0c'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    label: {
                        color: ['#fff']
                    }
                },
                scales: {
                    y: {
                        display: false
                    }
                }
            }
        });

        new Chart(document.getElementById('graficoReceitaPizza').getContext('2d'), {
            type: 'pie',
            data: {
                labels: nomeCategoriaReceita,
                datasets: [{
                    label: "Quantidade de registros",
                    data: qtdCategoriasReceitas,
                    backgroundColor: corCategoriaReceitas,
                    borderColor: corCategoriaReceitas,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: 'block',
                        color: '#fff'
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    }
                }
            }
        });

        new Chart(document.getElementById('graficoDespesaPizza').getContext('2d'), {
            type: 'pie',
            data: {
                labels: nomeCategoriaDespesa,
                datasets: [{
                    label: "Quantidade de registros",
                    data: qtdCategoriasDespesas,
                    backgroundColor: corCategoriaDespesas,
                    borderColor: corCategoriaDespesas,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: 'block',
                        color: '#fff'
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    }
                }
            }
        });

    })()

}