package site.metacoding.red.handler;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import site.metacoding.red.handler.ex.MyApiException;
import site.metacoding.red.handler.ex.MyException;
import site.metacoding.red.util.Script;
import site.metacoding.red.web.dto.response.CMRespDto;

@ControllerAdvice//에러만 전담처리하는 컨트롤러
public class MyExceptionHandler {

	@ExceptionHandler(MyApiException.class)//자식을 적으면 발동을 안해서 부모를 적어야함
	public @ResponseBody CMRespDto<?> apiError(Exception e) {//e에 new RuntimeException이 꽂힘
		return new CMRespDto<>(-1, e.getMessage(), null);//defult 메서지가 나옴 throw의 메서지가 나옴
	}//내가 제어하는 메서지는 적ㅇ

	@ExceptionHandler(MyException.class)//자식을 적으면 발동을 안해서 부모를 적어야함
	public @ResponseBody String m1(Exception e) {//e에 new RuntimeException이 꽂힘
		return Script.back(e.getMessage());//defult 메서지가 나옴 throw의 메서지가 나옴
	}//내
}
//오류 발생 하면 10번 메소드가 때려진다.
//restController -> 에러나면 뷰쪽이 나옴
