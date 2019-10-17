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
    @GetMapping
    public ResponseEntity<FoldersResponseDto> getFolders(){
    	return folderService.getFolders(1);
    }
    
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<FolderResponseDto> downloadFolder(@PathVariable Integer id) {
        return folderService.downloadFolder(id);
    }
    
    @CrossOrigin
    @PostMapping
    public ResponseEntity<FolderResponseDto> uploadFolder(@RequestBody FolderRequestDto folderRequest) {
        return folderService.uploadFolder(folderRequest);
    }
//    TODO: Nested Folder Move
//    @PatchMapping("/{folderID1}/{folderID2}/move")
//    public ResponseEntity<FolderResponseDto> moveFolder(@PathVariable Integer folderID1, @PathVariable Integer folderID2) {
//        return folderService.moveFolder(folderID1, folderID2);
//    }
    
    @CrossOrigin
    @PatchMapping("/{id}/trash")
    public ResponseEntity<FolderResponseDto> trashFolder(@RequestBody TrashRequestDto trashRequestDto, @PathVariable Integer id) {
        return folderService.trashFolder(trashRequestDto, id);
    }
    
    @CrossOrigin
    @DeleteMapping("/{id}/trash")
    public ResponseEntity<FolderResponseDto> deleteFolder(@PathVariable Integer id) {
        return folderService.deleteFolder(id);
    }
}
