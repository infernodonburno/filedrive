package com.cooksys.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.finalproject.entity.FolderEntity;

@Repository
public interface Folder2Repository extends JpaRepository<FolderEntity, String> {

	List<FolderEntity> getAllFoldersByuserName(String userName);
}