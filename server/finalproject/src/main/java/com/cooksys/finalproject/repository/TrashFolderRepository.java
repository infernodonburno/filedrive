package com.cooksys.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.finalproject.entity.FolderEntity;

@Repository

public interface TrashFolderRepository extends JpaRepository<FolderEntity, Boolean> {
	List<FolderEntity> getAllByTrashed(Boolean true1);

}