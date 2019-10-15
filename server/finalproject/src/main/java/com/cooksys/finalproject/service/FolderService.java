package com.cooksys.finalproject.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FolderRequestDto;
import com.cooksys.finalproject.dto.FolderResponseDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.entity.FolderEntity;
import com.cooksys.finalproject.mapper.FileMapper;
import com.cooksys.finalproject.mapper.FolderMapper;
import com.cooksys.finalproject.repository.FileRepository;
import com.cooksys.finalproject.repository.FolderRepository;

@Service
public class FolderService {

    private FileRepository fileRepository;
    private FolderRepository folderRepository;
    private FileMapper fileMapper;
    private FolderMapper folderMapper;
    
    public FolderService(FileRepository fileRepository, FileMapper fileMapper, FolderRepository folderRepository, FolderMapper folderMapper) {
        this.fileRepository = fileRepository;
        this.folderRepository = folderRepository;
        this.fileMapper = fileMapper;
        this.folderMapper = folderMapper;
    }
	public ResponseEntity<FolderResponseDto> uploadFolder(FolderRequestDto folderRequest) {
		// If folder does exist, return bad status

		if(folderRepository.getById(folderRequest.getFolderID()) != null){
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		// If folder doesn't exist, create folder entity

		else {
			FolderEntity folderToCreate = folderMapper.dtoToEntity(folderRequest);
			FolderEntity folder = folderRepository.saveAndFlush(folderToCreate);

			for (FileRequestDto fileRequest : folderRequest.getFileRequests()) {
				FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
				fileToCreate.setFolder(folder);
		        fileRepository.saveAndFlush(fileToCreate);
			}
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}
}
