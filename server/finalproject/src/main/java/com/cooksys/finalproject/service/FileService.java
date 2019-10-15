package com.cooksys.finalproject.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.mapper.FileMapper;
import com.cooksys.finalproject.repository.FileRepository;


public class FileService {

    private FileRepository fileRepository;
    private FileMapper fileMapper;
    
    public FileService(FileRepository fileRepository, FileMapper fileMapper) {
        this.fileRepository = fileRepository;
        this.fileMapper = fileMapper;
    }
    
    /**
     * /**
     * Uploads a new file if not already in database for this folder
     * If file is in database but trashed, will restore the file.
     * 
     * @param fileRequest
     * @return ResponseEntity<FileResponseDto>
     */
	public ResponseEntity<FileResponseDto> uploadFile(FileRequestDto fileRequest) {
		FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
        FileEntity fileFoundInDB = fileRepository.getByFileName(fileRequest.getFileName());
        
        if(fileFoundInDB == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if (fileFoundInDB != null && fileFoundInDB.getTrashed()) {
            fileFoundInDB.setTrashed(false);
            fileRepository.saveAndFlush(fileFoundInDB);
            return new ResponseEntity<>(fileMapper.entityToDto(fileFoundInDB), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(fileMapper.entityToDto(fileRepository.saveAndFlush(fileToCreate)), HttpStatus.CREATED);
        }
	}

}
