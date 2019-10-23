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
    private static final Integer ROOT_FOLDER_ID = 1;
    private static final Integer ROOT_PARENT_ID = 0;

    public FolderService(FileRepository fileRepository, TrashFolderRepository trashFolderRepository, FileMapper fileMapper, FolderRepository folderRepository, FolderMapper folderMapper) {
        this.fileRepository = fileRepository;
        this.folderRepository = folderRepository;
        this.fileMapper = fileMapper;
        this.folderMapper = folderMapper;
        this.trashFolderRepository =  trashFolderRepository;
    }
	public ResponseEntity<FolderResponseDto> uploadFolder(FolderRequestDto folderRequest) {
		try {
			if (folderRepository.getById(folderRequest.getFolderID()) != null) {
	    		createFolderInDB(folderRequest, folderRequest.getFolderID());
				return new ResponseEntity<>(HttpStatus.CREATED);			
			}
			// If root doesn't exist, create root folder
			else if (folderRepository.getById(ROOT_FOLDER_ID) == null) {
				createRootFolderInDB(folderRequest.getUserName());
	        	if(folderRequest.getFolderID() == ROOT_FOLDER_ID) {
	            	// create the folder requested if child of root
	        		createFolderInDB(folderRequest, ROOT_FOLDER_ID);
	    			return new ResponseEntity<>(HttpStatus.CREATED);
	        	} else {
	    			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        	}
	        }
			else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private void createFolderInDB(FolderRequestDto folderRequest, Integer parentID){
		FolderEntity folderToCreate = folderMapper.dtoToEntity(folderRequest);
		folderToCreate.setFolderID(parentID);
		FolderEntity folder = folderRepository.saveAndFlush(folderToCreate);
		
		for (FileRequestDto fileRequest : folderRequest.getFiles()) {
			FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
			fileToCreate.setFolder(folder);
	        fileRepository.saveAndFlush(fileToCreate);
		}

		for (FolderRequestDto folderRequestInThisFolder : folderRequest.getFolders()) {
			createFolderInDB(folderRequestInThisFolder, folder.getId());
		}
	}
	
	private void createRootFolderInDB(String username){
		// create a root folder
    	FolderEntity rootFolderToCreate = new FolderEntity();
    	rootFolderToCreate.setFolderName("Root");
    	rootFolderToCreate.setFolderID(ROOT_PARENT_ID);
    	rootFolderToCreate.setUserName(username);
    	folderRepository.saveAndFlush(rootFolderToCreate);
	}
	
	public ResponseEntity<FolderResponseDto> downloadFolder(Integer id) {
		try {
			if ((folderRepository.getById(id) != null) && !(folderRepository.getById(id).getTrashed())) {
				FolderResponseDto folderToDownload = folderMapper.entityToDto(folderRepository.getById(id));
				List<FileResponseDto> fileResponses = new ArrayList<FileResponseDto>();
				List<FolderResponseDto> folderResponses = new ArrayList<FolderResponseDto>();
				folderToDownload.setFiles(fileResponses);
				folderToDownload.setFolders(folderResponses);
				folderToDownload.setFolderID(id);
				folderToDownload = addToDownloadFolder(folderToDownload, id);
		        return new ResponseEntity<>(folderToDownload, HttpStatus.OK);
			} else {
		        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private FolderResponseDto addToDownloadFolder(FolderResponseDto folderToDownload, Integer id) throws Exception{
		for (FileEntity fileEntity : fileRepository.getByFolderId(id)) {
			if(!(fileEntity.getTrashed())) {
				folderToDownload.getFiles().add(fileMapper.entityToDto(fileEntity));
			}
		}
		for (FolderEntity folderEntity : folderRepository.getAllFoldersByfolderID(id)) {
			if(!(folderEntity.getTrashed())) {
				folderToDownload.getFolders().add(folderMapper.entityToDto(folderEntity));
				folderToDownload = addToDownloadFolder(folderToDownload, folderEntity.getId());
			}
		}
		return folderToDownload;
	}
	
	
	public ResponseEntity<FolderResponseDto> trashFolder(TrashRequestDto trashRequestDto, Integer id) {
		try {
			if (folderRepository.getById(id) != null) {	
				// Get all the files with that folder_id
				FolderEntity folderToTrash = folderRepository.getById(id);
				boolean isTrashed = trashRequestDto.getTrashed();
				
				for (FileEntity fileEntity : folderToTrash.getFiles()) {
					fileEntity.setTrashed(isTrashed);
					fileRepository.saveAndFlush(fileEntity);
				}
				for (FolderEntity folderEntity : folderRepository.getAllFoldersByfolderID(id)) {
					trashFolder(trashRequestDto, folderEntity.getId());
				}
				folderToTrash.setTrashed(isTrashed);
				folderRepository.saveAndFlush(folderToTrash);
				return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}		
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<FolderResponseDto> deleteFolder(Integer id) {
		try {
			if (folderRepository.getById(id) != null && folderRepository.getById(id).getTrashed()) {
				FolderEntity folderToDelete = folderRepository.getById(id);

				for (FileEntity fileEntity : folderToDelete.getFiles()) {
					fileRepository.deleteById(fileEntity.getId());
				}
				for (FolderEntity folderEntity : folderRepository.getAllFoldersByfolderID(id)) {
					deleteFolder(folderEntity.getId());
				}
				if(id != ROOT_FOLDER_ID) {
					// home cannot be deleted
					folderRepository.deleteById(id);
				}
				return new ResponseEntity<>(HttpStatus.RESET_CONTENT); 
			}
			else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<FoldersResponseDto> getFolders(Integer folderID) {
		try {
			FoldersResponseDto responseToSendBack = new FoldersResponseDto();
			responseToSendBack.setFolders(new ArrayList<>());
			List<FolderEntity> foldersToSendBack = folderRepository.getAllFoldersByfolderID(folderID);
			if(foldersToSendBack != null) {
				for(FolderEntity folderEntity: foldersToSendBack) {
					if(!(folderEntity.getTrashed())) {
						responseToSendBack.getFolders().add(folderMapper.entityToDto(folderEntity));
					}
				}
				return new ResponseEntity<FoldersResponseDto>(responseToSendBack, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<FolderResponseDto> moveFolder(Integer folderID1, Integer folderID2) {
		try {
			if (folderRepository.getById(folderID1) != null && folderRepository.getById(folderID2) != null) {
				FolderEntity folderToMove = folderRepository.getById(folderID1);
				folderToMove.setFolderID(folderID2);
				folderRepository.saveAndFlush(folderToMove);
				return new ResponseEntity<>(HttpStatus.OK); 
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
