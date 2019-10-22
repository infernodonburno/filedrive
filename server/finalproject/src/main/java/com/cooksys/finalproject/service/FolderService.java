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
import com.cooksys.finalproject.dto.FoldersResponseDto;
import com.cooksys.finalproject.dto.TrashFoldersResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.entity.FolderEntity;
import com.cooksys.finalproject.mapper.FileMapper;
import com.cooksys.finalproject.mapper.FolderMapper;
import com.cooksys.finalproject.repository.FileRepository;
import com.cooksys.finalproject.repository.FolderRepository;
import com.cooksys.finalproject.repository.TrashFolderRepository;

@Service
public class FolderService {

    private FileRepository fileRepository;
    private FolderRepository folderRepository;
    private TrashFolderRepository trashFolderRepository;
    private FileMapper fileMapper;
    private FolderMapper folderMapper;
    
    public FolderService(FileRepository fileRepository, TrashFolderRepository trashFolderRepository, FileMapper fileMapper, FolderRepository folderRepository, FolderMapper folderMapper) {
        this.fileRepository = fileRepository;
        this.folderRepository = folderRepository;
        this.fileMapper = fileMapper;
        this.folderMapper = folderMapper;
        this.trashFolderRepository = trashFolderRepository;
    }
	public ResponseEntity<FolderResponseDto> uploadFolder(FolderRequestDto folderRequest) {
		// If folder does exist, return bad status

		if (folderRepository.getById(folderRequest.getFolderID()) != null) {
        	// create the folder requested
			FolderEntity folderToCreate = folderMapper.dtoToEntity(folderRequest);
			FolderEntity folder = folderRepository.saveAndFlush(folderToCreate);

			for (FileRequestDto fileRequest : folderRequest.getFileRequests()) {
				FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
				fileToCreate.setFolder(folder);
		        fileRepository.saveAndFlush(fileToCreate);
			}
			return new ResponseEntity<>(HttpStatus.CREATED);			
		}
		// If folder doesn't exist, create folder entity
		else if (folderRepository.getById(1) == null) {
			// create a root folder
        	FolderEntity rootFolderToCreate = new FolderEntity();
        	rootFolderToCreate.setFolderName("Root");
        	rootFolderToCreate.setFolderID(0);
        	folderRepository.saveAndFlush(rootFolderToCreate);
        	
        	if(folderRequest.getFolderID() == 1) {
            	// create the folder requested if mapped to root
    			FolderEntity folderToCreate = folderMapper.dtoToEntity(folderRequest);
    			FolderEntity folder = folderRepository.saveAndFlush(folderToCreate);

    			for (FileRequestDto fileRequest : folderRequest.getFileRequests()) {
    				FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
    				fileToCreate.setFolder(folder);
    		        fileRepository.saveAndFlush(fileToCreate);
    			}
    			return new ResponseEntity<>(HttpStatus.CREATED);
        	} else {
    			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        	}
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
	public ResponseEntity<FoldersResponseDto> getFolders(Integer folderID) {
		FoldersResponseDto responseToSendBack = new FoldersResponseDto();
		responseToSendBack.setFolders(new ArrayList<>());
		List<FolderEntity> foldersToSendBack = folderRepository.getAllFoldersByfolderID(folderID);
		if(foldersToSendBack != null) {
			for(FolderEntity folderEntity: foldersToSendBack) {
				if(!(folderEntity.getTrashed())){
					responseToSendBack.getFolders().add(folderMapper.entityToDto(folderEntity));
				}
			}
			return new ResponseEntity<FoldersResponseDto>(responseToSendBack, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	public ResponseEntity<TrashFoldersResponseDto> getTrashFolders() {
		try {
			TrashFoldersResponseDto response = new TrashFoldersResponseDto();
			List<FolderEntity> trashFolders = trashFolderRepository.getAllByTrashed(Boolean.TRUE);
			List<FolderResponseDto> folders = new ArrayList<FolderResponseDto>();
			for(FolderEntity folderEntity: trashFolders) {
				folders.add(folderMapper.entityToDto(folderEntity));
			}
			response.setFolders(folders);
			return new ResponseEntity<TrashFoldersResponseDto>(response, HttpStatus.OK); 	
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
