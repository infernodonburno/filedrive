package com.cooksys.finalproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.dto.FolderResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.service.FileService;
import com.cooksys.finalproject.service.FolderService;


@RestController
@RequestMapping("/files")
public class FileController {

    private FileService fileService;
    private FolderService folderService;
    
    public FileController(FileService fileService, FolderService folderService) {
        this.fileService = fileService;
        this.folderService = folderService;
    }
    
    @CrossOrigin
    @GetMapping
    public ResponseEntity<FolderResponseDto> getFiles(){
    	return folderService.downloadFolder(1);
    }
    
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<FileResponseDto> downloadFile(@PathVariable Integer id) {
        return fileService.downloadFile(id);
    }

    @CrossOrigin
    @PostMapping("/{folderID}")
    public ResponseEntity<FileResponseDto> uploadFile(@RequestBody FileRequestDto fileRequest,@PathVariable Integer folderID ) {
        return fileService.uploadFile(fileRequest, folderID);
    }
    
    @CrossOrigin
    @PatchMapping("/{fileID}/{folderID}/move")
    public ResponseEntity<FileResponseDto> moveFile(@PathVariable Integer fileID, @PathVariable Integer folderID) {
        return fileService.moveFile(fileID, folderID);
    }
    
    @CrossOrigin
    @PatchMapping("/{id}/trash")
    public ResponseEntity<FileResponseDto> trashFile(@RequestBody TrashRequestDto trashRequestDto, @PathVariable Integer id) {
        return fileService.trashFile(trashRequestDto, id);
    }
    
    @CrossOrigin
    @DeleteMapping("/{id}/trash")
    public ResponseEntity<FileResponseDto> deleteFile(@PathVariable Integer id) {
        return fileService.deleteFile(id);
    }
}
