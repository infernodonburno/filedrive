package com.cooksys.finalproject.mapper;

import org.mapstruct.Mapper;

import com.cooksys.finalproject.dto.FolderRequestDto;
import com.cooksys.finalproject.entity.FolderEntity;

@Mapper(componentModel = "spring")
public interface FolderMapper {
	
	// DTO to entity for folder
	
	FolderEntity dtoToEntity(FolderRequestDto folderRequest);
}
