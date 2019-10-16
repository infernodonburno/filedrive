package com.cooksys.finalproject.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.mapper.FileMapper;
import com.cooksys.finalproject.repository.FileRepository;
import com.cooksys.finalproject.repository.FolderRepository;

@Service
public class FileService {

    private FileRepository fileRepository;
    private FolderRepository folderRepository;
    private FileMapper fileMapper;
    
    public FileService(FileRepository fileRepository, FileMapper fileMapper, FolderRepository folderRepository) {
        this.fileRepository = fileRepository;
        this.folderRepository = folderRepository;
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
        if(folderRepository.getById(fileRequest.getFolderID()) != null){
        	fileToCreate.setFolder(folderRepository.getById(fileRequest.getFolderID()));
        } else {
        	fileToCreate.setFolder(folderRepository.getById(0));
        }
        return new ResponseEntity<>(fileMapper.entityToDto(fileRepository.saveAndFlush(fileToCreate)), HttpStatus.CREATED);
	}

	public ResponseEntity<FileResponseDto> downloadFile(Integer id) {

		// check if the file is there and if not trashed
		if ((fileRepository.getById(id) != null) && !(fileRepository.getById(id).getTrashed())) {			
	        return new ResponseEntity<>(fileMapper.entityToDto(fileRepository.getById(id)), HttpStatus.OK);
		} else {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<FileResponseDto> trashFile(TrashRequestDto trashRequestDto, Integer id) {
		if (fileRepository.getById(id) != null) {	
			FileEntity fileToTrash = fileRepository.getById(id);
			fileToTrash.setTrashed(trashRequestDto.getTrashed());
			fileRepository.saveAndFlush(fileToTrash);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<FileResponseDto> restoreFile(Integer id) {
		if (fileRepository.getById(id) != null) {	
			FileEntity fileToRestore = fileRepository.getById(id);
			fileToRestore.setTrashed(false);
			fileRepository.saveAndFlush(fileToRestore);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
}
