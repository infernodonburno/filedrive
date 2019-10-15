package com.cooksys.finalproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.finalproject.dto.FolderDto;
import com.cooksys.finalproject.service.FolderRequestDto;
import com.cooksys.finalproject.service.FolderService;


@RestController
@RequestMapping("/folders")
public class FolderController {

    private FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }
    
    @PostMapping
    public ResponseEntity<FolderDto> uploadFolder(@RequestBody FolderRequestDto folderRequest) {
        return folderService.uploadFolder(folderRequest);
    }
}
