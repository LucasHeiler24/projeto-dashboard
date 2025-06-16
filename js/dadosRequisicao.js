async function dadosUsuario() {
    try {
        const dadosJson = await fetch('json/dadosUsuario.json');
        return await dadosJson.json();
    }
    catch (e) {
        console.error(e);
    }
};

const data = new Date();
const dataAtual = data.toLocaleDateString();

const formatarValor = new Intl.NumberFormat('pt-BR', {
    style: "currency",
    currency: "BRL"
});


function formatarData(data) {
    let arrayData = data.split('-');
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
}


export { dataAtual, formatarValor, formatarData }
export default dadosUsuario