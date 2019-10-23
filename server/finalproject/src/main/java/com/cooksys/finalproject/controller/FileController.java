package com.cooksys.finalproject.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.cooksys.finalproject.dto.FilesInfoResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.service.FileService;


@RestController
@RequestMapping("/files")
public class FileController {

    private FileService fileService;
    
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
    
    @PreAuthorize("#oauth2.hasScope('profile')")
    @GetMapping("/protected/")
    public String helloProtected(Principal principal) {
        return "Hello " + principal.getName();
    }
    
    /*
     * GET End-points
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{userName}/{folderID}/all")
    public ResponseEntity<FilesInfoResponseDto> getFiles(@PathVariable String userName, @PathVariable Integer folderID){
    	return fileService.getFiles(userName, folderID);
    }
    
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{userName}/{id}")
    public ResponseEntity<FileResponseDto> downloadFile(@PathVariable String userName, @PathVariable Integer id) {
        return fileService.downloadFile(userName, id);
    }

    /*
     * POST End-points
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userName}/{folderID}")
    public ResponseEntity<FileResponseDto> uploadFile(@PathVariable String userName, @RequestBody FileRequestDto fileRequest,@PathVariable Integer folderID ) {
        return fileService.uploadFile(userName, fileRequest, folderID);
    }
    
    /*
     * PATCH End-points
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{userName}/{fileID}/{folderID}/move")
    public ResponseEntity<FileResponseDto> moveFile(@PathVariable String userName, @PathVariable Integer fileID, @PathVariable Integer folderID) {
        return fileService.moveFile(userName, fileID, folderID);
    }
    
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{userName}/{id}/trash")
    public ResponseEntity<FileResponseDto> trashFile(@PathVariable String userName, @RequestBody TrashRequestDto trashRequestDto, @PathVariable Integer id) {
        return fileService.trashFile(userName, trashRequestDto, id);
    }
    
    /*
     * DELETE End-points
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{userName}/{id}/delete")
    public ResponseEntity<FileResponseDto> deleteFile(@PathVariable String userName, @PathVariable Integer id) {
        return fileService.deleteFile(userName, id);
    }
}
