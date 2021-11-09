package com.example.greenagri.model;

import javax.persistence.*;

@Entity
@Table(name ="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column (name = "productName")
    private String pname;

    @Column (name = "type",unique=true)
    private String type;

    @Column (name = "price")
    private float price;

    @Column (name = "availability")
    private boolean availability;

    public Product() {
    }

    public Product(String pname, String type, float price, boolean availability) {
        this.pname = pname;
        this.type = type;
        this.price = price;
        this.availability = availability ;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }
}
