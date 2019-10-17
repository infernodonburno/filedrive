package com.cooksys.finalproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "filetable")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(columnDefinition = "boolean default false")
    private boolean trashed;
    
    @Column(nullable = false, unique = false)
	private String fileName;
	
    @Column(nullable = false)
    private byte[] data;
    
    @ManyToOne
    @JoinColumn
    private FolderEntity folder;
   
    
    public FileEntity() {
    }

    public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public FolderEntity getFolder() {
		return folder;
	}

	public void setFolder(FolderEntity folder) {
		this.folder = folder;
	}

	public Integer getId() {
        return id;
    }
	public boolean getTrashed() {
		return this.trashed;
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
	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}