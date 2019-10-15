package com.cooksys.finalproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.service.FileService;


@RestController
@RequestMapping("/files")
public class FileController {

    private FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
  
    @GetMapping("/{id}")
    public ResponseEntity<FileResponseDto> downloadFile(@PathVariable Integer id) {
        return fileService.downloadFile(id);
    }

    @PostMapping
    public ResponseEntity<FileResponseDto> uploadFile(@RequestBody FileRequestDto fileRequest) {
        return fileService.uploadFile(fileRequest);
    }
    
    @PatchMapping("/{id}/trash")
    public ResponseEntity<FileResponseDto> trashFile(@PathVariable Integer id) {
        return fileService.trashFile(id);
    }
}
