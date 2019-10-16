package com.cooksys.finalproject.entity;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "foldertable")
public class FolderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "boolean default false")
    private boolean trashed;
    
    @Column(nullable = false, unique = false)
	private String folderName;
    
    @OneToMany(mappedBy = "folder")
    private List<FileEntity> files;
    
    @Column(nullable = false)
    private Integer folderID;
    
    public Integer getFolderID() {
		return folderID;
	}

	public void setFolderID(Integer folderID) {
		this.folderID = folderID;
	}

	public FolderEntity() {
    }

    public Integer getId() {
        return id;
    }
	public boolean getTrashed() {
		return this.trashed;
	}

	public String getFolderName() {
		return folderName;
	}

    public void setId(Integer id) {
        this.id = id;
    }
	public void setTrashed(boolean trashed) {
		this.trashed = trashed;
	}

	public List<FileEntity> getFiles() {
		return files;
	}

	public void setFiles(List<FileEntity> files) {
		this.files = files;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public void setFileName(String folderName) {
		this.folderName = folderName;
	}
}
