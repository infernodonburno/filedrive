package com.cooksys.finalproject.errors;

public class FolderDoesNotExist extends Exception {

	/**
	 * 
	 */
	
	public String message;
	
	private static final long serialVersionUID = 1L;
	
	public FolderDoesNotExist() {
		this.message = "Folder does not exist";
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
