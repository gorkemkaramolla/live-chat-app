package com.example.livemobileapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PageNotExistException extends Exception{
    public PageNotExistException(String message) {
        super(message);
    }
}
