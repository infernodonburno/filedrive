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

import com.cooksys.finalproject.dto.FolderRequestDto;
import com.cooksys.finalproject.dto.FolderResponseDto;
import com.cooksys.finalproject.dto.FoldersResponseDto;
import com.cooksys.finalproject.dto.TrashFoldersResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.service.FolderService;


@RestController
@RequestMapping("/folders")
public class FolderController {

    private FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }
    
    @CrossOrigin
    @GetMapping("/{userName}/{folderID}")
    public ResponseEntity<FoldersResponseDto> getFolders(@PathVariable String userName, @PathVariable Integer folderID) {
    	return folderService.getFolders(userName, 1);
    }
    
    @CrossOrigin
    @GetMapping("/{userName}/trash")
    public ResponseEntity<TrashFoldersResponseDto> getTrashFolders(@PathVariable String userName){
    	return folderService.getTrashFolders(userName);
    }
    
    @CrossOrigin
    @GetMapping("/{userName}/{id}")
    public ResponseEntity<FolderResponseDto> downloadFolder(@PathVariable String userName, @PathVariable Integer id) {
        return folderService.downloadFolder(userName, id);
    }
    
    @CrossOrigin
    @PostMapping("/{userName}")
    public ResponseEntity<FolderResponseDto> uploadFolder(@PathVariable String userName, @RequestBody FolderRequestDto folderRequest) {
        return folderService.uploadFolder(userName, folderRequest);
    }

    @CrossOrigin
    @PatchMapping("/{userName}/{folderID1}/{folderID2}/move")
    public ResponseEntity<FolderResponseDto> moveFolder(@PathVariable String userName, @PathVariable Integer folderID1, @PathVariable Integer folderID2) {
        return folderService.moveFolder(userName, folderID1, folderID2);
    }
    
    @CrossOrigin
    @PatchMapping("/{userName}/{id}/trash")
    public ResponseEntity<FolderResponseDto> trashFolder(@PathVariable String userName, @RequestBody TrashRequestDto trashRequestDto, @PathVariable Integer id) {
        return folderService.trashFolder(userName, trashRequestDto, id);
    }
    
    @CrossOrigin
    @DeleteMapping("/{userName}/{id}/delete")
    public ResponseEntity<FolderResponseDto> deleteFolder(@PathVariable String userName, @PathVariable Integer id) {
        return folderService.deleteFolder(userName, id);
    }
}
