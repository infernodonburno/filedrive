package com.cooksys.finalproject.dto;

public class TrashRequestDto {
	private boolean trashed;
    private String userName;

	public TrashRequestDto() {
		
	}


	public boolean getTrashed() {
		return trashed;
	}

	public void setTrashed(boolean trashed) {
		this.trashed = trashed;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}
}