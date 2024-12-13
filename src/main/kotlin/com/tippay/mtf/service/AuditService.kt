package com.tippay.mtf.service

import com.tippay.mtf.domain.model.AuditLog
import com.tippay.mtf.domain.model.Trade
import com.tippay.mtf.domain.repository.AuditLogRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class AuditService(
    private val auditLogRepository: AuditLogRepository
) {
    fun logTradeCreation(trade: Trade) {
        createAuditLog(
            action = "TRADE_CREATED",
            details = "Trade created with ID: ${trade.id}, Amount: ${trade.amount}",
            entityId = trade.id,
            entityType = "TRADE"
        )
    }

    fun logTradeMatched(trade: Trade) {
        createAuditLog(
            action = "TRADE_MATCHED",
            details = "Trade matched with ID: ${trade.id}",
            entityId = trade.id,
            entityType = "TRADE"
        )
    }

    private fun createAuditLog(
        action: String,
        details: String,
        entityId: UUID,
        entityType: String
    ) {
        val auditLog = AuditLog(
            action = action,
            details = details,
            entityId = entityId,
            entityType = entityType,
            timestamp = LocalDateTime.now()
        )
        auditLogRepository.save(auditLog)
    }
} 