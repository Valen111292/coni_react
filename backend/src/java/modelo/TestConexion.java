package modelo;

import java.sql.Connection;
import java.sql.SQLException;

public class TestConexion {

    public static void main(String[] args) {
        try {
            Connection con = Conexion.getConexion();
            if (con != null && !con.isClosed()) {
                System.out.println("✅ Conexión exitosa a la base de datos CONI.");
                con.close(); // Cerramos la conexión al final
            } else {
                System.out.println("❌ No se pudo establecer la conexión.");
            }
        } catch (ClassNotFoundException e) {
            System.out.println("❌ Error: Driver JDBC no encontrado.");
        } catch (SQLException e) {
            System.out.println("❌ Error de conexión con la base de datos.");
        }
    }
}
