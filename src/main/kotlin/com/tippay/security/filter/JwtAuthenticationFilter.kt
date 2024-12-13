package com.tippay.security.filter

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtAuthenticationFilter(
    private val jwtTokenProvider: JwtTokenProvider,
    private val auditLogService: AuditLogService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val token = getJwtFromRequest(request)
            if (token != null && jwtTokenProvider.validateToken(token)) {
                val authentication = jwtTokenProvider.getAuthentication(token)
                SecurityContextHolder.getContext().authentication = authentication
                
                auditLogService.logSecurityEvent(
                    eventType = SecurityEventType.AUTHENTICATION,
                    userId = authentication.name,
                    action = "TOKEN_VALIDATION",
                    details = mapOf("endpoint" to request.requestURI),
                    status = EventStatus.SUCCESS
                )
            }
        } catch (ex: Exception) {
            auditLogService.logSecurityEvent(
                eventType = SecurityEventType.AUTHENTICATION,
                userId = "anonymous",
                action = "TOKEN_VALIDATION",
                details = mapOf(
                    "endpoint" to request.requestURI,
                    "error" to ex.message
                ),
                status = EventStatus.FAILURE
            )
        }

        filterChain.doFilter(request, response)
    }
} 