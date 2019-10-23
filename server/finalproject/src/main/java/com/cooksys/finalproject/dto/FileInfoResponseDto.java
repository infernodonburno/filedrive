package com.cooksys.finalproject.dto;

public class FileInfoResponseDto {
	
    private String fileName;
    private Integer folderID;
    private Integer id;

    public FileInfoResponseDto() {
    	
    }

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Integer getFolderID() {
		return folderID;
	}

	public void setFolderID(Integer folderID) {
		this.folderID = folderID;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
