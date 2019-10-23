package com.cooksys.finalproject.dto;

public class TrashResponseDto {

	private FilesInfoResponseDto files;
	private FoldersInfoResponseDto folders;
	
	public TrashResponseDto() {
		
	}

	public FilesInfoResponseDto getFiles() {
		return files;
	}

	public void setFiles(FilesInfoResponseDto files) {
		this.files = files;
	}

	public FoldersInfoResponseDto getFolders() {
		return folders;
	}

	public void setFolders(FoldersInfoResponseDto folders) {
		this.folders = folders;
	}
}
