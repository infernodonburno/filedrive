package com.cooksys.finalproject.dto;

import java.util.List;

public class FolderRequestDto {
	// folder name
	// array of file objects containing filename, data, folder_id
	
	private String folderName;
	private Integer folderID;
	private List<FileRequestDto> fileRequests;
	
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

	public List<FileRequestDto> getFileRequests() {
		return fileRequests;
	}

	public void setFileRequests(List<FileRequestDto> fileRequests) {
		this.fileRequests = fileRequests;
	}
	
	
	
	
	
}
