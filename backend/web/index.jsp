<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="modelo.EquipoVO" %>

<%
    List<EquipoVO> listaEquipos = (List<EquipoVO>) request.getAttribute("listaEquipos");
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Gestión de Equipos</title>
        <link rel="stylesheet" href="CSS/index.css">
    </head>
    <body>

        <div class="encabezado">
            <img src="img/ESLOGAN CONI.png" class="imagen-encabezado" alt="Logo CONI">
            <div class="barra-superior">
                <nav>
                    <ul>
                        <a href="InformeEquipoServlet">Ir a Informe de Equipos</a>
                        <li><a href="#">Cerrar sesión</a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <main>
            <!-- Botón registrar -->
            <button type="button" class="estilo-boton-registrar" onclick="mostrarFormulario()">Registrar nuevo equipo</button>
        </div>

        <!-- Formulario -->
        <div id="formularioRegistro" class="registrarEquipo" style="display:none;">
            <h2>Registrar nuevo equipo</h2>
            <form method="post" action="EquipoServlet">
                <input type="hidden" name="accion" value="registrar">
                <div class="form-list">
                    <!-- campos como antes... -->
                    <div class="form-group"><label>N° Inventario</label><input type="text" name="n_inventario" required></div>
                    <div class="form-group"><label>N° Serie</label><input type="text" name="n_serie" required></div>
                    <div class="form-group"><label>Clase</label><input type="text" name="clase"></div>
                    <div class="form-group"><label>Marca</label><input type="text" name="marca"></div>
                    <div class="form-group"><label>RAM</label><input type="text" name="ram"></div>
                    <div class="form-group"><label>Disco</label><input type="text" name="disco"></div>
                    <div class="form-group"><label>Procesador</label><input type="text" name="procesador"></div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select name="estado">
                            <option value="DISPONIBLE">DISPONIBLE</option>
                            <option value="ASIGNADO">ASIGNADO</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="estilo-boton">Guardar</button>
            </form>
        </div>

        <!-- Filtro -->
        <form method="get" action="EquipoServlet" style="text-align:center;">
            <label for="estado">Filtrar por estado:</label>
            <select name="estado" id="estado" class="campoFiltro">
                <option value="">Todos</option>
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="ASIGNADO">ASIGNADO</option>
                <option value="PENDIENTE">PENDIENTE</option>
            </select>
            <button type="submit" class="estilo-boton">Filtrar</button>
        </form>

        <!-- Tabla -->
        <table class="tabla">
            <thead>
                <tr>
                    <th>Inventario</th><th>Serie</th><th>Clase</th><th>Marca</th>
                    <th>RAM</th><th>Disco</th><th>Procesador</th><th>Estado</th><th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            <c:forEach var="equipo" items="${listaEquipos}">
                <%
                    if (listaEquipos != null) {
                        for (EquipoVO equipo : listaEquipos) {
                %>

                <tr>
                    <td><%= equipo.getN_inventario()%></td>
                    <td><%= equipo.getN_serie()%></td>
                    <td><%= equipo.getClase()%></td>
                    <td><%= equipo.getMarca()%></td>
                    <td><%= equipo.getRam()%></td>
                    <td><%= equipo.getDisco()%></td>
                    <td><%= equipo.getProcesador()%></td>
                    <td><%= equipo.getEstado()%></td>
                    <td>
                        <form method="post" action="EquipoServlet" style="display:inline;">
                            <input type="hidden" name="accion" value="eliminar">
                            <input type="hidden" name="n_inventario" value="<%= equipo.getN_inventario()%>">
                            <button type="submit"class="estilo-boton">Eliminar</button>
                        </form>
                    </td>
                </tr>
                <%
                        }
                    }
                %>
            </c:forEach>
            </tbody>
        </table>

    </main>

    <script>
        function mostrarFormulario() {
            var form = document.getElementById("formularioRegistro");
            form.style.display = form.style.display === "none" ? "block" : "none";
        }
    </script>

</body>
</html>
