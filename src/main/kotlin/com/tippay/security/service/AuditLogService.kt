package com.tippay.security.service

import org.springframework.stereotype.Service
import org.springframework.data.mongodb.core.MongoTemplate
import java.time.LocalDateTime

@Service
class AuditLogService(
    private val mongoTemplate: MongoTemplate
) {
    fun logSecurityEvent(
        eventType: SecurityEventType,
        userId: String,
        action: String,
        details: Map<String, Any>,
        status: EventStatus
    ) {
        val auditLog = SecurityAuditLog(
            timestamp = LocalDateTime.now(),
            eventType = eventType,
            userId = userId,
            action = action,
            details = details,
            status = status,
            ipAddress = getCurrentIpAddress(),
            userAgent = getCurrentUserAgent()
        )
        mongoTemplate.save(auditLog)
    }

    enum class SecurityEventType {
        AUTHENTICATION, AUTHORIZATION, DATA_ACCESS, CONFIGURATION_CHANGE
    }

    enum class EventStatus {
        SUCCESS, FAILURE, ATTEMPT
    }
} 