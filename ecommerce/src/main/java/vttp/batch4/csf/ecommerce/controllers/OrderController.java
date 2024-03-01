package vttp.batch4.csf.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.repositories.PurchaseOrderRepository;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path = "/api/order")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  @Autowired
  private PurchaseOrderRepository poRepo;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked

  // FOR POST : @RequestPart
  // For GET  : @RequestParam but URL /posts?sort=asc.
  // FOR GET  : @PathVariable  URL /post/image/{post_id}
  @PostMapping( consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> postOrder(
    @RequestBody Order order
  ) {

    poSvc.createNewPurchaseOrder(order);

    if (poRepo.checkOrderIdExists((order.getOrderId()))) {
      return ResponseEntity.status(200)
      .body(Json.createObjectBuilder()
      .add("orderId",order.getOrderId())
      .build()
      .toString());
      
    }
    else{ return ResponseEntity.status(400)
      .body(Json.createObjectBuilder()
              .add("Message", "error creating posts")
              .build()
              .toString());}
    }
      

}
