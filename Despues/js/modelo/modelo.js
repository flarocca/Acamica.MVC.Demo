var Modelo = function () {
    this.todos = [];
    this.ultimoId = 0;

    this.todoAgregado = new Evento(this);
    this.todoEliminado = new Evento(this);
    this.errorDescripcionInvalidaDetectado = new Evento(this);
    this.notificarToggleTodo = new Evento(this);
}

Modelo.prototype.inicializar = function () {
    this.todos = [1, 2, 3, 4, 5]
        .map(item => new Todo(item, 'TODO ' + item))

    this.ultimoId = 5;
}

Modelo.prototype.agregarTodo = function (descripcion) {
    if (!descripcion) {
        this.errorDescripcionInvalidaDetectado.notificar();
    } else {
        this.ultimoId++;
        this.todos.push(new Todo(this.ultimoId, descripcion));
        this.todoAgregado.notificar();
    }
}

Modelo.prototype.eliminarTodo = function (id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todoEliminado.notificar();
}

Modelo.prototype.obtenerListaTodos = function () {
    return this.todos;
}
Modelo.prototype.toggleTodo = function (id) {
    for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === id) {
            if (this.todos[i].activo) {
                this.todos[i].activo = false;
            } else {
                this.todos[i].activo = true;
            }
        }
    }
    this.notificarToggleTodo.notificar();
}