package com.cooksys.finalproject.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.dto.FileInfoResponseDto;
import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;

@Mapper(componentModel = "spring")
public interface FileMapper {

	FileEntity dtoToEntity(FileRequestDto fileRequest);

	@Mapping(target = "folderID", source = "folder.id")
	FileResponseDto entityToDto(FileEntity fileFoundInDB);
	
	@Mapping(target = "folderID", source = "folder.id")
	FileInfoResponseDto entityToFileInfoDto(FileEntity fileFoundInDB);
}
