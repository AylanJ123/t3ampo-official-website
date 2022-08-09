function renderChart(){
    //metodo de la API -> google.visualization.arrayToDataTable
    var data = google.visualization.arrayToDataTable([
        ['Games', 'Downloads'],
        ['Brighter Toghether', 43],
        ['Dual Match!', 61],
        ['Mix it!', 65],
        ['Duotopia', 74],
        ['Groabia Times', 89],
    ]);

    //Opcional, añadir estilos a la gráfica, en este caso, el título, los ejes y los valores
    var options = {
        chartArea: {width: '100%', height: '100%'},
        responsive: true,
        backgroundColor: 'transparent'
    };

    //Creacion de un objeto usando el metodo Barchart
    //Este metodo pide como parametro donde queremos mostrar el chart
    var chart = new google.visualization.PieChart(document.getElementById('chart'));

    //para mostrar este grafico, usamos el metodo draw pasandole los datos y opciones
    chart.draw(data, options);
}
//Ultimo metodo de la API, cumple la funcion de configurar la devolucion de la carga, pasandole la funcion anterior
google.setOnLoadCallback(renderChart);

window.addEventListener('resize', renderChart)