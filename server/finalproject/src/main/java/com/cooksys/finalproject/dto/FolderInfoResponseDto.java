package com.cooksys.finalproject.dto;

import java.util.List;

public class FolderInfoResponseDto {
	
	private String folderName;
	private Integer folderID;
	private List<FileInfoResponseDto> files;
	private List<FolderInfoResponseDto> folders;
	private Integer id;
	
	public FolderInfoResponseDto() {
		
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

	public List<FileInfoResponseDto> getFiles() {
		return files;
	}

	public void setFiles(List<FileInfoResponseDto> files) {
		this.files = files;
	}

	public List<FolderInfoResponseDto> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderInfoResponseDto> folders) {
		this.folders = folders;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
