package com.cooksys.finalproject.dto;

import java.util.List;

public class FolderRequestDto {

	private String folderName;
	private Integer folderID;
	private List<FileRequestDto> files;
	
	public FolderRequestDto() {

	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public Integer getFolderID() {
		return folderID;
	}

	public void setFolderID(Integer folderID) {
		this.folderID = folderID;
	}

	public List<FileRequestDto> getFiles() {
		return files;
	}

	public void setFileRequests(List<FileRequestDto> files) {
		this.files = files;
	}
	
	
	
	
	
}
