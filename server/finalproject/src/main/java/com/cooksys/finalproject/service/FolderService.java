package com.cooksys.finalproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.dto.FolderRequestDto;
import com.cooksys.finalproject.dto.FolderResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
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
		else if (folderRepository.getById(1) == null) {
			// create a root folder
        	FolderEntity rootFolderToCreate = new FolderEntity();
        	rootFolderToCreate.setFolderName("Root");
        	rootFolderToCreate.setFolderID(0);
        	folderRepository.saveAndFlush(rootFolderToCreate);
        	// create the folder requested
        	folderRequest.setFolderID(1);
			FolderEntity folderToCreate = folderMapper.dtoToEntity(folderRequest);
			FolderEntity folder = folderRepository.saveAndFlush(folderToCreate);

			for (FileRequestDto fileRequest : folderRequest.getFileRequests()) {
				FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
				fileToCreate.setFolder(folder);
		        fileRepository.saveAndFlush(fileToCreate);
			}
			return new ResponseEntity<>(HttpStatus.CREATED);
        }
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<FolderResponseDto> downloadFolder(Integer id) {

		if ((folderRepository.getById(id) != null) && !(folderRepository.getById(id).getTrashed())) {
			FolderResponseDto folderToDownload = folderMapper.entityToDto(folderRepository.getById(id));
			List<FileResponseDto> fileResponses = new ArrayList<FileResponseDto>();
			folderToDownload.setFiles(fileResponses);
			folderToDownload.setFolderID(id);
			for (FileEntity fileEntity : fileRepository.getByFolderId(id)) {
				if(!(fileEntity.getTrashed())) {
					folderToDownload.getFiles().add(fileMapper.entityToDto(fileEntity));
				}
			}
	        return new ResponseEntity<>(folderToDownload, HttpStatus.OK);
		} else {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<FolderResponseDto> trashFolder(TrashRequestDto trashRequestDto, Integer id) {
		if (folderRepository.getById(id) != null) {	
			// Get all the files with that folder_id
			FolderEntity folderToTrash = folderRepository.getById(id);
			boolean isTrashed = trashRequestDto.getTrashed();
			
			for (FileEntity fileEntity : folderToTrash.getFiles()) {
				fileEntity.setTrashed(isTrashed);
				fileRepository.saveAndFlush(fileEntity);
			}
			folderToTrash.setTrashed(isTrashed);
			folderRepository.saveAndFlush(folderToTrash);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<FolderResponseDto> deleteFolder(Integer id) {
		if (folderRepository.getById(id) != null && folderRepository.getById(id).getTrashed()) {
			FolderEntity folderToDelete = folderRepository.getById(id);

			for (FileEntity fileEntity : folderToDelete.getFiles()) {
				fileRepository.deleteById(fileEntity.getId());
			}
			folderRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK); 
		}
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
//	TODO: Nested Folder Move
//	public ResponseEntity<FolderResponseDto> moveFolder(Integer folderID1, Integer folderID2) {
//		if (folderRepository.getById(folderID1) != null && folderRepository.getById(folderID2) != null) {
//			FolderEntity folderToMove = folderRepository.getById(folderID1);
//			folderToMove.setFolderID(folderID2);
//			fileRepository.saveAndFlush(fileToMove);
//			return new ResponseEntity<>(HttpStatus.OK); 
//		} else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//	}
//	
}
