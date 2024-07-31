$(document).ready(function() {

    var colaboradores = []
    
    function limpiarErrores() {
        $("#msg-rut, #msg-nombre, #msg-salario-bruto, #msg-departamento").html("")
    }

    function limpiarFormulario() {
        $("#txt-rut, #txt-nombre, #select-departamento, #txt-salario-bruto").val("")
    }

    function obtenerRetencion(salarioBruto) {
        var retencion = 0;
        if(salarioBruto > 1500) 
            retencion = 5
        if(salarioBruto > 3000)
            retencion = 8
        return retencion
    }

    function obtenerSalario(salarioBruto, retencion) {
        return salarioBruto - (salarioBruto * (retencion / 100))
    }

    function listarColaboradores(colaboradores) {
        $("#listado tbody").html("")
        for (let index = 0; index < colaboradores.length; index++) {
            $("#listado tbody").append(`
                <tr>
                    <td>${colaboradores[index].rut}</td>
                    <td>${colaboradores[index].nombre}</td>
                    <td>${colaboradores[index].departamento}</td>
                    <td>${colaboradores[index].salario_bruto}</td>
                    <td>${colaboradores[index].retencion}</td>
                    <td>${colaboradores[index].salario_neto}</td>
                </tr>    
            `) 
        }
    }

    $("#formulario").submit(function(evento) {
        evento.preventDefault();

        limpiarErrores()

        var rut = $("#txt-rut").val();
        var nombre = $("#txt-nombre").val();
        var salarioBruto = $("#txt-salario-bruto").val();
        var departamento = $("#select-departamento").val();

        if(rut == "") {
            return $("#msg-rut").html("Ingrese el RUT");
        }

        if(nombre == "") {
            return $("#msg-nombre").html("Ingrese el nombre");
        }

        if(salarioBruto == "") {
            return $("#msg-salario-bruto").html("Ingrese el salario bruto");
        }
        if(departamento == "") {
            return $("#msg-departamento").html("Seleccione el departamento");
        }

        var retencion = obtenerRetencion(salarioBruto)

        var colaborador = {
            rut: rut,
            nombre: nombre,
            salario_bruto: Number(salarioBruto),
            departamento: departamento,
            retencion: retencion,
            salario_neto: obtenerSalario(salarioBruto, retencion)
        }

        colaboradores.push(colaborador)
        limpiarFormulario()
        listarColaboradores(colaboradores)
        
    })


})