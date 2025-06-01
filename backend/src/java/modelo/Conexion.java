package modelo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    
private static final String url = "jdbc:mysql://localhost:3306/coni";
private static final String user = "root";
private static final String password = "";

public static Connection getConexion() throws ClassNotFoundException, SQLException {
    Class.forName("com.mysql.jdbc.Driver");
    Connection con = DriverManager.getConnection(url, user, password);
    System.out.println("Conexión OK!!");
        return con;
}
}