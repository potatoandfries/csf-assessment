package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    template.update(Queries.SQL_SAVE_ORDER, order.getOrderId(), order.getName(), order.getAddress(), order.isPriority(), order.getComments(), order.getCart().toString());
  }

  public boolean checkOrderIdExists(String orderId) {
    int count = template.queryForObject(Queries.SQL_CHECK_ORDER, new Object[]{orderId}, (rs, rowNum) -> rs.getInt("count"));
    return count > 0;
  }
}
