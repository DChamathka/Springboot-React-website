package com.example.greenagri.controller;

import com.example.greenagri.model.Farmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.greenagri.repository.FarmerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/greenagri")
public class FarmerController {
    @Autowired
    FarmerRepository farmerRepository;

    @GetMapping("/farmers")
    public ResponseEntity<List<Farmer>> getAllFarmers() {
        try {
            List farmers;
            farmers = farmerRepository.findAll();
            return new ResponseEntity<>(farmers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/farmers/{id}")
    public ResponseEntity<Farmer> getFarmer(@PathVariable("id") long id){
        Optional<Farmer> farmerData = farmerRepository.findById(id);
        if (farmerData.isPresent()) {
            return new ResponseEntity<>(farmerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/addfarmer")
    public ResponseEntity<Farmer> createProduct(@RequestBody Farmer farmer) {
        try {
            Farmer newFarmer = farmerRepository
                    .save(new Farmer(farmer.getFirstName(),
                            farmer.getLastName(),
                            farmer.getEmail(),
                            farmer.getPhone(),
                            farmer.getCrop()));
            return new ResponseEntity<>(newFarmer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/farmers/{id}")
    public ResponseEntity<Farmer> updateFarmer(@PathVariable("id") Long id, @RequestBody Farmer farmer) {
        Optional<Farmer> farmerData = farmerRepository.findById(id);

        if (farmerData.isPresent()) {
            Farmer _farmer = farmerData.get();
            _farmer.setFirstName(farmer.getFirstName());
            _farmer.setLastName(farmer.getLastName());
            _farmer.setEmail(farmer.getEmail());
            _farmer.setPhone(farmer.getPhone());
            _farmer.setCrop(farmer.getCrop());

            return new ResponseEntity<>(farmerRepository.save(_farmer), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/farmers/{id}")
    public ResponseEntity<HttpStatus> deleteFarmer(@PathVariable("id") Long id) {
        try {
            farmerRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
