package com.cooksys.finalproject.dto;

import java.util.List;

import com.cooksys.finalproject.entity.FolderEntity;

public class TrashFoldersResponseDto {

	List<FolderResponseDto> folders;
	
	public TrashFoldersResponseDto() {
		
	}

	public List<FolderResponseDto> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderResponseDto> folders) {
		this.folders = folders;
	}
}
