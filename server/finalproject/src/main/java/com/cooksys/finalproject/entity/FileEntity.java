package com.cooksys.finalproject.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "filetable")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @CreationTimestamp
    private Timestamp created;
    
    @Column(columnDefinition = "boolean default false")
    private boolean trashed;
    
    @Column(nullable = false, unique = true)
	private String fileName;
	
    public FileEntity() {
    }

    public Integer getId() {
        return id;
    }
	public boolean getTrashed() {
		return this.trashed;
	}
	public Timestamp getCreated() {
		return this.created;
	}
	public String getFileName() {
		return fileName;
	}

    public void setId(Integer id) {
        this.id = id;
    }
	public void setTrashed(boolean trashed) {
		this.trashed = trashed;
	}
    public void setCreated(Timestamp created) {
        this.created = created;
    }
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}