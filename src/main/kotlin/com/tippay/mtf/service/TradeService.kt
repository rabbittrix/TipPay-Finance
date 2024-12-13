package com.tippay.mtf.service

import com.tippay.mtf.domain.model.Trade
import com.tippay.mtf.domain.repository.TradeRepository
import com.tippay.mtf.domain.repository.UserRepository
import com.tippay.mtf.exception.TradeNotFoundException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.util.UUID

@Service
class TradeService(
    private val tradeRepository: TradeRepository,
    private val userRepository: UserRepository,
    private val auditService: AuditService
) {
    @Transactional
    fun createTrade(buyerId: UUID, sellerId: UUID, amount: BigDecimal): Trade {
        val buyer = userRepository.findById(buyerId).orElseThrow()
        val seller = userRepository.findById(sellerId).orElseThrow()

        val trade = Trade(
            buyer = buyer,
            seller = seller,
            amount = amount
        )

        val savedTrade = tradeRepository.save(trade)
        auditService.logTradeCreation(savedTrade)
        
        return savedTrade
    }

    @Transactional
    fun matchTrade(tradeId: UUID) {
        val trade = tradeRepository.findById(tradeId)
            .orElseThrow { TradeNotFoundException(tradeId) }

        trade.status = Trade.TradeStatus.MATCHED
        tradeRepository.save(trade)
        auditService.logTradeMatched(trade)
    }

    fun getTradesByUser(userId: UUID, pageable: Pageable): Page<Trade> {
        return tradeRepository.findByBuyerIdOrSellerId(userId, userId, pageable)
    }
} 