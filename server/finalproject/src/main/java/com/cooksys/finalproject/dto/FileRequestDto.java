package com.cooksys.finalproject.dto;

public class FileRequestDto {

    private String fileName;
    private byte[] data;

    public FileRequestDto() {
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
