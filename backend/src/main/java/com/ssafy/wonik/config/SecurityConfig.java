package com.ssafy.wonik.config;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.stereotype.Component;


@Component
@Configuration
//Spring Security�� ���� ����� ��带 ����ϱ� ���� ������̼� (default : false)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
    
    @Value("${url.front-url}")
    private String frontUrl;
    


	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// REST API�� UI�� ������� �����Ƿ� �⺻������ ��Ȱ��ȭ
		httpSecurity.httpBasic().disable() 
				// REST API�� csrf ������ �ʿ� �����Ƿ� ��Ȱ��ȭ
				.csrf().disable() 
				// JWT Token ����������� ������ �ʿ� �����Ƿ� ��Ȱ��ȭ
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
				// ������Ʈ�� ���� ������ üũ			
				.and().authorizeRequests()
				.antMatchers("**").permitAll();
				
		
	}

	/**
	 * Swagger ������ ���ٿ� ���� ���� ó��
	 *
	 * @param webSecurity
	 */
	@Override
	public void configure(WebSecurity webSecurity) {
		webSecurity.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**",
				"/swagger/**", "/sign-api/exception", "/v3/api-docs/**", "/swagger-ui/**");
	}
}

