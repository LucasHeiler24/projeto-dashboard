let btnVoltar = $('#btnVoltar').hide();
let btnArrastar = $('#btnArrastar');
let btnDashboard = $('#btnDashboard');
let btnGraficos = $('#btnGraficos');
let btnDespesas = $('#btnDespesas');
let btnReceitas = $('#btnReceitas');
let link1 = $('#link1');
let link2 = $('#link2');
let link3 = $('#link3');
let link4 = $('#link4');

btnArrastar.click(function () {
    $(this).hide();
    btnVoltar.show();
    $('header').css({ 'width': '30%' });
    $('.content-background').css({'margin-left': '30%'});
    link1.text('Dashboard');
    link2.text('Seus Gráficos');
    link3.text('Suas despesas');
    link4.text('Suas receitas');

    btnVoltar.click(function () {
        btnArrastar.show();
        btnVoltar.hide();
        $('header').css({ 'width': '10%' });
        $('.content-background').css({'margin-left': '10%'});
        link1.text('');
        link2.text('');
        link3.text('');
        link4.text('');
    });
});

btnDashboard.click(function () {
    window.location.href = 'dashboard.html';
});

btnGraficos.click(function () {
    window.location.href = 'graficos.html';
});

btnDespesas.click(function () {
    window.location.href = 'despesas.html';
});

btnReceitas.click(function () {
    window.location.href = 'receitas.html';
});
