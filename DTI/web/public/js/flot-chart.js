var Script = function () {


//    selection chart

    $(function () {
        var data = [
            {
                label: "Valor Esperado",
                data: [[1990, 18.9], [2006, 18.9]]
            },
            {
                label: "Progreso del indicador",
                data: [[2000, 7.9], [2001, 8.9], [2002, 10.9], [2003, 10.11], [2004, 11.5],[2005, 12.5],[2006, 17.5]]
            },

        ];

        var options = {
            series: {
                lines: { show: true },
                points: { show: true }
            },
            legend: { noColumns: 2 },
            xaxis: { tickDecimals: 0 },
            yaxis: { min: 0 },
            selection: { mode: "x" }
        };

        var placeholder = $("#chart-2");

        placeholder.bind("plotselected", function (event, ranges) {
            $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

            var zoom = $("#zoom").attr("checked");
            if (zoom)
                plot = $.plot(placeholder, data,
                    $.extend(true, {}, options, {
                        xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
                    }));
        });

        placeholder.bind("plotunselected", function (event) {
            $("#selection").text("");
        });

        var plot = $.plot(placeholder, data, options);

        $("#clearSelection").click(function () {
            plot.clearSelection();
        });

        $("#setSelection").click(function () {
            plot.setSelection({ xaxis: { from: 1994, to: 1995 } });
        });
    });



}();
