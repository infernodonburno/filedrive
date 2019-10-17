package com.cooksys.finalproject.mapper;

import com.cooksys.finalproject.dto.FileResponseDto;
import com.cooksys.finalproject.dto.FolderRequestDto;
import com.cooksys.finalproject.dto.FolderResponseDto;
import com.cooksys.finalproject.entity.FileEntity;
import com.cooksys.finalproject.entity.FolderEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-10-16T15:32:19-0500",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 12.0.2 (Oracle Corporation)"
)
@Component
public class FolderMapperImpl implements FolderMapper {

    @Override
    public FolderEntity dtoToEntity(FolderRequestDto folderRequest) {
        if ( folderRequest == null ) {
            return null;
        }

        FolderEntity folderEntity = new FolderEntity();

        folderEntity.setFolderID( folderRequest.getFolderID() );
        folderEntity.setFolderName( folderRequest.getFolderName() );

        return folderEntity;
    }

    @Override
    public FolderResponseDto entityToDto(FolderEntity folderFoundInDB) {
        if ( folderFoundInDB == null ) {
            return null;
        }

        FolderResponseDto folderResponseDto = new FolderResponseDto();

        folderResponseDto.setFolderName( folderFoundInDB.getFolderName() );
        folderResponseDto.setFolderID( folderFoundInDB.getFolderID() );
        folderResponseDto.setFiles( fileEntityListToFileResponseDtoList( folderFoundInDB.getFiles() ) );
        folderResponseDto.setId( folderFoundInDB.getId() );

        return folderResponseDto;
    }

    protected FileResponseDto fileEntityToFileResponseDto(FileEntity fileEntity) {
        if ( fileEntity == null ) {
            return null;
        }

        FileResponseDto fileResponseDto = new FileResponseDto();

        fileResponseDto.setFileName( fileEntity.getFileName() );
        byte[] data = fileEntity.getData();
        if ( data != null ) {
            fileResponseDto.setData( Arrays.copyOf( data, data.length ) );
        }
        fileResponseDto.setId( fileEntity.getId() );

        return fileResponseDto;
    }

    protected List<FileResponseDto> fileEntityListToFileResponseDtoList(List<FileEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<FileResponseDto> list1 = new ArrayList<FileResponseDto>( list.size() );
        for ( FileEntity fileEntity : list ) {
            list1.add( fileEntityToFileResponseDto( fileEntity ) );
        }

        return list1;
    }
}
