package site.metacoding.red.handler.ex;

public class MyApiException extends RuntimeException{
	
	public MyApiException(String msg) {//Exception으로 옮김
		super(msg);
	}
}
