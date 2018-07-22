    $(document).ready(function () {
        jQuery.validator.addMethod("txtsg",function (value,element) {
            return this.optional( element ) || /^^[0-9a-zA-Z_áéíóúñ\s\-]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras, espacios y guiones");
        jQuery.validator.addMethod("cod",function (value,element) {
            return this.optional( element ) || /[0-9][0-9][0-9][0-9]$/.test( value );
        },"Este valor es incorrecto, unicamente permite 4 números");
        jQuery.validator.addMethod("txts",function (value,element) {
            return this.optional( element ) || /^^[a-zA-Z_áéíóúñ\s]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras y espacios");
        jQuery.validator.addMethod("txt",function (value,element) {
            return this.optional( element ) || /^^[a-zA-Z_áéíóúñ]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras");
        jQuery.validator.addMethod("dui",function (value,element) {
            return this.optional( element ) || /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9]$/.test( value );
        },"Un Dui valido está formado por 9 dígitos");
        jQuery.validator.addMethod("exp",function (value,element) {
            return this.optional( element ) || /^[A-Z][0-9][0-9][0-9]$/.test( value );
        },"Este valor es incorrecto, unicamente permite el siguiente formato X### primera letra mayúscula");
        jQuery.validator.addMethod("telcel",function (value,element) {
            return this.optional( element ) || /^[6-7][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/.test( value );
        },"Este valor es incorrecto, unicamente permite el siguiente formato ####-####");
        jQuery.validator.addMethod("telcasa",function (value,element) {
            return this.optional( element ) || /^[2][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/.test( value );
        },"Este valor es incorrecto, unicamente permite el siguiente formato ####-####");
        jQuery.validator.addMethod("dir",function (value,element) {
            return this.optional( element ) || /^^[a-zA-Z0-9_áéíóúñ.,#\s]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras, espacios, números, puntos, comas y #");
        jQuery.validator.addMethod("nom",function (value,element) {
            return this.optional( element ) || /^^[a-zA-Z0-9_áéíóúñ.,+%\s\-]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras, espacios, números, puntos, comas y guiones");
        jQuery.validator.addMethod("neg",function (value,element) {
            return this.optional( element ) || /^^[a-zA-Z0-9_áéíóúñ.,$+%\s\-]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras, espacios, números, puntos, comas, guiones y $");
        jQuery.validator.addMethod("txtnumber",function (value,element) {
            return this.optional( element ) || /^^[0-9a-zA-Z_áéíóúñ\s]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite letras, números y espacios");
        jQuery.validator.addMethod("txtn",function (value,element) {
            return this.optional( element ) || /^[0-9]*[A-Z]*$/.test( value );
        },"Este valor es incorrecto, unicamente permite numeros y letras de esta forma 999XX");
        jQuery.validator.addMethod("number3",function (value,element) {
            return this.optional( element ) || /^[0-9]+([.][0-9][0-9])$/.test( value );
        },"Incorrecto");
        jQuery.validator.addMethod("valueNotEquals", function(value, element, arg){
            return arg != value;
        }, "Por favor Elija un Opción.");
        jQuery.validator.addMethod(
            "maxfilesize",
            function (value, element) {
                return this.optional(element) || (element.files && element.files[0]
                    && element.files[0].size < 1024 * 200);
            },
            'La Imagen no puede exceder los 200 KB.'
        );

        var form = $("#wizard-validation-form");
        form.validate({
            rules: {

                //Generales
                imagen: {maxfilesize: true},
                codigo: {required: true, cod: true},
                codigo2: {minlength: 3},
                tipo: {valueNotEquals: 0 },
                linea: {valueNotEquals: 0 },
                alianza: {valueNotEquals: 0 },
                nombre: {required: true, nom: true},
                vineta: {valueNotEquals: 0 },
                estado: {valueNotEquals: 0 },
                comentario: {nom: true},
                negociacion: {neg: true},
                precioUnitario: {number3: true, range: [0, 200]},
                precioPublico: {required: true, number3: true, range: [1, 200]},
                descuento: {required: true, number3: true, range: [0,100]},
                precioSugerido: {number3: true, range: [1, 200]},
                precioEfectivo: {required: true, number3: true, range: [1, 200]},

                sPrecioEfectivo: {required: true, number3: true, min: 0},
                sCostoUnitario: {required: true, number3: true, min: 0}

            },
            messages: {

                //Generales
                codigo: {
                    required: "El Código es Obligatorio",
                    cod: "Un Código válido está formado únicamente por cuatro números"
                },
                tipo: {
                    valueNotEquals: "Seleccione un Tipo, este campo es obligatorio"
                },
                linea: {
                    valueNotEquals: "Seleccione un Línea, este campo es obligatorio"
                },
                alianza: {
                    valueNotEquals: "Seleccione una Alianza, este campo es obligatorio"
                },
                nombre: {
                    required: "El Nombre es Obligatorio",
                    nom: "Un Nombre válido esta formado únicamente por letras, números, guiones, puntos, comas, espacios en blanco, signos de porcentaje, dolar y +"
                },
                vineta: {
                    valueNotEquals: "Seleccione una Viñeta, este campo es obligatorio"
                },
                estado: {
                    valueNotEquals: "Seleccione un Estado, este campo es obligatorio"
                },
                comentario: {
                    nom: "Un Comentario válido esta formado únicamente por letras, números, guiones, puntos, comas, espacios en blanco, signos de porcentaje, dolar y +"
                },
                negociacion: {
                    neg: "Una Negociación válida esta formado únicamente por letras, números, guiones, puntos, comas, espacios en blanco, signos de dolár, porcentajes y signo +"
                },
                precioUnitario: {
                    number3: "Un Precio Unitario válido esta formado solo por números y decimales",
                    range: "Por favor, escribe un valor entre {0} y {1} doláres"
                },
                precioPublico: {
                    required: "El Precio Publico es Obligatorio",
                    number3: "Un Precio Público válido esta formado solo por números y decimales",
                    range: "Por favor, escribe un valor entre {0} y {1} doláres"
                },
                descuento: {
                    required: "El Descuento es Obligatorio",
                    number3: "Un Descuento válido esta formado solo por números y decimales",
                    range: "Por favor, escribe un valor entre {0} y {1}"
                },
                precioSugerido: {
                    number3: "Un Precio Sugerido válido esta formado solo por números y decimales",
                    range: "Por favor, escribe un valor entre {0} y {1} doláres"
                },
                precioEfectivo: {
                    required: "El Precio Efectivo es Obligatorio",
                    number3: "Un Precio Efectivo válido esta formado solo por números y decimales",
                    range: "Por favor, escribe un valor entre {0} y {1} doláres"
                },

                sPrecioEfectivo: {
                    required: "El Precio Efectivo es Obligatorio",
                    number3: "Un Precio Efectivo válido esta formado solo por números y decimales",
                    min: "Por favor, escribe un valor ser mayor o igual a {0} doláres"
                },
                sCostoUnitario: {
                    required: "El Costo Unitario es Obligatorio",
                    number3: "Un Costo Unitario válido esta formado solo por números y decimales",
                    min: "Por favor, escribe un valor ser mayor o igual a {0} doláres"
                }
            },
            errorPlacement: function errorPlacement(error, element) {

                //Generales
                if(element.attr("name")=="imagen"){
                    error.appendTo('#errorImagen');
                }
                if(element.attr("name")=="codigo"){
                    error.appendTo('#errorCodigo');
                }
                if(element.attr("name")=="codigo2"){
                    error.appendTo('#errorCodigo2');
                }
                if(element.attr("name")=="tipo"){
                    error.appendTo('#errorTipo');
                }
                if(element.attr("name")=="linea"){
                    error.appendTo('#errorLinea');
                }
                if(element.attr("name")=="alianza"){
                    error.appendTo('#errorAlianza');
                }
                if(element.attr("name")=="nombre"){
                    error.appendTo('#errorNombre');
                }
                if(element.attr("name")=="vineta"){
                    error.appendTo('#errorVineta');
                }
                if(element.attr("name")=="estado"){
                    error.appendTo('#errorEstado');
                }
                if(element.attr("name")=="comentario"){
                    error.appendTo('#errorComentario');
                }
                if(element.attr("name")=="negociacion"){
                    error.appendTo('#errorNegociacion');
                }
                if(element.attr("name")=="precioUnitario"){
                    error.appendTo('#errorPrecioUnitario');
                }
                if(element.attr("name")=="precioPublico"){
                    error.appendTo('#errorPrecioPublico');
                }
                if(element.attr("name")=="descuento"){
                    error.appendTo('#errorDescuento');
                }
                if(element.attr("name")=="precioSugerido"){
                    error.appendTo('#errorPrecioSugerido');
                }
                if(element.attr("name")=="precioEfectivo"){
                    error.appendTo('#errorPrecioEfectivo');
                }
                if(element.attr("name")=="sPrecioEfectivo"){
                    error.appendTo('#sErrorPrecioEfectivo');
                }
                if(element.attr("name")=="sCostoUnitario"){
                    error.appendTo('#sErrorCostoUnitario');
                }
            }
        });
        form.children("div").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            onStepChanging: function (event, currentIndex, newIndex) {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            },
            onFinishing: function (event, currentIndex) {
                form.validate().settings.ignore = ":disabled";
                return form.valid();
            },
            onFinished: function (event, currentIndex) {
                alertar()
            }
        });
        jQuery.extend(jQuery.validator.messages, {
            required: "Este campo es obligatorio",
            remote: "Por favor, rellena este campo",
            email: "Por favor, escribe una dirección de correo válida",
            url: "Por favor, escribe una URL válida",
            date: "Por favor, escribe una fecha válida",
            dateISO: "Por favor, escribe una fecha (ISO) válida",
            number: "Por favor, escribe un número entero válido",
            digits: "Por favor, escribe sólo dígitos",
            creditcard: "Por favor, escribe un número de tarjeta válido",
            equalTo: "Por favor, escribe el mismo valor de nuevo",
            accept: "Por favor, escribe un valor con una extensión aceptada",
            maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres"),
            minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres"),
            rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres"),
            range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}"),
            max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}"),
            min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}")
        });

        $("#precioUnitario").keyup(function () {
            var precioPublico = 0;
            var precioUnitario = 0;
            if($("#precioPublico").val().length != 0 || $("#precioUnitario").val().length != 0){
                precioPublico = parseFloat(document.getElementById('precioPublico').value);
                precioUnitario = parseFloat(document.getElementById('precioUnitario').value);
            }else{
                precioPublico = parseFloat(0);
                precioUnitario = parseFloat(0);
                $("#errorpreciopublico").empty();
                $("#errorPrecioUnitario").empty();
            }
            if(precioUnitario < precioPublico){
                $("#errorPrecioUnitario").empty();
                $("#errorPrecioPublico").empty();
            }else{
                $('#errorPrecioUnitario').text('El Precio Unitario tiene que ser menor Precio Público. ');
            }
        });

        $("#precioPublico").keyup(function () {

            var precioUnitario = 0;
            var precioPublico = parseFloat(document.getElementById('precioPublico').value);
            var descuento = parseFloat(document.getElementById('descuento').value);
            var precioEfectivo = parseFloat(document.getElementById('precioEfectivo').value);
            var calculado = precioPublico*((100-descuento)/100);
            $("#precioSugerido").val(calculado.toFixed(2));

            if($("#precioUnitario").val().length != 0){
                precioUnitario = parseFloat(document.getElementById('precioUnitario').value);
            }else{
                precioUnitario = parseFloat(0);
            }

            if(precioPublico > precioUnitario){
                $("#errorPrecioPublico").empty();
                $("#errorPrecioUnitario").empty();
            }else{
                $('#errorPrecioPublico').text('El Precio Publico tiene que ser mayor al Precio Unitario. ');
            }
            var precioSugerido = parseFloat(document.getElementById('precioSugerido').value);
            if(precioEfectivo >= precioSugerido){
                $("#errorPrecioEfectivo").empty();
            }else{
                $('#errorPrecioEfectivo').text('El Precio Efectivo tiene que ser mayor o igual al Precio Sugerido. ');
            }
        });

        $("#descuento").keyup(function () {

            var precioPublico = parseFloat(document.getElementById('precioPublico').value);
            var descuento = parseFloat(document.getElementById('descuento').value);
            var precioEfectivo = parseFloat(document.getElementById('precioEfectivo').value);
            var calculado = precioPublico*((100-descuento)/100);
            $("#precioSugerido").val(calculado.toFixed(2));

            var precioSugerido = parseFloat(document.getElementById('precioSugerido').value);
            if(precioEfectivo >= precioSugerido){
                $("#errorPrecioEfectivo").empty();
            }else{
                $('#errorPrecioEfectivo').text('El Precio Efectivo tiene que ser mayor o igual al Precio Sugerido. ');
            }
        });

        $("#precioEfectivo").keyup(function () {
            var precioSugerido = parseFloat(document.getElementById('precioSugerido').value);
            var precioEfectivo = parseFloat(document.getElementById('precioEfectivo').value);
            if(precioEfectivo >= precioSugerido){
                $("#errorPrecioEfectivo").empty();
            }else{
                $('#errorPrecioEfectivo').text('El Precio Efectivo tiene que ser mayor o igual al Precio Sugerido. ');
            }
        });

    });
