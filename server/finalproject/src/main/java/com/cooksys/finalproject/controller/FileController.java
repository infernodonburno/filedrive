package com.cooksys.finalproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.finalproject.dto.FileDto;
import com.cooksys.finalproject.service.FileRequestDto;
import com.cooksys.finalproject.service.FileService;


@RestController
@RequestMapping("/files")
public class FileController {

    private FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
    
    @PostMapping
    public ResponseEntity<FileDto> uploadFile(@RequestBody FileRequestDto fileRequest) {
        return fileService.uploadFile(fileRequest);
    }
}
