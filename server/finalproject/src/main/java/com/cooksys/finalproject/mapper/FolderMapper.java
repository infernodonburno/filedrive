package com.cooksys.finalproject.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.finalproject.dto.FolderInfoResponseDto;
import com.cooksys.finalproject.dto.FolderRequestDto;
import com.cooksys.finalproject.dto.FolderResponseDto;
import com.cooksys.finalproject.entity.FolderEntity;

@Mapper(componentModel = "spring")
public interface FolderMapper {
	
	
	FolderEntity dtoToEntity(FolderRequestDto folderRequest);
	FolderResponseDto entityToDto(FolderEntity folderFoundInDB);
	
	@Mapping(target = "folderID", source = "folderID")
	FolderInfoResponseDto entityToFolderInfoDto(FolderEntity folderEntity);
}

