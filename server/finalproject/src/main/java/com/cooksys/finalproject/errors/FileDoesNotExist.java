package com.cooksys.finalproject.errors;

public class FileDoesNotExist extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String message;
	
	public FileDoesNotExist() {
		this.message = "File does not exist";
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
