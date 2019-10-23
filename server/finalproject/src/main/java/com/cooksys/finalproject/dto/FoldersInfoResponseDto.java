package com.cooksys.finalproject.dto;

import java.util.List;

public class FoldersInfoResponseDto {

	private List<FolderInfoResponseDto> folders;
	
	public FoldersInfoResponseDto() {
		
	}

	public List<FolderInfoResponseDto> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderInfoResponseDto> folders) {
		this.folders = folders;
	}
}
