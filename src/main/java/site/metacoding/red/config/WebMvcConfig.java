package site.metacoding.red.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import site.metacoding.red.handler.LoginIntercepter;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoginIntercepter())// /s/* =>/s/boards, s/users (한단계까지만 가능) xxxx /s/boards/1
				  .addPathPatterns("/s/**");// 어떤 동작일때 주소를 호출하는지 **은 s뒤의 모든 주소를 얘기함
		// .addPathPatterns("/admin/**")
		// .excludePathPatterns("/s/boards/**")//제외하는것 => 특정하는것은 제외 시키는것
	}

}