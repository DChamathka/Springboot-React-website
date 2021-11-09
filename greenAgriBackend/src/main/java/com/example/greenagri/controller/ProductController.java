package com.example.greenagri.controller;

import com.example.greenagri.model.Product;
import com.example.greenagri.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/**greenagri")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List products;
            products = productRepository.findAll();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getFarmer(@PathVariable("id") long id){
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addproduct")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product newProduct = productRepository
                    .save(new Product(product.getPname(),
                            product.getType(),
                            product.getPrice(),
                            product.isAvailability()));
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/editproduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") long id, @RequestBody Product product) {
        Optional<Product> productData = productRepository.findProductById(id);

        if (productData.isPresent()) {
            Product _product = productData.get();
            _product.setPname(product.getPname());
            _product.setType(product.getType());
            _product.setPrice(product.getPrice());
            _product.setAvailability(product.isAvailability());
            return new ResponseEntity<>(productRepository.save(_product), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/deleteproducts/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id) {
        try {
            productRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
