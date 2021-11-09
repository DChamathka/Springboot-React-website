package com.example.greenagri.repository;

import com.example.greenagri.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product,Long> {
    Optional<Product> findProductById(long id);
}
