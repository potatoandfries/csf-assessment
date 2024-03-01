package vttp.batch4.csf.ecommerce.repositories;

public class Queries {
    
    public static final String SQL_SAVE_ORDER= """
        INSERT INTO orders (order_id, name, address, priority, comments, cart) 
        VALUES (?, ?, ?, ?, ?, ?)
            """;

    public static final String SQL_CHECK_ORDER = """
        SELECT *
        WHERE order_id = ?
            """;
}