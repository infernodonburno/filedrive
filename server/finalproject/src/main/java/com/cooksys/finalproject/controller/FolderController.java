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
import com.cooksys.finalproject.dto.FoldersInfoResponseDto;
import com.cooksys.finalproject.dto.TrashRequestDto;
import com.cooksys.finalproject.service.FolderService;


@RestController
@RequestMapping("/folders")
public class FolderController {

    private FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }
    
    /*
     * GET End-points
     */
    @CrossOrigin
    @GetMapping("/{userName}/{folderID}/all")
    public ResponseEntity<FoldersInfoResponseDto> getFolders(@PathVariable String userName, @PathVariable Integer folderID) {
    	return folderService.getFolders(userName, 1);
    }
        
    @CrossOrigin
    @GetMapping("/{userName}/{id}")
    public ResponseEntity<FolderResponseDto> downloadFolder(@PathVariable String userName, @PathVariable Integer id) {
        return folderService.downloadFolder(userName, id);
    }
    
    /*
     * POST End-points
     */
    @CrossOrigin
    @PostMapping("/{userName}/{folderID}")
    public ResponseEntity<FolderResponseDto> uploadFolder(@PathVariable String userName, @PathVariable Integer folderID, @RequestBody FolderRequestDto folderRequest) {
        return folderService.uploadFolder(userName, folderID, folderRequest);
    }

    /*
     * PATCH End-points
     */
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
    
    /*
     * DELETE End-points
     */
    @CrossOrigin
    @DeleteMapping("/{userName}/{id}/delete")
    public ResponseEntity<FolderResponseDto> deleteFolder(@PathVariable String userName, @PathVariable Integer id) {
        return folderService.deleteFolder(userName, id);
    }
}
