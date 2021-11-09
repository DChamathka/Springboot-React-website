package com.example.greenagri.model;

import javax.persistence.*;


@Entity
@Table(name ="farmers")
public class Farmer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column (name = "firstName")
    private String firstName;

    @Column (name = "lastName")
    private String lastName;

    @Column (name = "email")
    private String email;

    @Column (name = "phone")
    private String phone;

    @Column (name = "crop")
    private String crop;

    public Farmer() {
    }

    public Farmer(String firstName, String lastName, String email, String phone, String crop) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.crop = crop;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }
}
