package com.cooksys.finalproject.dto;

import java.util.List;

public class FoldersResponseDto {

	private List<FolderResponseDto> folders;
	
	public FoldersResponseDto() {
		
	}

	public List<FolderResponseDto> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderResponseDto> folders) {
		this.folders = folders;
	}
	
}
