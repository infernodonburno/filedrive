package com.cooksys.finalproject.dto;

import java.util.List;

public class FolderResponseDto {
	
	private String folderName;
	private Integer folderID;
	private List<FileResponseDto> files;
	private List<FolderResponseDto> folders;
	private Integer id;


	public FolderResponseDto() {
		
	}
	
	public List<FolderResponseDto> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderResponseDto> folders) {
		this.folders = folders;
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

	public List<FileResponseDto> getFiles() {
		return files;
	}

	public void setFiles(List<FileResponseDto> fileResponses) {
		this.files = fileResponses;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}