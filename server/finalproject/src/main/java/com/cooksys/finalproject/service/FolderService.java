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
    
    /*
     * CREATE Ops
     */
	public ResponseEntity<FolderResponseDto> uploadFolder(String userName, Integer folderID, FolderRequestDto folderRequest) {
		try {
			if ((folderRepository.getById(folderID) != null)
					&& ((folderID == ROOT_FOLDER_ID) || 
					((folderRepository.getById(folderID).getUserName() == userName)))) {
	    		createFolderInDB(userName, folderRequest, folderID);
				return new ResponseEntity<>(HttpStatus.CREATED);			
			}
			// If root doesn't exist, create root folder
			else if (folderRepository.getById(ROOT_FOLDER_ID) == null) {
				createRootFolderInDB("Root");
	        	if(folderID == ROOT_FOLDER_ID) {
	            	// create the folder requested if child of root
	        		createFolderInDB(userName, folderRequest, ROOT_FOLDER_ID);
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
	
	private void createFolderInDB(String userName, FolderRequestDto folderRequest, Integer parentID){
		FolderEntity folderToCreate = folderMapper.dtoToEntity(folderRequest);
		folderToCreate.setFolderID(parentID);
		FolderEntity folder = folderRepository.saveAndFlush(folderToCreate);
		
		for (FileRequestDto fileRequest : folderRequest.getFiles()) {
			FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
			fileToCreate.setFolder(folder);
		    fileRepository.saveAndFlush(fileToCreate);		
		}

		for (FolderRequestDto folderRequestInThisFolder : folderRequest.getFolders()) {
			createFolderInDB(userName, folderRequestInThisFolder, folder.getId());
		}
	}
	
	private void createRootFolderInDB(String username){
    	FolderEntity rootFolderToCreate = new FolderEntity();
    	rootFolderToCreate.setFolderName("Root");
    	rootFolderToCreate.setFolderID(ROOT_PARENT_ID);
    	rootFolderToCreate.setUserName(username);
    	folderRepository.saveAndFlush(rootFolderToCreate);
	}
	
	/*
	 * READ Ops
	 */
	public ResponseEntity<FoldersResponseDto> getFolders(String userName, Integer folderID) {
		try {
			FoldersResponseDto responseToSendBack = new FoldersResponseDto();
			responseToSendBack.setFolders(new ArrayList<>());
			List<FolderEntity> foldersToSendBack = folderRepository.getAllFoldersByfolderID(folderID);
			if(foldersToSendBack != null) {
				for(FolderEntity folderEntity: foldersToSendBack) {
					if(!(folderEntity.getTrashed()) && (folderEntity.getUserName() == userName)) {
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


	public ResponseEntity<TrashFoldersResponseDto> getTrashFolders(String userName) {
		try {
			TrashFoldersResponseDto response = new TrashFoldersResponseDto();
			List<FolderEntity> trashFolders = trashFolderRepository.getAllByTrashed(Boolean.TRUE);
			List<FolderResponseDto> folders = new ArrayList<FolderResponseDto>();
			for(FolderEntity folderEntity: trashFolders) {
				if(folderEntity.getUserName() == userName) {
					folders.add(folderMapper.entityToDto(folderEntity));
				}
			}
			response.setFolders(folders);
			return new ResponseEntity<TrashFoldersResponseDto>(response, HttpStatus.OK); 	
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<FolderResponseDto> downloadFolder(String userName, Integer id) {
		try {
			FolderEntity folderEntity = folderRepository.getById(id);
			if ((folderEntity != null) && !(folderEntity.getTrashed()) &&
					(folderEntity.getUserName() == userName)) {
				FolderResponseDto folderToDownload = folderMapper.entityToDto(folderRepository.getById(id));
				List<FileResponseDto> fileResponses = new ArrayList<FileResponseDto>();
				List<FolderResponseDto> folderResponses = new ArrayList<FolderResponseDto>();
				folderToDownload.setFiles(fileResponses);
				folderToDownload.setFolders(folderResponses);
				folderToDownload.setFolderID(id);
				folderToDownload = addToDownloadFolder(userName, folderToDownload, id);
		        return new ResponseEntity<>(folderToDownload, HttpStatus.OK);
			} else {
		        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private FolderResponseDto addToDownloadFolder(String userName, FolderResponseDto folderToDownload, Integer id) throws Exception{
		for (FileEntity fileEntity : fileRepository.getByFolderId(id)) {
			if(!(fileEntity.getTrashed()) && (fileEntity.getUserName() == userName)) {
				folderToDownload.getFiles().add(fileMapper.entityToDto(fileEntity));
			}
		}
		for (FolderEntity folderEntity : folderRepository.getAllFoldersByfolderID(id)) {
			if(!(folderEntity.getTrashed()) && (folderEntity.getUserName() == userName)) {
				folderToDownload.getFolders().add(folderMapper.entityToDto(folderEntity));
				folderToDownload = addToDownloadFolder(userName, folderToDownload, folderEntity.getId());
			}
		}
		return folderToDownload;
	}
	
	/*
	 * UPDATE Ops (temp. delete & move)
	 */
	
	public ResponseEntity<FolderResponseDto> trashFolder(String userName, TrashRequestDto trashRequestDto, Integer id) {
		try {
			FolderEntity folderToTrash = folderRepository.getById(id);
			if ((folderToTrash != null) && (folderToTrash.getUserName() == userName)) {	
				// Get all the files with that folder_id
				boolean isTrashed = trashRequestDto.getTrashed();
				
				for (FileEntity fileEntity : folderToTrash.getFiles()) {
					if(fileEntity.getUserName() == userName) {
						fileEntity.setTrashed(isTrashed);
						fileRepository.saveAndFlush(fileEntity);					
					}
				}
				for (FolderEntity folderEntity : folderRepository.getAllFoldersByfolderID(id)) {
					trashFolder(userName, trashRequestDto, folderEntity.getId());
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
	
	public ResponseEntity<FolderResponseDto> moveFolder(String userName, Integer folderID1, Integer folderID2) {
		try {
			FolderEntity folderToMove = folderRepository.getById(folderID1);
			FolderEntity folderToMoveTo = folderRepository.getById(folderID2);
			if (folderToMove != null && folderToMoveTo != null
					&& ((folderToMove.getUserName() == userName) && 
							(folderID2 == ROOT_FOLDER_ID || (folderToMoveTo.getUserName() == userName)))) {
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
	
	/*
	 * DELETE Ops
	 */
	public ResponseEntity<FolderResponseDto> deleteFolder(String userName, Integer id) {
		try {
			FolderEntity folderToDelete = folderRepository.getById(id);
			if ((folderToDelete != null) && (folderToDelete.getTrashed())
					&& (folderToDelete.getUserName() == userName)) {

				for (FileEntity fileEntity : folderToDelete.getFiles()) {
					if(fileEntity.getUserName() == userName) {
						fileRepository.deleteById(fileEntity.getId());
					}
				}
				for (FolderEntity folderEntity : folderRepository.getAllFoldersByfolderID(id)) {
					deleteFolder(userName, folderEntity.getId());
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
}
