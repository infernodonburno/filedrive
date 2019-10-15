package com.cooksys.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cooksys.finalproject.entity.FileEntity;




@Repository
public interface FileRepository extends JpaRepository<FileEntity, Integer> {

	FileEntity getById(Integer id);
	
}