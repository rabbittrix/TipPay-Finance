package com.tippay.security.aspect

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.springframework.stereotype.Component

@Aspect
@Component
class SecurityAuditAspect(
    private val auditLogService: AuditLogService
) {
    @Around("@annotation(securityAudit)")
    fun auditMethod(joinPoint: ProceedingJoinPoint, securityAudit: SecurityAudit): Any? {
        val startTime = System.currentTimeMillis()
        var status = EventStatus.ATTEMPT

        try {
            val result = joinPoint.proceed()
            status = EventStatus.SUCCESS
            return result
        } catch (ex: Exception) {
            status = EventStatus.FAILURE
            throw ex
        } finally {
            auditLogService.logSecurityEvent(
                eventType = securityAudit.eventType,
                userId = getCurrentUserId(),
                action = securityAudit.action,
                details = mapOf(
                    "method" to joinPoint.signature.name,
                    "duration" to (System.currentTimeMillis() - startTime)
                ),
                status = status
            )
        }
    }
} 