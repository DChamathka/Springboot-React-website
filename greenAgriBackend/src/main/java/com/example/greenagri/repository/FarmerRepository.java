package com.example.greenagri.repository;

import com.example.greenagri.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;



public interface FarmerRepository extends JpaRepository<Farmer,Long> {

}
