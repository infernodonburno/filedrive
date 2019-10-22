package com.cooksys.finalproject.dto;

public class FileRequestDto {

    private String fileName;
    private byte[] data;
    private String userName;
    
    public FileRequestDto() {
    }

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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
}
