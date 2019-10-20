package com.cooksys.finalproject.dto;

import java.util.List;

public class FolderRequestDto {

	private String folderName;
	private Integer folderID;
	private List<FileRequestDto> files;
	private List<FolderRequestDto> folders;
	
	public FolderRequestDto() {

	}

	public List<FolderRequestDto> getFolders() {
		return folders;
	}


	public void setFolders(List<FolderRequestDto> folders) {
		this.folders = folders;
	}


	public void setFiles(List<FileRequestDto> files) {
		this.files = files;
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
}
