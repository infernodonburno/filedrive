package com.cooksys.finalproject.dto;

import java.util.List;

public class FilesInfoResponseDto {

	List<FileInfoResponseDto> files;
	
	public FilesInfoResponseDto() {
		
	}

	public List<FileInfoResponseDto> getFiles() {
		return files;
	}

	public void setFiles(List<FileInfoResponseDto> files) {
		this.files = files;
	}
}
