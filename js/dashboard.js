import dadosUsuario from "./dadosRequisicao.js";
import { dataAtual, formatarValor, formatarData} from "./dadosRequisicao.js";

window.onload = function () {

    const divRegistros = $('.registros-usuario-receitas');
    const divRegistrosDespesas = $('.registros-usuario-despesas');

    (async () => {
        const dados = await dadosUsuario();

        const transformaArray = await Object.keys(dados).map(i => dados[i]);

        divRegistros.css({ 'width': '100%', 'display': 'flex',
        'justify-content': 'center', 'align-items': 'center',
        'padding': '10px', 'border-radius': '10px', 'display': 'block',
        'border': '1px solid #000' });

        divRegistrosDespesas.css({ 'width': '100%', 'display': 'flex',
        'justify-content': 'center', 'align-items': 'center',
        'padding': '10px', 'border-radius': '10px', 'display': 'block',
        'border': '1px solid #000' });

        $('#dadoNome').text(`${transformaArray[0][0].nome}`);
        $('#dadoData').text(`${dataAtual}`);

        let totalDespesa = 0.0;
        let totalReceita = 0.0;
        let totalSaldo = 0.0;

        transformaArray[1].forEach((valor) => {
            if (valor.recebido) totalReceita += valor.valorReceita;
        });

        transformaArray[2].forEach((valor) => {
            if (valor.pago) totalDespesa += valor.valorDespesa;
        });

        totalSaldo = totalReceita - totalDespesa;

        $('#minhasReceitas').text(`${formatarValor.format(totalReceita)}`);
        $('#meuSaldo').text(`${formatarValor.format(totalSaldo)}`);
        $('#minhasDespesas').text(`${formatarValor.format(totalDespesa)}`);

        if (dados['receitas'].length == 0) {
            divRegistros.append('<h1>Você não possui registros!</h1>');
        }
        else{
            for(let i=transformaArray[1].length-1; i>=transformaArray[1].length-3; i--){
                const divUltimosRegistros = document.createElement('div');
                divUltimosRegistros.style = 'overflow-y: auto; display:flex; justify-content:space-around; align-items:center; border-bottom: 1px solid #000; padding-top: 10px; padding-bottom: 10px;';
                const categoria = document.createElement('div');
                const nomeReceita = document.createElement('h1');
                const dataReceita = document.createElement('h1');
                const valorReceita = document.createElement('h1');
                const btnVerRegistros = document.createElement('a');

                btnVerRegistros.href = 'receitas.html';

                categoria.style = `background: ${transformaArray[1][i].corCategoria}; width:50px; height:50px; border-radius:15px`;
                btnVerRegistros.style = 'text-decoration: none; padding:10px 10px 10px 10px; background:#8A28E2; color:#fff; border-radius:5px; cursor:pointer';
                nomeReceita.textContent = transformaArray[1][i].nomeReceita;
                valorReceita.textContent = formatarValor.format(transformaArray[1][i].valorReceita);
                dataReceita.textContent = formatarData(transformaArray[1][i].dataReceita);
                btnVerRegistros.textContent = "Ver registro";
                
                divUltimosRegistros.appendChild(categoria);
                divUltimosRegistros.appendChild(nomeReceita);
                divUltimosRegistros.appendChild(valorReceita);
                divUltimosRegistros.appendChild(dataReceita);
                divUltimosRegistros.appendChild(btnVerRegistros);
                divRegistros.append(divUltimosRegistros);
            }
        }

        if(dados['despesas'].length == 0){
            divRegistrosDespesas.append('<h1>Você não possui registros!</h1>');
        }
        else{
            for(let i=transformaArray[2].length-1; i>=transformaArray[2].length-3; i--){
                const divUltimosRegistros = document.createElement('div');
                divUltimosRegistros.style = 'overflow-y: auto; display:flex; justify-content:space-around; align-items:center; border-bottom: 1px solid #000; padding-top: 10px; padding-bottom: 10px;';
                const categoria = document.createElement('div');
                const nomeReceita = document.createElement('h1');
                const dataReceita = document.createElement('h1');
                const valorReceita = document.createElement('h1');
                const btnVerRegistros = document.createElement('a');

                btnVerRegistros.href = 'despesas.html';

                categoria.style = `background: ${transformaArray[2][i].corCategoria}; width:50px; height:50px; border-radius:15px`;
                btnVerRegistros.style = 'text-decoration: none; padding:10px 10px 10px 10px; background:#8A28E2; color:#fff; border-radius:5px; cursor:pointer';
                nomeReceita.textContent = transformaArray[2][i].nomeDespesa;
                valorReceita.textContent = formatarValor.format(transformaArray[2][i].valorDespesa);
                dataReceita.textContent = formatarData(transformaArray[2][i].dataDespesa);
                btnVerRegistros.textContent = "Ver registro";
                
                divUltimosRegistros.appendChild(categoria);
                divUltimosRegistros.appendChild(nomeReceita);
                divUltimosRegistros.appendChild(valorReceita);
                divUltimosRegistros.appendChild(dataReceita);
                divUltimosRegistros.appendChild(btnVerRegistros);
                divRegistrosDespesas.append(divUltimosRegistros);
            }
        }
    
    })()
}