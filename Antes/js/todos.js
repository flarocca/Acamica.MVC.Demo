var Todos = function() {
    this.todos = [];
    this.ultimoId = 0;
}

Todos.prototype.inicializar = function() {
    this.todos = [1, 2, 3, 4, 5]
        .map(item => new Todo(item, 'TODO ' + item))

    this.ultimoId = 5;

    this.construirListaTodos();
}

Todos.prototype.agregarTodo = function() {
    this.ultimoId++;
    var descripcion = $('#nuevoTodo').val();
    this.todos.push(new Todo(this.ultimoId, descripcion));

    this.construirListaTodos();
}

Todos.prototype.eliminarTodo = function (todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.construirListaTodos();
}

Todos.prototype.construirListaTodos = function () {
    $('#todos').empty();

    this.todos.forEach(todo => {
        $('#todos').append(this.construirElementoTodo(todo));
    });
}

Todos.prototype.construirElementoTodo = function (todo) {
    var eliminar = $('<input type="button">')
        .attr('value', 'X')
        .click(() => this.eliminarTodo(todo));

    var nuevoTodo = $('<li></li>')
        .attr('id', todo.id)
        .addClass('.todo')
        .text(todo.descripcion)
        .append(eliminar);

    return nuevoTodo;
}