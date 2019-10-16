package com.cooksys.finalproject.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.entity.FolderEntity;
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
     * @param folderID 
     * @return ResponseEntity<FileResponseDto>
     */
	public ResponseEntity<FileResponseDto> uploadFile(FileRequestDto fileRequest, Integer folderID) {
		FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
        if(folderRepository.getById(folderID) != null){
        	fileToCreate.setFolder(folderRepository.getById(folderID));
        }
        else if (folderRepository.getById(1) == null) {
        	FolderEntity folderToCreate = new FolderEntity();
        	folderToCreate.setFolderName("Root");
        	folderToCreate.setFolderID(0);
        	folderRepository.saveAndFlush(folderToCreate);
        	fileToCreate.setFolder(folderToCreate);
        }
        else {
        	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
	
	public ResponseEntity<FileResponseDto> deleteFile(Integer id) {
		if (fileRepository.getById(id) != null && fileRepository.getById(id).getTrashed()) {
			fileRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK); 
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<FileResponseDto> moveFile(Integer fileID, Integer folderID) {
		if (fileRepository.getById(fileID) != null && folderRepository.getById(folderID) != null) {
			FileEntity fileToMove = fileRepository.getById(fileID);
			FolderEntity folderToAddTo = folderRepository.getById(folderID);
			
			deleteFile(fileID);
			fileToMove.setFolder(folderToAddTo);
			fileRepository.saveAndFlush(fileToMove);
			folderToAddTo.getFiles().add(fileToMove);
			folderRepository.saveAndFlush(folderToAddTo);
			return new ResponseEntity<>(HttpStatus.OK); 
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
