package site.metacoding.red.handler.ex;

public class MyException extends RuntimeException{
	public MyException(String msg) {//Exception으로 옮김
		super(msg);
	}
}
