package com.example.greenagri.controller;

import com.example.greenagri.model.Product;
import com.example.greenagri.model.VistingRequests;
import com.example.greenagri.repository.VisitingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/greenagri")
public class VisitRequestController {
    @Autowired
    VisitingRequestRepository visitingRequestRepository;

    @GetMapping("/visitingrequests")
    public ResponseEntity<List<VistingRequests>> getAllVisitrequests() {
        try {
            List requests = visitingRequestRepository.findAll();
            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/visitingrequests/{id}")
    public ResponseEntity<VistingRequests> getFarmer(@PathVariable("id") long id){
        Optional<VistingRequests> requestData = visitingRequestRepository.findById(id);
        if (requestData.isPresent()) {
            return new ResponseEntity<>(requestData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/request")
    public ResponseEntity<VistingRequests> createVisitingRequest(@RequestBody VistingRequests vistingRequests) {
        try {
            VistingRequests newVisitingRequest = visitingRequestRepository
                    .save(vistingRequests);
            return new ResponseEntity<>(newVisitingRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/request/{id}")
    public ResponseEntity<VistingRequests> updateVisitingrequest(@PathVariable("id") long id, @RequestBody VistingRequests vistingRequests) {
        Optional<VistingRequests> visitrequestData = visitingRequestRepository.findById(id);

        if (visitrequestData.isPresent()) {
            VistingRequests _visitrequest = visitrequestData.get();
            _visitrequest.setRequester(vistingRequests.getRequester());
            _visitrequest.setContactNo(vistingRequests.getContactNo());
            _visitrequest.setNoOfVisitors(vistingRequests.getNoOfVisitors());
            _visitrequest.setInstitute(vistingRequests.getInstitute());
            _visitrequest.setRequestDate(vistingRequests.getRequestDate());
            return new ResponseEntity<>(visitingRequestRepository.save(_visitrequest), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/visitingrequest/{id}")
    public ResponseEntity<HttpStatus> deleteRequest(@PathVariable("id") long id) {
        try {
            visitingRequestRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
