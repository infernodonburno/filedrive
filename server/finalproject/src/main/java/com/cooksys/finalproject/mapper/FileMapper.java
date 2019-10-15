package com.cooksys.finalproject.mapper;

import org.mapstruct.Mapper;

import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;

@Mapper(componentModel = "spring")
public interface FileMapper {

	FileEntity dtoToEntity(FileRequestDto fileRequest);

	FileResponseDto entityToDto(FileEntity fileFoundInDB);
}
