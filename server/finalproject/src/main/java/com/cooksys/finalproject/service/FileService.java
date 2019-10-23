package com.cooksys.finalproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.dto.TrashFilesResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.entity.FolderEntity;
import com.cooksys.finalproject.mapper.FileMapper;
import com.cooksys.finalproject.repository.FileRepository;
import com.cooksys.finalproject.repository.FolderRepository;
import com.cooksys.finalproject.repository.TrashFileRepository;

@Service
public class FileService {

    private FileRepository fileRepository;
    private FolderRepository folderRepository;
    private TrashFileRepository trashFileRepository;
    private FileMapper fileMapper;
    private static final Integer ROOT_FOLDER_ID = 1;
    private static final Integer ROOT_PARENT_ID = 0;
    
    public FileService(FileRepository fileRepository, TrashFileRepository trashFileRepository, FileMapper fileMapper, FolderRepository folderRepository) {
        this.fileRepository = fileRepository;
        this.folderRepository = folderRepository;
        this.fileMapper = fileMapper;
        this.trashFileRepository = trashFileRepository;
    }
    
    /**
     * /**
     * Uploads a new file if not already in database for this folder
     * If file is in database but trashed, will restore the file.
     * @param userName 
     * 
     * @param fileRequest
     * @param folderID 
     * @return ResponseEntity<FileResponseDto>
     */
	public ResponseEntity<FileResponseDto> uploadFile(String userName, FileRequestDto fileRequest, Integer folderID) {
		try {
			FileEntity fileToCreate = fileMapper.dtoToEntity(fileRequest);
	        if((folderRepository.getById(folderID) != null)
	        		&& (folderRepository.getById(folderID).getUserName() == userName)){
	        	fileToCreate.setFolder(folderRepository.getById(folderID));
	        }
	        else if (folderRepository.getById(ROOT_FOLDER_ID) == null) {
	        	FolderEntity folderToCreate = new FolderEntity();
	        	folderToCreate.setFolderName("Root");
	        	folderToCreate.setFolderID(ROOT_PARENT_ID);
	        	folderToCreate.setUserName("Root");
	        	folderRepository.saveAndFlush(folderToCreate);
	        	fileToCreate.setFolder(folderToCreate);
	        }
	        else {
	        	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	        return new ResponseEntity<>(fileMapper.entityToDto(fileRepository.saveAndFlush(fileToCreate)), HttpStatus.CREATED);
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<FileResponseDto> downloadFile(String userName, Integer id) {
		try {
			// check if the file is there and if not trashed
			FileEntity fileToDownload = fileRepository.getById(id);
			if ((fileToDownload != null) && !(fileToDownload.getTrashed())
					&& (fileToDownload.getUserName() == userName)) {			
		        return new ResponseEntity<>(fileMapper.entityToDto(fileToDownload), HttpStatus.OK);
			} else {
		        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}			
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<FileResponseDto> trashFile(String userName, TrashRequestDto trashRequestDto, Integer id) {
		try {
			FileEntity fileToTrash = fileRepository.getById(id);
			if ((fileToTrash != null) && (fileToTrash.getUserName() == userName)) {	
				fileToTrash.setTrashed(trashRequestDto.getTrashed());
				fileRepository.saveAndFlush(fileToTrash);
				return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
			}
			else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<FileResponseDto> restoreFile(Integer id) {
		try {
			if (fileRepository.getById(id) != null) {	
				FileEntity fileToRestore = fileRepository.getById(id);
				fileToRestore.setTrashed(false);
				fileRepository.saveAndFlush(fileToRestore);
				return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
			}
			else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}			
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<FileResponseDto> deleteFile(String userName, Integer id) {
		try {
			FileEntity fileToDeletePermanently = fileRepository.getById(id);
			if (fileToDeletePermanently != null && fileToDeletePermanently.getTrashed()
					&& (fileToDeletePermanently.getUserName() == userName)) {
				fileRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.RESET_CONTENT); 
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}		
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<FileResponseDto> moveFile(String userName, Integer fileID, Integer folderID) {
		try {
			FileEntity fileToMove = fileRepository.getById(fileID);
			FolderEntity folderToAddTo = folderRepository.getById(folderID);
			if ((fileToMove != null) && (folderToAddTo != null)
					&& (fileToMove.getUserName() == userName)
					&& ((folderToAddTo.getUserName() == userName) || (folderID == ROOT_FOLDER_ID))) {
				
				deleteFile(userName, fileID);
				fileToMove.setFolder(folderToAddTo);
				fileRepository.saveAndFlush(fileToMove);
				folderToAddTo.getFiles().add(fileToMove);
				folderRepository.saveAndFlush(folderToAddTo);
				return new ResponseEntity<>(HttpStatus.RESET_CONTENT); 
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<TrashFilesResponseDto> getTrashFiles(String userName) {
		try {
			TrashFilesResponseDto response = new TrashFilesResponseDto();
			List<FileEntity> trashFiles = trashFileRepository.getAllByTrashed(Boolean.TRUE);
			List<FileResponseDto> files = new ArrayList<FileResponseDto>();
			for(FileEntity fileEntity: trashFiles) {
				if(fileEntity.getUserName() == userName) {
					files.add(fileMapper.entityToDto(fileEntity));
				}
			}
			response.setFiles(files);
			return new ResponseEntity<TrashFilesResponseDto>(response, HttpStatus.OK); 	
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}