package com.cooksys.finalproject.dto;

import java.util.List;

public class TrashFilesResponseDto {

	List<FileResponseDto> files;
	
	public TrashFilesResponseDto() {
		
	}

	public List<FileResponseDto> getFiles() {
		return files;
	}

	public void setFiles(List<FileResponseDto> files) {
		this.files = files;
	}
}
