var VistaTodos = function (modelo, controlador) {
    this.modelo = modelo;
    this.controlador = controlador;
    var contexto = this;

    this.modelo.todoAgregado.suscribir(function () {
        contexto.construirListaTodos();
    });

    this.modelo.todoEliminado.suscribir(function () {
        contexto.construirListaTodos();
    });

    this.modelo.errorDescripcionInvalidaDetectado.suscribir(function () {
        $('#error').text('La descripcion es obligatoria');
    });
    this.modelo.notificarToggleTodo.suscribir(function(){
        contexto.construirListaTodos();
    })
};

VistaTodos.prototype.inicializar = function () {
    var contexto = this;
    this.controlador.inicializar();
    this.construirListaTodos();

    $('#agregarTodo').click(function () {
        var descripcion = $('#nuevoTodo').val();
        contexto.controlador.agregarTodo(descripcion);
    });
}

VistaTodos.prototype.construirListaTodos = function () {
    var contexto = this;
    $('#todos').empty();
    $('#error').empty();

    var todos = this.controlador.obtenerListaTodos();
    
    todos.forEach(todo => {
        $('#todos').append(contexto.construirElementoTodo(todo));
    });
}

VistaTodos.prototype.construirElementoTodo = function (todo) {
    var contexto = this;

    var eliminar = $('<input type="button">')
        .attr('value', 'X')
        .click(() => contexto.controlador.eliminarTodo(todo.id));

    var toggle = $('<input type="button">')
        .attr('value', todo.activo ? "i" : "a")
        .click(() => contexto.controlador.toggleTodo(todo.id));

    var nuevoTodo = $('<li></li>')
        .attr('id', todo.id)
        .css("color", todo.activo ? "black" : "red")
        .text(todo.id + ' - ' + todo.descripcion)
        .append(eliminar)
        .append(toggle);

    return nuevoTodo;
}