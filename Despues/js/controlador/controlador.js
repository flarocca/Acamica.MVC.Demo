var Controlador = function (modelo) {
    this.modelo = modelo;
};

Controlador.prototype.inicializar = function () {
    this.modelo.inicializar();
};

Controlador.prototype.agregarTodo = function (descripcion) {
    this.modelo.agregarTodo(descripcion);
};

Controlador.prototype.eliminarTodo = function (id) {
    this.modelo.eliminarTodo(id);
};

Controlador.prototype.obtenerListaTodos = function () {
    return this.modelo.obtenerListaTodos();
};

Controlador.prototype.toggleTodo = function (id) {
    this.modelo.toggleTodo(id);
}