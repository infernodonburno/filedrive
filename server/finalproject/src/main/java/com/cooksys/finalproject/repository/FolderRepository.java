package com.cooksys.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cooksys.finalproject.entity.FolderEntity;




@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, Integer> {

	FolderEntity getById(Integer id);
	void deleteById(Integer id);
	List<FolderEntity> getAllFoldersByfolderID(Integer id);
}