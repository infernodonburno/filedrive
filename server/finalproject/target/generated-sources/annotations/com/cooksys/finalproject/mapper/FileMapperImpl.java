package com.cooksys.finalproject.mapper;

import com.cooksys.finalproject.dto.FileRequestDto;
import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.entity.FolderEntity;
import java.util.Arrays;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-10-16T15:32:19-0500",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 12.0.2 (Oracle Corporation)"
)
@Component
public class FileMapperImpl implements FileMapper {

    @Override
    public FileEntity dtoToEntity(FileRequestDto fileRequest) {
        if ( fileRequest == null ) {
            return null;
        }

        FileEntity fileEntity = new FileEntity();

        byte[] data = fileRequest.getData();
        if ( data != null ) {
            fileEntity.setData( Arrays.copyOf( data, data.length ) );
        }
        fileEntity.setFileName( fileRequest.getFileName() );

        return fileEntity;
    }

    @Override
    public FileResponseDto entityToDto(FileEntity fileFoundInDB) {
        if ( fileFoundInDB == null ) {
            return null;
        }

        FileResponseDto fileResponseDto = new FileResponseDto();

        fileResponseDto.setFolderID( fileFoundInDBFolderId( fileFoundInDB ) );
        fileResponseDto.setFileName( fileFoundInDB.getFileName() );
        byte[] data = fileFoundInDB.getData();
        if ( data != null ) {
            fileResponseDto.setData( Arrays.copyOf( data, data.length ) );
        }
        fileResponseDto.setId( fileFoundInDB.getId() );

        return fileResponseDto;
    }

    private Integer fileFoundInDBFolderId(FileEntity fileEntity) {
        if ( fileEntity == null ) {
            return null;
        }
        FolderEntity folder = fileEntity.getFolder();
        if ( folder == null ) {
            return null;
        }
        Integer id = folder.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
