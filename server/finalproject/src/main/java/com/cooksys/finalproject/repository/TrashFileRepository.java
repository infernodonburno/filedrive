package com.cooksys.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cooksys.finalproject.entity.FileEntity;

@Repository
public interface TrashFileRepository extends JpaRepository<FileEntity, Boolean> {

	List<FileEntity> getAllByTrashed(Boolean true1);
}