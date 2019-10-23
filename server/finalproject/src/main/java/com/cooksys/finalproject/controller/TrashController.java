package com.cooksys.finalproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cooksys.finalproject.dto.TrashResponseDto;
import com.cooksys.finalproject.service.FolderService;

@RestController
@RequestMapping("/trash")
public class TrashController {

	private FolderService folderService;
	
	public TrashController(FolderService folderService) {
		this.folderService = folderService;
	}
	
    @CrossOrigin
    @GetMapping("/{userName}")
    public ResponseEntity<TrashResponseDto> getTrash(@PathVariable String userName){
    	return folderService.getTrash(userName);
    }
}