package com.cooksys.finalproject.dto;

public class FileResponseDto {
	
    private String fileName;
    private byte[] data;
    private Integer folderID;

    public FileResponseDto() {
    }

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Integer getFolderID() {
		return folderID;
	}

	public void setFolderID(Integer folderID) {
		this.folderID = folderID;
	}

}
