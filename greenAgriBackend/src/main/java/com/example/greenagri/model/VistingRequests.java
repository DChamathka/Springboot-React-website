package com.example.greenagri.model;

import jdk.jfr.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "visitRequests")
public class VistingRequests {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column (name = "requester")
    private String requester;

    @Column(name = "Insititute")
    private String institute;

    @Column(name= "contactNo", length=10)
    private String contactNo;

    @Column(name = "noOfVisiters")
    private int noOfVisitors;

    @Column(name = "requestDate")
    private Date requestDate;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name= "createDate")
    private Date createDate;



    public VistingRequests() {
    }

    public VistingRequests(String requester, String institute, String contactNo, int noOfVisitors, Date requestDate, Date createDate) {
        this.requester = requester;
        this.institute = institute;
        this.contactNo = contactNo;
        this.noOfVisitors = noOfVisitors;
        this.requestDate = requestDate;
        this.createDate = createDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getInstitute() {
        return institute;
    }

    public void setInstitute(String institute) {
        this.institute = institute;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public int getNoOfVisitors() {
        return noOfVisitors;
    }

    public void setNoOfVisitors(int noOfVisitors) {
        this.noOfVisitors = noOfVisitors;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }


}
